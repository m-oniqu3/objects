export type AuthorPreview = {
  id: string;
  fullname: string;
  avatar_url: string | null;
};

export type PromptPreview = {
  id: number;
  title: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type PublishedStory = {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  body: string;
  published_at: string;
  genres: Array<Genre> | null;
  author: AuthorPreview;
  prompt: PromptPreview | null;
};

export type StoryStatus = "draft" | "published";
export type StoryType = "draft" | "publish";

export type Story = {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  snippet: string;
  body: string;
  prompt_id: number | null;
  status: StoryStatus;
  published_at?: string | null;
};
