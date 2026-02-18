export interface Category {
  id: number;
  category_icon_upload: string;
  category_name: string;
  subtitle: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetCategoriesRequest {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Category[];
}

export interface CreateCategoryRequest {
  category_icon_upload: File;
  category_name: string;
  subtitle: string;
}

export interface CreateCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}
