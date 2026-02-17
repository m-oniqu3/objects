import { supabase } from "../../lib/supabase";
import type { DraftSubmission } from "../../types/story";

type Props = {
  draft: DraftSubmission;
};
async function saveDraft(props: Props) {
  try {
    const { draft } = props;
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    if (!auth) {
      return { data: null, error: null };
    }

    const { data, error } = await supabase
      .from("drafts")
      .update(draft)
      .eq("id", draft.id)
      .eq("author_id", auth.user.id)
      .select("id")
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Failed to save draft.",
    };
  }
}

export default saveDraft;
