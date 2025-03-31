import Rating from "../productGrid/Rating";
import "../../../styles/reviews.css";
import Loading from "../../common/Loading";

import { fetchProductReviews } from "../../../swr/fetchers";
import ApiErrorComp from "../../common/ApiErrorComp";
import useSWRImmutable from "swr/immutable";
const ratingTypes: { [key: string]: string } = {
  "5": "excellent",
  "4": "good",
  "3": "average",
  "2": "below average",
  "1": "poor",
};

function OverallRating({
  filterReviews,
  userRating,
  productId,
}: {
  // rating: number;
  productId: string;
  userRating: number;
  // total: number;
  // counts: RatingCount[];
  filterReviews: (rating: number) => void;
}) {
  const {
    data: reviewData,
    isLoading,
    error,
    mutate,
  } = useSWRImmutable<ProductReviews>(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews`,
    fetchProductReviews,
    { keepPreviousData: true }
  );
  console.log(reviewData, "data*", userRating, isLoading, error);
  if (isLoading || !reviewData) return <Loading />;
  if (error) {
    return <ApiErrorComp />;
  }
  const { aggregate, data, pagination } = reviewData;
  const { rating, total, counts } = aggregate || {};
  const reverseCounts = [...counts].reverse();

  return (
    <div className="overall-rating self-start border-2 p-3 lg:w-2/6 w-6/6 ">
      <h2>Overall Rating</h2>
      <Rating rating={rating} reviews={total} ratingSection />
      {reverseCounts.map((item) => {
        const ratingPercent = (item["count"] / total) * 100;
        return (
          <div
            className="rating-type cursor-pointer"
            key={item["rating"]}
            onClick={(e) => filterReviews(item["rating"])}
            style={{
              backgroundColor: userRating === item["rating"] ? "#f0f0f0" : null,
            }}
          >
            <div className="rating-name">{ratingTypes[item["rating"]]}</div>
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
