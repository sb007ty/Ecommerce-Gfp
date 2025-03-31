import { monthsArr } from "../../../utils/constants";

function Review({ review }: { review: Review }) {
  const { created_at, user, content, rating } = review;
  const { avatar_url, user_id, name } = user;
  const createdAtDate = new Date(created_at);
  const year = createdAtDate.getFullYear();
  const month = monthsArr[createdAtDate.getMonth()];
  const date = createdAtDate.getDate();
  const formattedDate = `${date} ${month} , ${year}`;
  return (
    <div className="user-review p-5">
      <figure className="user-img-container min-w-[80px]">
        {avatar_url ? (
          <img
            className="user-img h-[80px] max-w-full w-[80px]"
            src={avatar_url}
            alt=""
            height={"80px"}
            width={"80px"}
          />
        ) : (
          <div className="h-[80px] w-[80px] flex justify-center items-center bg-gray-700 roun rounded-[50%]">
            {name[0] + " " + name[name.indexOf(" ") + 1]}
          </div>
        )}
      </figure>

      <div className="grow">
        <div className="flex justify-between items-center">
          <div>{name}</div>
          <div>{formattedDate}</div>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default Review;
