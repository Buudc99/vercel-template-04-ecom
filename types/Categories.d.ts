export interface CategoriesResponse {
  categories: Category[];
}

export interface Category {
  name: string;
  slug: string;
}
