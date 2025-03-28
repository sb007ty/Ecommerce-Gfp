function Review({ review }: { review: Review }) {
  const { created_at, user, content, rating } = review;
  const { avatar_url, user_id, name } = user;
  return (
    <div className="user-review">
      <figure className="user-img-container">
        <img
          className="user-img"
          src={avatar_url}
          alt=""
          height={"25px"}
          width={"25px"}
        />
      </figure>

      <div>
        <div>{name}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default Review;
