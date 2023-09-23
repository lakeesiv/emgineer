import { Metadata } from "next";

interface CustomMetaData {
  title: string;
  description?: string;
  image?: string;
}

export const getMetaData = ({
  title,
  description,
  image,
}: CustomMetaData): Metadata => {
  // If we are in development mode, don't add any meta data
  if (process.env.NODE_ENV === "development") {
    return {};
  }

  const img = image
    ? "https://emgineer.vercel.app/og" +
      "?title=" +
      title +
      "&description=" +
      description +
      "&image=" +
      image
    : title
    ? "https://emgineer.vercel.app/og" + "?title=" + title
    : "https://emgineer.vercel.app/og";

  const metaData: Metadata = {
    title: title + " | Emgineer",
    twitter: {
      images: [
        {
          url: img,
        },
      ],
      title: title,
      description: description,
      creator: "@emgieer",
    },

    description: description,
    openGraph: {
      title: title + " | Emgineer",
      description: description,
      images: [
        {
          url: img,
        },
      ],
    },
  };

  return metaData;
};
