import type { Prompt, PromptOverview } from "./prompt";

export type Author = {
  id: string;
  fullname: string;
  avatar_url: string | null;
};

export type Genre = {
  id: number;
  name: string;
};

export type DraftStoryType = "draft" | "story";

export type PromptStories = {
  prompt: PromptOverview;
  stories: Array<StoryPreview>;
};

export type StoryRepostPreview = {
  id: number;
  title: string;
  subtitle: string | null;
  snippet: string;
  updated_at: string;
  author: Author;
  prompt: Prompt | null;
};

export type DraftSubmission = {
  id: number;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  prompt_id: number | null;
};

export type StorySubmission = {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  snippet: string;
  body: string;
  prompt_id: number | null;
};

// type returned when you fetch draft
export type DraftStory = {
  id: number;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  prompt: Prompt | null;
  type: DraftStoryType;
};

export type StoryPreview = {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  snippet: string;
  genres: Array<Genre> | null;
  author: Author;
  prompt: Prompt | null;
  updated_at: string;
};

export type Story = {
  id: number;
  title: string;
  subtitle: string | null;
  body: string;
  genres: Array<Genre> | null;
  author: Author;
  prompt: Prompt | null;
  updated_at: string;
};

export type StoryComment = {
  id: number;
  content: string;
  created_at: string;
  author: Author;
};
