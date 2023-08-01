import {
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
  CheckboxPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  EmailPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
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

export type BlogPageObjectResponse = NotionOnNextPageObjectResponse & {
  properties: {
    Description: RichTextPropertyItemObjectResponse;
    Date: DatePropertyItemObjectResponse;
    Name: TitlePropertyItemObjectResponse;
  };
};
export type EventsPageObjectResponse = NotionOnNextPageObjectResponse & {
  properties: {
    "Sign Up Link": UrlPropertyItemObjectResponse;
    "Requires Payment": CheckboxPropertyItemObjectResponse;
    Description: RichTextPropertyItemObjectResponse;
    Location: RichTextPropertyItemObjectResponse;
    Start: DatePropertyItemObjectResponse;
    Hide: CheckboxPropertyItemObjectResponse;
    "Duration (hrs)": NumberPropertyItemObjectResponse;
    Name: TitlePropertyItemObjectResponse;
  };
};
export type SignUpPageObjectResponse = NotionOnNextPageObjectResponse & {
  properties: {
    Email: EmailPropertyItemObjectResponse;
    Status: MultiSelectPropertyItemObjectResponse;
    hasPaid: RichTextPropertyItemObjectResponse;
    Name: TitlePropertyItemObjectResponse;
  };
};
