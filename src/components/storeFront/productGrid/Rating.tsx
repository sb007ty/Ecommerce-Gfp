import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/redux-hook";

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
  const seeAllReviews = () => {
    navigate(`/reviews/${productId}`);
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
    </div>
  );
}

export default Rating;
