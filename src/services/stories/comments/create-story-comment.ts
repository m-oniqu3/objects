import { supabase } from "../../../lib/supabase";
import type { Result } from "../../../types/result";

type Props = {
  story_id: number;
  content: string;
};

type Response = Result<{ id: number } | null>;

async function createStoryComment(props: Props): Response {
  const { story_id, content } = props;

  try {
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const { data, error } = await supabase
      .from("story_comments")
      .insert({
        author_id: auth.user.id,
        story_id,
        content,
      })
      .select("id")
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to save comment.",
    };
  }
}

export default createStoryComment;
