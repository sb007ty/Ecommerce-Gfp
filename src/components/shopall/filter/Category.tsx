import React, { useState } from "react";

interface filterType {
  unisex: boolean;
  men: boolean;
  women: boolean;
}
const CategoryFilter: React.FC<{
  filter: CategoryFilterType;
  applyCategory: (val: string, val2: boolean) => void;
}> = ({ applyCategory, filter }) => {
  function filterChange(e: React.ChangeEvent<HTMLInputElement>) {
    applyCategory(e.target.id, e.target.checked);
  }
  return (
    <div className="flex flex-col p-1">
      <div className="flex justify-between">
        <label htmlFor="unisex">Unisex</label>
        <input
          type="checkbox"
          name=""
          id="unisex"
          checked={filter.unisex}
          onChange={filterChange}
        />
      </div>
      <div className="flex justify-between">
        <label htmlFor="women">Women</label>
        <input
          type="checkbox"
          name=""
          id="women"
          checked={filter.women}
          onChange={filterChange}
        />
      </div>
      <div className="flex justify-between">
        <label htmlFor="men">Men</label>
        <input
          type="checkbox"
          name=""
          id="men"
          checked={filter.men}
          onChange={filterChange}
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
