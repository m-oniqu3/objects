import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { Story } from "../../types/story";

type GetStoryResponse = Result<Story | null>;

async function getStory(story_id: number): GetStoryResponse {
  try {
    const { data, error } = await supabase
      .from("stories")
      .select(
        `
      id,
      title,
      subtitle,
      body,
     updated_at,
      stories_genres (
        genres (id, name)
      ),
      author:profiles(id, fullname, avatar_url),
      prompt:prompts(id, title)`,
      )
      .eq("id", story_id)

      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return { data: null, error: null };

    const genres = data.stories_genres?.map((sg) => sg.genres);

    return { data: { ...data, genres }, error: null };
  } catch (error) {
    console.error("Failed to fetch story:", error);

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred while trying to fetch story.",
    };
  }
}

export default getStory;
