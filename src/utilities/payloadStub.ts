
/**
 * Simple stub for getPayload to replace the actual Payload CMS dependency.
 * This allows the frontend routes to compile and run with mock data.
 */
export const getPayload = async ({ config }: { config?: any } = {}) => {
  return {
    find: async ({ collection, where, locale, limit, depth }: any) => {
      console.log(`Stub: payload.find called for collection "${collection}"`);
      return {
        docs: [ { id: "stub-id-1", title: "Stub Title", slug: "stub-slug", paywall: "stripe", stripe: {}, autopay: {}, p24: {} } ],
        totalDocs: 1,
        limit: limit || 10,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
      };
    },
    findByID: async ({ collection, id, depth }: any) => {
      console.log(`Stub: payload.findByID called for collection "${collection}", id "${id}"`);
      return { id, title: "Stub Title", slug: "stub-slug", printLabel: { labelurl: "http://example.com/label.pdf" }, orderDetails: { shipping: "inpost-locker" } };
    },
    update: async ({ collection, id, data, where }: any) => {
      console.log(`Stub: payload.update called for collection "${collection}"`);
      return { id };
    },
    create: async ({ collection, data }: any) => {
      console.log(`Stub: payload.create called for collection "${collection}"`);
      return { id: `new-${Math.random().toString(36).substr(2, 9)}`, ...data };
    },
    auth: async ({ headers }: any) => {
      console.log(`Stub: payload.auth called`);
      return { user: { id: "admin-1", collection: "administrators" } };
    },
  };
};
