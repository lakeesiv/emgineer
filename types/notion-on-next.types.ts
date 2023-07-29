import {
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface NotionOnNextPageObjectResponse extends PageObjectResponse {
  slug: string | undefined;
  title: string | undefined;
  coverImage: string | undefined;
}
export interface mediaMapInterface {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export type ProgrammingPageObjectResponse = NotionOnNextPageObjectResponse & {
  properties: {
    Description: RichTextPropertyItemObjectResponse;
    Tags: MultiSelectPropertyItemObjectResponse;
    Name: TitlePropertyItemObjectResponse;
  };
};
