import { z } from "zod";

export const signUpSchema = z.object({
  fullname: z.string({ error: "Full name is required" }),
  email: z.email({ error: "Not a valid email." }).min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const signInSchema = z.object({
  email: z.email({ error: "Not a valid email." }).min(1, "Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type SignUpCredentials = z.infer<typeof signUpSchema>;
export type SignInCredentials = z.infer<typeof signInSchema>;
