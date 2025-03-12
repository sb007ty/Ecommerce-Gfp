import Rating from "../productGrid/Rating";
import "../../../styles/reviews.css";
const ratingTypes: string[] = [
  "excellent", // Corresponds to the highest rating (e.g., 5 stars)
  "good", // Corresponds to a high rating (e.g., 4 stars)
  "average", // Corresponds to an average rating (e.g., 3 stars)
  "below average", // Corresponds to a below-average rating (e.g., 2 stars)
  "poor", // Corresponds to the lowest rating (e.g., 1 star)
];
function OverallRating({
  rating,
  total,
  counts,
}: {
  rating: number;
  total: number;
  counts: RatingCount[];
}) {
  console.log(counts, "cou**");
  return (
    <div className="overall-rating">
      <h2>Overall Rating</h2>
      <Rating rating={rating} reviews={total} ratingSection />
      {counts.reverse().map((item, index) => {
        const ratingPercent = (item["count"] / total) * 100;
        return (
          <div className="rating-type" key={index}>
            <div className="rating-name">{ratingTypes[index]}</div>
            <div className="rating-bar-outer">
              <div
                className="rating-bar-inner"
                style={{ width: `${ratingPercent}%` }}
              ></div>
            </div>
            <div>{`${ratingPercent.toFixed(2)}%`}</div>
          </div>
        );
      })}
      <button>Write a Review</button>
    </div>
  );
}

export default OverallRating;
