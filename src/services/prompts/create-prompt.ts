import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";

type Props = {
  title: string;
  userID: string;
};

type PromptResult = Result<{ id: number } | null>;

export async function createPrompt(props: Props): PromptResult {
  const { title, userID } = props;

  try {
    const { data, error } = await supabase
      .from("prompts")
      .insert([{ title, created_by: userID }])
      .select("id")
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log(error);

    const err =
      error instanceof Error ? error.message : "Could not create prompt";

    return { data: null, error: err };
  }
}
