import {
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  CheckboxPropertyItemObjectResponse,
  EmailPropertyItemObjectResponse,
  SelectPropertyItemObjectResponse,
  LastEditedByPropertyItemObjectResponse,
  CreatedTimePropertyItemObjectResponse,
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
    Price: NumberPropertyItemObjectResponse;
    "Extra Details": RichTextPropertyItemObjectResponse;
    Id: RichTextPropertyItemObjectResponse;
    Description: RichTextPropertyItemObjectResponse;
    Location: RichTextPropertyItemObjectResponse;
    Date: DatePropertyItemObjectResponse;
    Hide: CheckboxPropertyItemObjectResponse;
    "Duration (hrs)": NumberPropertyItemObjectResponse;
    stripePriceId: RichTextPropertyItemObjectResponse;
    Name: TitlePropertyItemObjectResponse;
  };
};
