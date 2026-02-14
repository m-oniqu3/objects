import { supabase } from "../../lib/supabase";
import type { Result } from "../../types/result";
import type { StoryStatus } from "../../types/story";
import { slugify } from "../../utils/slug";

type Props = {
  title: string;
  subtitle: string;
  snippet: string;
  body: string;
  storyID: string;
  promptID: number | null;
  status: StoryStatus;
};

type SaveStoryResponse = Result<{ id: string } | null>;

async function saveStory(props: Props): SaveStoryResponse {
  const { title, subtitle, body, promptID, storyID, snippet, status } = props;

  const slug = slugify(props.title);

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
        prompt_id: promptID,
      })
      .eq("id", storyID)
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
