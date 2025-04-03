import { Accordion } from "radix-ui";
import React from "react";
import CategoryFilter from "./filter/Category";
import CollectionFilter from "./filter/Collection";
import ColorFilter from "./filter/Color";
import RatingFilter from "./filter/Rating";
interface filterType {
  unisex: boolean;
  men: boolean;
  women: boolean;
}
const ProductFilter = ({
  filter,
  applyCategory,
  applyCollections,
  collection,
}: {
  filter: CategoryFilterType;
  applyCategory: (val: string) => void;
  collection: CategoryFilterType;
  applyCollection: (val: string) => void;
}) => {
  console.log("heFIL");
  return (
    <div
    // className="height-[50vh]"
    >
      <Accordion.Root
        type="multiple"
        // className="flex flex-col justify-between h-[100%]"
      >
        <Accordion.Item value="collection" className="item1">
          <Accordion.Header asChild>
            <h2>
              <Accordion.Trigger>Collection +</Accordion.Trigger>
            </h2>
          </Accordion.Header>
          <Accordion.Content>
            <CollectionFilter />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="category">
          <Accordion.Header>
            <Accordion.Trigger> Category +</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <CategoryFilter applyCategory={applyCategory} filter={filter} />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="colors">
          <Accordion.Header>
            <Accordion.Trigger> Colors +</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <ColorFilter />
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="rating">
          <Accordion.Header>
            <Accordion.Trigger> Rating +</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <RatingFilter />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

export default ProductFilter;
