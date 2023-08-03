import { Client } from "@notionhq/client";
import siteConfig from "site.config";
import { SignUpPageObjectResponse } from "types/notion-on-next.types";

export class Notion {
  notion: Client;
  eventsDatabaseId: string;
  signUpDatabaseId: string;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    this.eventsDatabaseId = siteConfig.eventsDatabaseId;
    this.signUpDatabaseId = siteConfig.signUpDatabaseId;
  }

  async addSignUp(name: string, email: string, status: "Yes" | "No") {
    const properties: Partial<SignUpPageObjectResponse["properties"]> = {
      // @ts-ignore
      Email: {
        email: email,
      },
      Name: {
        // @ts-ignore
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Status: {
        // @ts-ignore
        select: {
          name: status,
          color: status === "Yes" ? "green" : "red",
        },
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
