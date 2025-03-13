import useSWRImmutable from "swr/immutable";
import OverallRating from "./OverallRating";
import ReviewList from "./ReviewList";
import { useAppSelector } from "../../../redux/redux-hook";
import { useLocation, useParams } from "react-router-dom";
import { fetchProductReviews } from "../../../swr/fetchers";
import Loading from "../../common/Loading";
import ApiErrorComp from "../../common/ApiErrorComp";
console.log("HELLO&*********************");
function ReviewsSection() {
  const location = useLocation();
  const { pathname } = location;
  const { productId: productIdFromParams } = useParams();
  const productId =
    useAppSelector((state) => state.product.productDetails.id) ||
    productIdFromParams;
  const {
    data: reviewData,
    isLoading,
    error,
  } = useSWRImmutable<ProductReviews>(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews`,
    fetchProductReviews
  );
  console.log(reviewData, "data*");
  if (isLoading) return <Loading />;
  if (error) return <ApiErrorComp />;
  const { aggregate, data, pagination } = reviewData || {};
  const { rating, total, counts } = aggregate!;
  console.log("hello***", data, counts);

  return (
    <div className="reviews-section">
      <OverallRating rating={rating} total={total} counts={counts} />
      <ReviewList />
    </div>
  );
}

export default ReviewsSection;
