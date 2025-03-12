interface RatingCount {
  count: number;
  rating: number;
}

interface Aggregate {
  counts: RatingCount[];
  rating: number;
  total: number;
}

interface User {
  name: string;
  user_id: string;
  avatar_url: string;
}

interface Review {
  rating: number;
  content: string;
  created_at: string; // Assuming ISO date format as a string
  user: User;
}

interface Pagination {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}

interface ProductReviews {
  aggregate: Aggregate;
  data: Review[];
  pagination: Pagination;
}
