export interface Provider {
  id: string;
  normal_id: string;
  full_name: string;
  email_address: string;
  service_type: string;
  location: string;
  availability_day: string;
  availability_time: string;
  status: string;
}

export interface GetProvidersRequest {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface GetProvidersResponse {
  success: boolean;
  message: string;
  data: {
    providers: {
      count: number;
      total_pages: number;
      page: number;
      page_size: number;
      results: Provider[];
    };
  };
}

export interface ProviderJobHistory {
  id: number;
  job_id: string;
  customer_name: string;
  service: string;
  booking_date: string;
  service_date: string;
  status: string;
  complete_date: string | null;
}

export interface ProviderDetails {
  id: string;
  normal_id: string;
  full_name: string;
  email_address: string;
  image: string | null;
  phone: string | null;
  address: string | null;
  service_types: string[];
  complete_job: number;
  pending_job: number;
  rating: number;
  availability_day: string;
  availability_time: string;
  status: string;
  role: string;
  created_at: string;
}

export interface GetProviderDetailsResponse {
  success: boolean;
  message: string;
  data: {
    provider: ProviderDetails;
    today_jobs: ProviderJobHistory[];
    job_history: {
      count: number;
      total_pages: number;
      page: number;
      page_size: number;
      results: ProviderJobHistory[];
    };
  };
}
