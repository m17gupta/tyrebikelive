
export const formatAuthors = (authors: any[]) => {
  if (!authors) return "";
  return authors.map(a => a.name || "Unknown Author").join(", ");
};
