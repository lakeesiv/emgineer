import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getUrl = () => {
  // read VERCEL_URL from env
  const url = process.env.VERCEL_URL;
  if (!url) {
    return "http://localhost:3000";
  }

  return `https://${url}`;
};
