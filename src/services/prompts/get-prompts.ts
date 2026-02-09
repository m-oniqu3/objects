import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { PromptPreview } from "../../types/story";
import { calculateRange } from "../../utils/calculate-range";

type GetPromptResponse = Result<Array<PromptPreview> | null>;

async function getPrompts(page: number, limit = 20): GetPromptResponse {
  try {
    const [from, to] = calculateRange(page, limit);

    const { data, error } = await supabase
      .from("prompts")
      .select("id, title")
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, error };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export default getPrompts;
