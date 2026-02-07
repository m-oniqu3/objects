import { supabase } from "../../lib/supabase";
import type { PublishedStory } from "../../types/story";
import { calculateRange } from "../../utils/calculate-range";

//alias:actual_table_or_relationship(columns)

export async function getPublishedStories(
  page: number,
  limit = 20,
): Promise<Array<PublishedStory>> {
  const [from, to] = calculateRange(page, limit);

  const { data, error } = await supabase
    .from("stories")
    .select(
      `
      id,
      title,
      slug,
      content,
      published_at,
      stories_genres (
        genres (id, name)
      ),
      author:profiles(id, fullname, avatar_url),
      prompt:prompts(id, title)
        `,
    )
    .eq("is_published", true)

    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  if (!data) return [];

  const stories = data.map(({ stories_genres, ...story }) => {
    return {
      ...story,
      genres: stories_genres.map((sg) => sg.genres),
    } as PublishedStory;
  });

  return stories;
}
