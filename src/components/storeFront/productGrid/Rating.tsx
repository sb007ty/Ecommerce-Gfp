import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux-hook";
import { useState } from "react";
import ReviewsSection from "../reviews/ReviewsSection";

function Rating({
  rating,
  reviews,
  ratingSection,
}: {
  rating: number;
  reviews: number;
  ratingSection: boolean;
}) {
  const ratingIsWholeNum = rating === Math.floor(rating);
  const productId = useAppSelector((state) => state.product.productDetails.id);
  const navigate = useNavigate();
  const [seeReviews, setSeeReviews] = useState(false);
  const seeAllReviews = () => {
    // navigate(`/reviews/${productId}`);
    setSeeReviews(true);
  };

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
      {!ratingSection && (
        <button onClick={seeAllReviews}>
          {reviews > 0 ? `See all ${reviews} reviews` : "No reviews"}
        </button>
      )}
      <ReviewsSection seeReviews={seeReviews} setSeeReviews={setSeeReviews} />
    </div>
  );
}

export default Rating;
