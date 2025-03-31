import React, { useState } from "react";

const SortDropdown = ({
  applySort,
}: {
  applySort: (sortParam: string) => void;
}) => {
  const [sortBy, setSortBy] = useState<string>("sortby");
  return (
    <div className="flex justify-end items-center m-4 gap-5 ">
      {sortBy !== "sortby" && (
        <button
          onClick={({ target: { value } }) => {
            setSortBy("sortby");
            applySort("sortby");
          }}
          className="border-2 p-2 hover:bg-amber-100"
        >
          Clear Sort
        </button>
      )}
      <select
        className="border-2 p-2"
        onChange={(e) => {
          applySort(e.target.value);
          setSortBy(e.target.value);
        }}
        value={sortBy}
      >
        <option value={"sortby"} hidden>
          Sort
        </option>
        <option value={"created"}>Sort By Created</option>
        <option value={"rating"}>Sort By Rating</option>
        <option value={"popularity"}>Sort By Popularity</option>
        <option value={"price"}>Sort By Price</option>
      </select>
    </div>
  );
};

export default SortDropdown;
