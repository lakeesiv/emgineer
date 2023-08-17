import { Client } from "@notionhq/client";
import siteConfig from "site.config";
import { EventsPageObjectResponse } from "types/notion-on-next.types";

export class Notion {
  notion: Client;
  eventsDatabaseId: string;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_KEY,
    });
    this.eventsDatabaseId = siteConfig.eventsDatabaseId;
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
