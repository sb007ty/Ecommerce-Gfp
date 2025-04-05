// export interface for the main object
export interface ProductDetailsInterface {
  product_id: string;
  name: string;
  description: string;
  category: Category;
  collection: Collection;
  created_at: string;
  colors: string[];
  images: Image[];
  info: InfoSection[];
  inventory: InventoryItem[];
  priceRange: PriceRange;
  rating: number;
  reviews: number;
  sizes: string[];
  sold: number;
}
export interface CartItemInterface extends ProductDetailsInterface {
  quantity: number;
}
// export interface for the 'category' object
export interface Category {
  category_id: string;
  name: string;
  created_at: string;
}

// export interface for the 'collection' object
export interface Collection {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

// export interface for objects in the 'images' array
export interface Image {
  color: string;
  image_url: string;
}

// export interface for objects in the 'info' array
export interface InfoSection {
  title: string;
  description: string[];
}

// export interface for objects in the 'inventory' array
export interface InventoryItem {
  sku: string;
  color: string;
  size: string | null; // Size can be null
  list_price: number;
  discount: number | null; // Discount can be null
  discount_percentage: number | null; // Discount percentage can be null
  sale_price: number;
  sold: number;
  stock: number;
}

// export interface for the 'priceRange' object
export interface PriceRange {
  highest: number;
  lowest: number;
}
