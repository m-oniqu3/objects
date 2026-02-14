import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { PublishedStory } from "../../types/story";

type GetStoryResponse = Result<PublishedStory | null>;

async function getPublishedStory(id: string): GetStoryResponse {
  try {
    const { data, error } = await supabase
      .from("stories")
      .select(
        `
      id,
      title,
      subtitle,
      slug,
      body,
      published_at,
      stories_genres (
        genres (id, name)
      ),
      author:profiles(id, fullname, avatar_url),
      prompt:prompts(id, title)`,
      )
      .eq("id", id)
      .eq("status", "published")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return { data: null, error: null };

    const genres = data.stories_genres?.map((sg) => sg.genres);

    const story = {
      ...data,
      published_at: data.published_at!,
      genres,
    };

    return { data: story, error: null };
  } catch (error) {
    console.error("Failed to fetch story:", error);
    throw error;
  }
}

export default getPublishedStory;
