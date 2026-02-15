import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { PromptStories } from "../../types/story";
import { calculateRange } from "../../utils/calculate-range";

type Props = {
  prompt_id: number;
  page: number;
  limit: number;
};

type GetPromptStoriesResponse = Result<PromptStories | null>;

async function getPromptStories(props: Props): GetPromptStoriesResponse {
  try {
    const { prompt_id, page, limit } = props;
    const [from, to] = calculateRange(page, limit);

    // Get the prompt
    const { data: promptData, error: promptError } = await supabase
      .from("prompts")
      .select("id, title, created_at")
      .eq("id", prompt_id)
      .single();

    if (promptError) throw promptError;

    // Get the stories with total count
    const {
      data: storiesData,
      error: storiesError,
      count,
    } = await supabase
      .from("stories")
      .select(
        `id,
        title,
        subtitle,
        snippet,
        slug,
        published_at,
        stories_genres(genres(id, name)),
        author:profiles(id, fullname, avatar_url)`,
        { count: "exact" },
      )
      .eq("prompt_id", prompt_id)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to);

    if (storiesError) throw storiesError;

    const result: PromptStories = {
      prompt: {
        ...promptData,
        story_count: count || 0,
      },
      stories: (storiesData || []).map((story) => ({
        id: story.id,
        title: story.title,
        subtitle: story.subtitle,
        slug: story.slug,
        snippet: story.snippet!,
        published_at: story.published_at!,
        genres: story.stories_genres?.map((sg) => sg.genres) || null,
        author: story.author,
      })),
    };

    return { data: result, error: null };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occured while fetching prompt-stories.",
    };
  }
}

export default getPromptStories;
