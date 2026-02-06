import { supabase } from "../lib/supabase";

type SignInProps = { email: string; password: string };

export async function signIn({ email, password }: SignInProps) {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required to sign up.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.log(error);

    const err = error instanceof Error ? error.message : "Sign up failed";

    return { data: null, error: err };
  }
}
