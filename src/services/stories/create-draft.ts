import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";

type CreatDraftResponse = Result<{ id: string } | null>;

export async function createDraft(): CreatDraftResponse {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized.");

    const { data, error } = await supabase
      .from("stories")
      .insert([{}])
      .select("id")
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
