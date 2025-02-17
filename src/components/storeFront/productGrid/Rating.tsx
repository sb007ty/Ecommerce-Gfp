import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rating({ rating, reviews }: { rating: number; reviews: number }) {
  const ratingIsWholeNum = rating === Math.floor(rating);

  return (
    <div className="rating-container">
      <div>{rating}</div>
      <div className="star-container">
        {Array(Math.floor(rating))
          .fill(0)
          .map((item, index) => (
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#FFD43B" }}
              key={index}
            />
          ))}
        {!ratingIsWholeNum && (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            style={{ color: "#FFD43B" }}
          />
        )}
      </div>
      <div>{reviews > 0 ? `See all ${reviews} reviews` : "No reviews"}</div>
    </div>
  );
}

export default Rating;
