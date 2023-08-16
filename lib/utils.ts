import { clsx, type ClassValue } from "clsx";
import siteConfig from "site.config";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getUrl = () => {
  // read VERCEL_URL from env
  const env = process.env.VERCEL_ENV;

  if (env !== "production") {
    return "http://localhost:3000";
  }
  return siteConfig.primarySiteUrl;
};
