import ProjectList from "./ProjectList";
import { customProjects } from "@/data/customProjects";
import { getGitHubProjects, getSupabaseProjects } from "@/lib/github";
import { ProjectItem } from "@/types/project";
export const revalidate = 3600;
export default async function Projects() { let github: ProjectItem[] = []; try { github = await getGitHubProjects(); } catch {} const projects = [...github, ...customProjects, ...await getSupabaseProjects()].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)); return <article className="projects-page"><div className="projects-heading"><p className="syntax-comment">{'// project-explorer'}</p><h1>projects.json</h1><p className="lead">A collection of things I&apos;ve built, explored, and shipped.</p></div><ProjectList projects={projects} /></article>; }
