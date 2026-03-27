
export const getCachedDocument = (collection: string, id: string) => async () => {
  console.log(`Stub: getCachedDocument called for collection "${collection}", id "${id}"`);
  return { slug: "stub-slug", title: "Stub Document" };
};
