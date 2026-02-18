import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";

type Response = Result<{ id: number } | null>;

type Props = {
  story_id: number;
  user_id: string;
  content: string;
};

async function quoteStory(props: Props): Response {
  try {
    const { story_id, content } = props;

    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const { data, error } = await supabase
      .from("stories_quotes")
      .insert([{ story_id: story_id, content, user_id: auth.user.id }])
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
      error:
        error instanceof Error ? error.message : "Failed to publish quote.",
    };
  }
}

export default quoteStory;
