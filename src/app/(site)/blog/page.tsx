import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Post = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  categories: string[];
};

async function getPosts(): Promise<Post[]> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocol}://${host}/api/tistory`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("RSS feed unavailable");
  return response.json();
}

function formatDate(date: string) {
  if (!date) return "Unknown date";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export default async function Blog() {
  const posts = await getPosts();
  return (
    <article className="blog-page">
      <div className="blog-heading">
        <p className="syntax-comment">{"// latest-posts.rss"}</p>
        <h1>Blog</h1>
        <p className="lead">Notes on frontend, design, and the web.</p>
      </div>
      {posts.length === 0 ? (
        <p className="blog-empty">No public posts yet.</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card-link"
            >
              <Card className="blog-card">
                <CardHeader>
                  <CardDescription>{formatDate(post.pubDate)}</CardDescription>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.contentSnippet}</p>
                  <div className="blog-tags">
                    {post.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
