
      import { PageObjectResponse, RichTextPropertyItemObjectResponse, DatePropertyItemObjectResponse, TitlePropertyItemObjectResponse, CheckboxPropertyItemObjectResponse, NumberPropertyItemObjectResponse, EmailPropertyItemObjectResponse, MultiSelectPropertyItemObjectResponse, LastEditedByPropertyItemObjectResponse, SelectPropertyItemObjectResponse, CreatedTimePropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";;;;
      
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
		'Description': RichTextPropertyItemObjectResponse;
		'Date': DatePropertyItemObjectResponse;
		'Name': TitlePropertyItemObjectResponse;
	}
}
export type EventsPageObjectResponse = NotionOnNextPageObjectResponse & {
	properties: {
		'Requires Payment': CheckboxPropertyItemObjectResponse;
		'Id': RichTextPropertyItemObjectResponse;
		'Description': RichTextPropertyItemObjectResponse;
		'Location': RichTextPropertyItemObjectResponse;
		'Date': DatePropertyItemObjectResponse;
		'Hide': CheckboxPropertyItemObjectResponse;
		'Duration (hrs)': NumberPropertyItemObjectResponse;
		'Name': TitlePropertyItemObjectResponse;
	}
}
export type SignUpPageObjectResponse = NotionOnNextPageObjectResponse & {
	properties: {
		'Email': EmailPropertyItemObjectResponse;
		'Extra Details': RichTextPropertyItemObjectResponse;
		'Going': MultiSelectPropertyItemObjectResponse;
		'Last edited time': LastEditedByPropertyItemObjectResponse;
		'Event': RichTextPropertyItemObjectResponse;
		'Payment': SelectPropertyItemObjectResponse;
		'Created time': CreatedTimePropertyItemObjectResponse;
		'EventId': RichTextPropertyItemObjectResponse;
		'Name': TitlePropertyItemObjectResponse;
	}
}