import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { StoryPreview } from "../../types/story";
import { calculateRange } from "../../utils/calculate-range";

//alias:actual_table_or_relationship(columns
type GetStoryPreviewsResponse = Result<Array<StoryPreview> | null>;

export async function getStoryPreviews(
  page: number,
  limit = 20,
): GetStoryPreviewsResponse {
  try {
    const [from, to] = calculateRange(page, limit);

    const { data, error } = await supabase
      .from("stories")
      .select(
        `
      id,
      title,
      subtitle,
      snippet,
      slug,
      body,
      stories_genres (
        genres (id, name)
      ),
      author:profiles(id, fullname, avatar_url),
      prompt:prompts(id, title)
        `,
      )
      .order("published_at", { ascending: false })
      .eq("status", "published")
      .range(from, to);

    if (error) throw error;

    if (!data) return { data: null, error: null };

    const stories: StoryPreview[] = data.map(({ stories_genres, ...story }) => {
      return {
        ...story,
        snippet: story.snippet!,
        genres: stories_genres.map((sg) => sg.genres),
      };
    });

    return { data: stories, error: null };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred while trying to fetch stories.",
    };
  }
}
