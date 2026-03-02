export interface Payment {
  id: number;
  transaction_id: string;
  booking_id: string;
  provider_name: string | null;
  amount: number;
  payment_status: string;
}

export interface GetPaymentsRequest {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface GetPaymentsResponse {
  success: boolean;
  message: string;
  data: {
    payments: {
      count: number;
      total_pages: number;
      page: number;
      page_size: number;
      results: Payment[];
    };
  };
}
