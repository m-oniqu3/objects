import { supabase } from "../../lib/supabase";
import type { PromptOverview } from "../../types/prompt";
import type { Result } from "../../types/result";
import { calculateRange } from "../../utils/calculate-range";

type GetPromptsResponse = Result<Array<PromptOverview> | null>;

async function getPrompts(page: number, limit = 20): GetPromptsResponse {
  try {
    const [from, to] = calculateRange(page, limit);

    const { data, error } = await supabase
      .from("prompts")
      .select(
        `
        id, 
        title,
        created_at,
        stories(id)
        `,
      )
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const prompts = data.map((prompt) => {
      return {
        ...prompt,
        story_count: prompt.stories.length,
      };
    });

    return { data: prompts, error };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export default getPrompts;
