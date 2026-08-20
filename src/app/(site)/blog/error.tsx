"use client";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <article className="blog-page blog-error">
      <p className="syntax-comment">{"// error: rss connection failed"}</p>
      <h1>Blog unavailable</h1>
      <p className="lead">There was a problem loading the Tistory posts.</p>
      <button onClick={() => reset()}>Retry</button>
    </article>
  );
}
