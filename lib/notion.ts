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

  private async eventValidateAndPaymentCheck(id: string) {
    const event = await this.getEvent(id);

    if (!event) {
      throw new Error(`Event ${id} not found`);
    }

    return {
      paymentRequired: event.properties["Requires Payment"].checkbox,
      // @ts-ignore
      eventName: event.properties.Name.title[0].plain_text,
    };
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
    going: "Yes" | "No",
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
    status: "Yes" | "No",
    extraDetails?: string
  ) {
    const { eventName, paymentRequired } =
      await this.eventValidateAndPaymentCheck(eventId);

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
