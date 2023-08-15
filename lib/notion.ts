import { Client } from "@notionhq/client";
import siteConfig from "site.config";
import {
  EventsPageObjectResponse,
  SignUpPageObjectResponse,
} from "types/notion-on-next.types";

export class Notion {
  notion: Client;
  eventsDatabaseId: string;
  signUpDatabaseId: string;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_KEY,
    });
    this.eventsDatabaseId = siteConfig.eventsDatabaseId;
    this.signUpDatabaseId = siteConfig.signUpDatabaseId;
  }

  async getEvent(id: string) {
    const res = await this.notion.databases.query({
      database_id: this.eventsDatabaseId,
      filter: {
        property: "Id",
        rich_text: {
          equals: id,
        },
      },
    });

    return res.results[0] as EventsPageObjectResponse;
  }

  async getParsedEvent(id: string) {
    const event = await this.getEvent(id);

    if (!event) {
      throw new Error(`Event ${id} not found`);
    }
    const res = parseEvent(event);

    if (!res) {
      throw new Error(`Event ${id} not found`);
    }

    return res;
  }

  async getSignUp(name: string, email: string, eventId: string) {
    const res = await this.notion.databases.query({
      database_id: this.signUpDatabaseId,
      filter: {
        and: [
          {
            property: "Name",
            title: {
              equals: name,
            },
          },
          {
            property: "Email",
            email: {
              equals: email,
            },
          },
          {
            property: "EventId",
            rich_text: {
              equals: eventId,
            },
          },
        ],
      },
    });

    return res.results[0] as SignUpPageObjectResponse;
  }

  async upsertSignUp(
    name: string,
    email: string,
    eventId: string,
    going: "Yes" | "No" | "Maybe",
    extraDetails?: string
  ) {
    const signUp = await this.getSignUp(name, email, eventId);

    if (!signUp) {
      console.log(
        "Creating new sign up",
        name,
        email,
        eventId,
        going,
        extraDetails
      );
      return await this.addSignUp(name, email, eventId, going, extraDetails);
    }

    const properties: Partial<SignUpPageObjectResponse["properties"]> = {
      Going: {
        // @ts-ignore
        type: "select",
        // @ts-ignore
        select: {
          name: going,
        },
      },
      "Extra Details": {
        type: "rich_text",
        // @ts-ignore
        rich_text: [
          {
            text: {
              content: extraDetails || "",
            },
          },
        ],
      },
    };

    const response = await this.notion.pages.update({
      page_id: signUp.id,
      // @ts-ignore
      properties,
    });

    return response;
  }

  private async addSignUp(
    name: string,
    email: string,
    eventId: string,
    status: "Yes" | "No" | "Maybe",
    extraDetails?: string
  ) {
    const { title, price } = await this.getParsedEvent(eventId);
    const eventName = title;
    const paymentRequired = price !== undefined && price > 0;

    const properties: Partial<SignUpPageObjectResponse["properties"]> = {
      Event: {
        type: "rich_text",
        // @ts-ignore
        rich_text: [
          {
            // @ts-ignore
            text: {
              content: eventName,
            },
          },
        ],
      },
      EventId: {
        type: "rich_text",
        // @ts-ignore
        rich_text: [
          {
            // @ts-ignore
            text: {
              content: eventId,
            },
          },
        ],
      },

      Payment: {
        type: "select",
        // @ts-ignore
        select: {
          name: paymentRequired ? "Not Paid" : "Not Needed",
        },
      },
      // @ts-ignore
      Email: {
        type: "email",
        email: email,
      },
      Name: {
        type: "title",
        // @ts-ignore
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Going: {
        // @ts-ignore
        type: "select",
        // @ts-ignore
        select: {
          name: status,
        },
      },
      "Extra Details": {
        type: "rich_text",
        // @ts-ignore
        rich_text: [
          {
            text: {
              content: extraDetails || "",
            },
          },
        ],
      },
    };

    const response = await this.notion.pages.create({
      parent: {
        database_id: this.signUpDatabaseId,
      },
      // @ts-ignore
      properties,
    });

    return response;
  }
}

export interface ParsedEventDetails {
  title: string;
  eventId: string;
  description: string;
  location: string;
  date: Date;
  duration: number;
  hide: boolean;
  price?: number;
  stripePriceId?: string;
  extraDetails?: string;
}

export const parseEvent = (page: EventsPageObjectResponse) => {
  //@ts-ignore
  const title = page.properties.Name.title[0].plain_text as string;
  //@ts-ignore
  const description = page.properties.Description.rich_text[0]
    .plain_text as string;
  //@ts-ignore
  const location = page.properties.Location.rich_text[0].plain_text as string;
  //@ts-ignore
  const eventId = page.properties["Id"].rich_text[0].plain_text as string;
  //@ts-ignore
  const duration = page.properties["Duration (hrs)"].number as number;
  // @ts-ignore
  const extraDetails = page.properties["Extra Details"]?.rich_text[0]
    ?.plain_text as string;
  // @ts-ignore
  const price = page.properties["Price"]?.number as number | undefined;
  //@ts-ignore
  const stripePriceId = page.properties["stripePriceId"]?.rich_text[0]
    ?.plain_text as string;

  const fixedTypesProps = {
    title,
    description,
    location,
    duration,
    eventId,
    extraDetails,
    price,
    stripePriceId,
  };

  const date =
    new Date(page.properties.Date.date?.start as string) || new Date();
  const hide = page.properties.Hide.checkbox as boolean;

  if (hide) return null;

  const parsedResults = {
    ...fixedTypesProps,
    date: date,
    hide: hide,
  };

  return parsedResults as ParsedEventDetails;
};
