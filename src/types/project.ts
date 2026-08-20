export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  stars: number;
  forks: number;
  updatedAt: string;
  source: "github" | "custom";
  platform?: string;
  platformLabel?: string;
}
