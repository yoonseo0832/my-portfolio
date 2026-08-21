import { ProjectItem } from "@/types/project";
type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
};
export async function getGitHubProjects(): Promise<ProjectItem[]> {
  const response = await fetch(
    "https://api.github.com/users/yoonseo0832/repos?sort=updated&per_page=100",
    {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    },
  );
  if (!response.ok) throw new Error(`GitHub API failed: ${response.status}`);
  const repos = (await response.json()) as GitHubRepo[];
  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: `github-${repo.id}`,
      title: repo.name,
      description: repo.description ?? "No description yet.",
      tags: [...(repo.language ? [repo.language] : []), ...(repo.topics ?? [])],
      repoUrl: repo.html_url,
      demoUrl: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      source: "github",
      platform: "github",
      platformLabel: "GitHub",
    }));
}
export async function getSupabaseProjects(): Promise<ProjectItem[]> {
  try {
    const { getSupabase } = await import("@/lib/supabase");
    const { data, error } = await getSupabase()
      .from("projects")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((p) => ({
      id: `supabase-${p.id}`,
      title: p.title,
      description: p.description,
      tags: p.tags ?? [],
      repoUrl: p.repo_url,
      demoUrl: p.demo_url || undefined,
      stars: 0,
      forks: 0,
      updatedAt: p.created_at,
      source: "custom" as const,
      platform: p.platform ?? "github",
      platformLabel: p.platform_label ?? p.platform ?? "GitHub",
    }));
  } catch (error) {
    console.error("Supabase projects unavailable", error);
    return [];
  }
}
