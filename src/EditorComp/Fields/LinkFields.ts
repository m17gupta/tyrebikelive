export const LinkFields = {
  type: "object",
  objectFields: {
    "Section Link URL": {
      type: "text",
      label: "Section Link URL",
    },
    "Section Link Target": {
      type: "select",
      label: "Section Link Target",
      options: [
        { label: "In The Current Tab", value: "_self" },
        { label: "In A New Tab", value: "_blank" },
        { label: "In The Parent Frame", value: "_parent" },
        { label: "In The Full Body", value: "_top" },
      ],
    },
  },
};

