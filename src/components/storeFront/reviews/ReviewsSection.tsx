import useSWRImmutable from "swr/immutable";
import OverallRating from "./OverallRating";
import ReviewList from "./ReviewList";
import { useAppSelector } from "../../../redux/redux-hook";
import { useLocation, useParams } from "react-router-dom";
import { fetchProductReviews } from "../../../swr/fetchers";
import Loading from "../../common/Loading";
import ApiErrorComp from "../../common/ApiErrorComp";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";

function ReviewsSection({
  seeReviews,
  setSeeReviews,
}: {
  seeReviews: boolean;
  setSeeReviews: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const location = useLocation();
  const { pathname } = location;
  const { productId: productIdFromParams } = useParams();
  const [userRating, setUserRating] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const productId =
    useAppSelector((state) => state.product.productDetails.id) ||
    productIdFromParams;
  const reviewListRef = useRef<HTMLDivElement>(null);
  const filterReviews = (rating: number) => {
    // Filter reviews based on rating type
    setUserRating(rating);
    setPage(1);
    reviewListRef.current.scrollTop = 0;

    console.log(rating, "rating**");
  };
  if (!seeReviews) return null;
  return createPortal(
    <div
      className="reviews-section fixed top-4  border rounded-2xl left-6/12 -translate-x-6/12  p-10 h-[80vh] overflow-auto
    bg-white w-2/3"
    >
      <OverallRating
        productId={productId}
        filterReviews={filterReviews}
        userRating={userRating}
      />
      <ReviewList
        productId={productId}
        userRating={userRating}
        page={page}
        setPage={setPage}
        reviewListRef={reviewListRef}
      />
      <button
        className="absolute sm:top-[5px] sm:right-[25px] top-[2px] right-[5px] hover:bg-amber-100 w-10 h-10"
        onClick={() => {
          setSeeReviews(false);
          setUserRating(0);
          setPage(1);
          setPerPage(12);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>,
    document.body
  );
}

export default ReviewsSection;
