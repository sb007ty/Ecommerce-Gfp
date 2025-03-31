import useSWRImmutable from "swr/immutable";
import { fetchProductReviews } from "../../../swr/fetchers";
import Review from "./Review";
import ApiErrorComp from "../../common/ApiErrorComp";
import Loading from "../../common/Loading";
import { useEffect, useMemo, useRef, useState } from "react";
import ReviewPage from "./ReviewPage";

function ReviewList({
  productId,
  userRating,
  page,
  setPage,
  reviewListRef,
}: {
  productId: string;
  userRating: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  reviewListRef: React.RefObject<HTMLDivElement>;
}) {
  const [perPage, setPerPage] = useState<number>(12);
  const {
    data: reviewData,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWRImmutable<ProductReviews>(
    `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${productId}/reviews?page=${page}&per_page=${perPage}${userRating > 0 ? `&rating=${userRating}` : ""}`,
    fetchProductReviews,
    { keepPreviousData: true }
  );

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

  const numOfLeft = total - paginationPage * per_page;
  const showMoreReviews = () => {
    setPage(page + 1);
  };
  let reviewPages = [];
  for (let i = 1; i <= page; i++) {
    reviewPages.push(i);
  }

  return (
    <div
      className="review-list border-2 p- overflow-auto h-[100%]"
      data-id="review-list-container"
      ref={reviewListRef}
    >
      {reviewPages.map((item) => {
        return (
          <ReviewPage
            page={item}
            productId={productId}
            userRating={userRating}
            key={item}
          />
        );
      })}
      {has_more && (
        <button onClick={showMoreReviews}>See {numOfLeft} more reviews</button>
      )}
    </div>
  );
}

export default ReviewList;
