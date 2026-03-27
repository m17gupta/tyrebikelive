import { z } from "zod";

export const ResetPasswordFormSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;

export const useResetPasswordForm = () => {
  return {
    ResetPasswordFormResolver: ResetPasswordFormSchema,
  };
};
