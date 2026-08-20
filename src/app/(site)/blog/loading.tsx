export default function Loading() {
  return (
    <article className="blog-page">
      <div className="blog-heading">
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-title" />
      </div>
      <div className="blog-grid">
        {[1, 2, 3].map((item) => (
          <div className="skeleton-card" key={item}>
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-card-title" />
            <div className="skeleton skeleton-copy" />
            <div className="skeleton skeleton-copy short" />
          </div>
        ))}
      </div>
    </article>
  );
}
