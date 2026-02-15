export type Prompt = {
  id: number;
  title: string;
};

export type PromptOverview = Prompt & {
  created_at: string;
  story_count: number;
};
