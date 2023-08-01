import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getBlocks, getParsedPages } from "notion-on-next";
import { cache } from "react";
import { BlogPageObjectResponse } from "types/notion-on-next.types";
import siteConfig from "site.config";

export const cachedGetParsedPages = cache(
  async <Type>(pageId: string): Promise<Type[]> => {
    const pages: Type[] = await getParsedPages(pageId);
    return pages;
  }
);

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

const sortPages = (pages: BlogPageObjectResponse[]) => {
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
