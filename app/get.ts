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
