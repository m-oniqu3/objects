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
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  genres: Array<Genre> | null;
  author: AuthorPreview;
  prompt: PromptPreview | null;
};

export type StoryStatus = "draft" | "published";
