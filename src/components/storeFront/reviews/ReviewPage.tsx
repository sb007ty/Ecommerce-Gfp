import useSWRImmutable from "swr/immutable";
import { fetchProductReviews } from "../../../swr/fetchers";
import ApiErrorComp from "../../common/ApiErrorComp";
import Loading from "../../common/Loading";
import Review from "./Review";

function ReviewPage({
  page,
  productId,
  userRating,
}: {
  page: number;
  productId: string;
  userRating: number;
}) {
  const {
    data: reviewData,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWRImmutable<ProductReviews>(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews?page=${page}&per_page=${12}${userRating > 0 ? `&rating=${userRating}` : ""}`,
    fetchProductReviews,
    { keepPreviousData: true }
  );
  // console.log(page, "PAGE*************");
  const { pagination } = reviewData || {};
  const reviews = reviewData?.data;
  const { total, page: paginationPage, per_page, has_more } = pagination || {};

  console.log(reviewData, isLoading, isValidating, "data and loading");
  if (error) return <ApiErrorComp />;
  if (isLoading && !reviewData)
    return (
      <div className="flex-grow">
        <Loading />
      </div>
    );
  return (
    <>
      {reviews?.map((item) => {
        return <Review review={item} />;
      })}
    </>
  );
}

export default ReviewPage;
