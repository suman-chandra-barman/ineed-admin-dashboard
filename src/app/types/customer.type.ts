export interface Customer {
  id: string;
  user_id: string;
  user_name: string;
  email: string;
  total_booking: number;
  status: "Active" | "Inactive";
}

export interface GetCustomersRequest {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface GetCustomersResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    total_pages: number;
    page: number;
    page_size: number;
    results: Customer[];
  };
}
