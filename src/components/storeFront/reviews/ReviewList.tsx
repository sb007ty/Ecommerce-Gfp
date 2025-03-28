import Review from "./Review";

function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="review-list">
      {reviews.map((item) => {
        return <Review review={item} />;
      })}
    </div>
  );
}

export default ReviewList;
