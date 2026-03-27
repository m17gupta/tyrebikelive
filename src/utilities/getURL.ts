/**
 * URL utilities — standalone replacement for Payload CMS getURL helpers
 */

export const getServerSideURL = (): string => {
  return process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
};

export const getClientSideURL = (): string => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
};
