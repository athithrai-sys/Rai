// Star rating (0–5) in the prototype's gold (#E8A33D) / grey-off colours.
export default function Stars({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  const rounded = Math.round(rating);
  return (
    <span
      className="inline-flex justify-center gap-px"
      role="img"
      aria-label={`${rating} / 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden
          style={{ fontSize: size }}
          className={
            i <= rounded ? "text-swappo-gold" : "text-swappo-star-off"
          }
        >
          ★
        </span>
      ))}
    </span>
  );
}
