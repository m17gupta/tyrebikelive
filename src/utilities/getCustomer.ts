export const getCustomer = async () => {
  // Simple stub for authenticated customer data.
  // In kalpgO architecture, this should decode the JWT from the request
  // and return the tenant customer details.
  return { id: "customer-1", email: "user@example.com", name: "Guest User", cart: "[]" };
};
