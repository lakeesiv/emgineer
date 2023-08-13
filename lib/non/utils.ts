export const spinalCase = (text: string | undefined) => {
  if (!text) {
    return "";
  }
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/gi, "");
};

export const pascalCase = (text: string | undefined) => {
  if (!text) {
    return "";
  }
  return spinalCase(text)
    .split("-")
    .map((word) => {
      if (word.length === 0) {
        return "";
      }
      return word?.[0]?.toUpperCase() + word?.slice(1);
    })
    .join("");
};
