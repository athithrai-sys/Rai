// Orange star rating (0–5), rendered server-side.
export default function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${rating} / 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`size-3.5 ${
            i <= rounded ? "text-swappo-orange" : "text-swappo-ink/15"
          }`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.5 14.9 8.6l6.6.8-4.9 4.6 1.3 6.5-5.9-3.3-5.9 3.3 1.3-6.5L2.5 9.4l6.6-.8L12 2.5Z" />
        </svg>
      ))}
    </span>
  );
}
