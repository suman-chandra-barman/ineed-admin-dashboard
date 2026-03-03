export interface Booking {
  id: number;
  booking_id: string;
  customer_name: string;
  service_type: string;
  date_time: string | null;
  assigned_provider: string | null;
  status: string;
  status_label: string;
}

export interface GetBookingsRequest {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface GetBookingsResponse {
  success: boolean;
  message: string;
  data: {
    bookings: {
      count: number;
      total_pages: number;
      page: number;
      page_size: number;
      results: Booking[];
    };
  };
}
