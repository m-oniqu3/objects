import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";

type CreatDraftResponse = Result<{ id: number } | null>;

export async function createDraft(): CreatDraftResponse {
  try {
    const { data: auth, error: userError } = await supabase.auth.getUser();
    if (userError || !auth) throw new Error("Unauthorized.");

    const { data, error } = await supabase
      .from("drafts")
      .insert([{}])
      .select("id")
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to create draft.",
    };
  }
}
