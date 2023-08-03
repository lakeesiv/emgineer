import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getBlocks, getParsedPages } from "notion-on-next";
import { cache } from "react";
import {
  BlogPageObjectResponse,
  EventsPageObjectResponse,
} from "types/notion-on-next.types";
import siteConfig from "site.config";

export const getBlogPages = cache(
  async (limit?: number): Promise<BlogPageObjectResponse[]> => {
    const pages: BlogPageObjectResponse[] = await getParsedPages(
      siteConfig.blogDatabaseId
    );
    const sortedPages = sortPages(pages);
    if (limit) {
      return sortedPages.slice(0, limit);
    }
    return sortedPages;
  }
);

export const getEventPages = cache(
  async (): Promise<EventsPageObjectResponse[]> => {
    const pages: EventsPageObjectResponse[] = await getParsedPages(
      siteConfig.eventsDatabaseId
    );
    const sortedPages = sortPages(pages);
    return sortedPages;
  }
);

export interface ParsedEventsPageObjectResponse
  extends EventsPageObjectResponse {
  parsed: {
    title: string;
    eventId: string;
    description: string;
    location: string;
    date: Date;
    duration: number;
    hide: boolean;
    requiresPayment: boolean;
  };
}

export const getParsedEventPages = cache(
  async (): Promise<ParsedEventsPageObjectResponse[]> => {
    const pages: EventsPageObjectResponse[] = await getEventPages();
    const parsedPages = pages.map((page) => {
      try {
        //@ts-ignore
        const title = page.properties.Name.title[0].plain_text as string;
        //@ts-ignore
        const description = page.properties.Description.rich_text[0]
          .plain_text as string;
        //@ts-ignore
        const location = page.properties.Location.rich_text[0]
          .plain_text as string;
        //@ts-ignore
        const eventId = page.properties["Id"].rich_text[0].plain_text as string;
        //@ts-ignore
        const duration = page.properties["Duration (hrs)"].number as number;

        const fixedTypesProps = {
          title,
          description,
          location,
          duration,
          eventId,
        };

        const date =
          new Date(page.properties.Date.date?.start as string) || new Date();
        const hide = page.properties.Hide.checkbox as boolean;

        if (hide) return null;

        const parsedResults = {
          ...fixedTypesProps,
          date: date,
          hide: hide,
          requiresPayment: page.properties["Requires Payment"]
            .checkbox as boolean,
        };

        const parsedPage: ParsedEventsPageObjectResponse = {
          ...page,
          parsed: parsedResults,
        };
        return parsedPage;
      } catch (error) {
        return null;
      }
    });
    const filteredPages = parsedPages.filter(
      (page) => page !== null
    ) as ParsedEventsPageObjectResponse[];

    return filteredPages;
  }
);

const sortPages = <T extends BlogPageObjectResponse | EventsPageObjectResponse>(
  pages: T[]
) => {
  // get all pages with a date
  const datedPages = pages.filter((page) => page.properties.Date.date?.start);
  // sort pages by date descending
  const sortedPages = datedPages.sort((a, b) => {
    const aDate = new Date(a.properties.Date.date?.start as string);
    const bDate = new Date(b.properties.Date.date?.start as string);
    return bDate.getTime() - aDate.getTime();
  });

  return sortedPages;
};

export const cachedGetBlocks = cache(
  async (
    pageId: string
  ): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> => {
    const blocks = await getBlocks(pageId);
    return blocks;
  }
);
