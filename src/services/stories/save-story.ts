import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { Story } from "../../types/story";

type Props = {
  story: Story;
};

type SaveStoryResponse = Result<{ id: string } | null>;

async function saveStory(props: Props): SaveStoryResponse {
  const {
    title,
    slug,
    subtitle,
    body,
    id,
    prompt_id,
    snippet,
    status,
    published_at = null,
  } = props.story;

  try {
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const { data, error } = await supabase
      .from("stories")
      .update({
        title,
        subtitle,
        slug,
        snippet,
        status,
        body,
        prompt_id,
        published_at,
      })
      .eq("id", id)
      .eq("author_id", auth.user.id)
      .select("id")
      .single();

    if (error) throw error;

    if (!data) {
      return { data: null, error: null };
    }

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to save draft.",
    };
  }
}

export default saveStory;
