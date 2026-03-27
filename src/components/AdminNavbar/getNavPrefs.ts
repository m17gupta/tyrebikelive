import { cache } from "react";

// getNavPrefs — standalone version without payload preferences collection
// Returns null since nav preferences are now managed by KalpGo architecture
export const getNavPrefs = cache(
  async (_args?: { user?: unknown }): Promise<null> => null,
);
