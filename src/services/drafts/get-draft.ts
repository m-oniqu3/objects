import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { DraftStory } from "../../types/story";

type Props = {
  story_id: number;
};

type Response = Result<DraftStory | null>;

export async function getDraft(props: Props): Response {
  try {
    const { story_id } = props;
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const columns = `
        id,
        title,
        subtitle,
        body,
        prompt:prompts(id, title)`;

    // 1. Check drafts first
    const { data: draft, error: draftError } = await supabase
      .from("drafts")
      .select(columns)
      .eq("id", story_id)
      .eq("author_id", auth.user.id)
      .maybeSingle();

    if (draftError) throw draftError;

    if (draft) {
      return { data: { ...draft, type: "draft" }, error: null };
    }

    // 2. Not in drafts, check stories
    const { data: story, error: storyError } = await supabase
      .from("stories")
      .select(columns)
      .eq("id", story_id)
      .eq("author_id", auth.user.id)
      .single();

    if (story) {
      return { data: { ...story, type: "story" }, error: null };
    }

    if (storyError) throw storyError;

    return { data: null, error: null };
  } catch (error) {
    console.error(`Error in ${getDraft.name}:`, error);

    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to retrieve draft",
    };
  }
}
