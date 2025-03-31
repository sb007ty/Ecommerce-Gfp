import React from "react";

interface PaginationBarProps {
  onPageChange: (pageNumber: number) => void;
  total: number;
  per_page: number;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  onPageChange,
  total,
  per_page,
}) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };
  if (!total) return null;
  const numOfPages = new Array(Math.ceil(total / per_page)).fill(0);

  return (
    <div className="pagination-bar flex justify-center items-center gap-2 mt-4">
      {numOfPages.map((item, index) => {
        return (
          <button
            onClick={() => handlePageChange(index + 1)}
            key={index}
            className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationBar;
