import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { StorySubmission } from "../../types/story";

type Props = {
  story: StorySubmission;
};

type SaveStoryResponse = Result<{ id: number; slug: string } | null>;

async function saveStory(props: Props): SaveStoryResponse {
  const { story } = props;

  try {
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const { data: storyData, error: storyErr } = await supabase
      .from("stories")
      .upsert(story)
      .eq("id", story.id)
      .eq("author_id", auth.user.id)
      .select("id, slug")
      .single();

    if (storyErr) throw storyErr;

    if (!storyData) {
      return { data: null, error: null };
    }

    const { error } = await supabase
      .from("drafts")
      .delete()
      .eq("id", story.id)
      .eq("author_id", auth.user.id);

    if (error) throw error;

    return { data: storyData, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to save story.",
    };
  }
}

export default saveStory;
