import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getBlocks, getParsedPages } from "lib/non";
import { cache } from "react";
import {
  BlogPageObjectResponse,
  EventsPageObjectResponse,
} from "types/notion-on-next.types";
import siteConfig from "site.config";
import { ParsedEventDetails, parseEvent } from "lib/notion";

export const revalidate = 86400;

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
  async (
    removePastEvents: boolean = false
  ): Promise<EventsPageObjectResponse[]> => {
    const pages: EventsPageObjectResponse[] = await getParsedPages(
      siteConfig.eventsDatabaseId
    );
    const sortedPages = sortPages(pages);
    if (!removePastEvents) return sortedPages;

    const now = new Date();

    const filteredPages = sortedPages.filter((page) => {
      const pageDate = new Date(page.properties.Date.date?.start as string);
      return pageDate.getTime() > now.getTime();
    });

    return filteredPages;
  }
);

export interface ParsedEventsPageObjectResponse
  extends EventsPageObjectResponse {
  parsed: ParsedEventDetails;
}

export const getParsedEventPages = cache(
  async (
    removePastEvents: boolean = false
  ): Promise<ParsedEventsPageObjectResponse[]> => {
    const pages: EventsPageObjectResponse[] = await getEventPages(
      removePastEvents
    );
    const parsedPages = pages.map((page) => {
      try {
        const parsedResults = parseEvent(page);

        if (!parsedResults) return null;

        const parsedPage: ParsedEventsPageObjectResponse = {
          ...page,
          parsed: parsedResults,
        };
        return parsedPage;
      } catch (error) {
        console.error(error);
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
