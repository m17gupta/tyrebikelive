
export const sendEmail = async (options: any) => {
  console.log(`Stub: sendEmail called with options:`, options);
  return { messageId: "stub-email-id" };
};

export default {
    sendMail: sendEmail
}
