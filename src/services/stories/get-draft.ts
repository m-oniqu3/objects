import { supabase } from "../../lib/supabase";

type Props = {
  story_id: string;
};

type Response = Result<Draft | null>;

export async function getDraft(props: Props): Response {
  try {
    const { story_id } = props;
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const { data: draft, error } = await supabase
      .from("stories")
      .select()
      .eq("user_id", auth.user.id)
      .eq("id", story_id)
      .single();

    if (error) throw error;

    return { data: draft, error: null };
  } catch (error) {
    console.error(`Error in ${getDraft.name}:`, error);

    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to retrieve draft",
    };
  }
}
