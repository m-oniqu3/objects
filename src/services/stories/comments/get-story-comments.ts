import { supabase } from "../../../lib/supabase";
import type { Result } from "../../../types/result";
import type { StoryComment } from "../../../types/story";
import { calculateRange } from "../../../utils/calculate-range";

type Props = {
  story_id: number;
  page: number;
  limit: number;
};

type Response = Result<Array<StoryComment> | null>;

async function getStoryComments(props: Props): Response {
  const { story_id, page, limit } = props;

  const [from, to] = calculateRange(page, limit);

  try {
    const { data, error } = await supabase
      .from("story_comments")
      .select(
        `
        id,
        content,
        created_at,
        author:profiles(id, fullname, avatar_url)`,
      )
      .eq("story_id", story_id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get story comments.",
    };
  }
}

export default getStoryComments;
