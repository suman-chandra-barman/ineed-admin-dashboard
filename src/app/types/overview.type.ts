export interface TrendInfo {
  percent: number;
  direction: "up" | "down";
  text: string;
}

export interface CardMetric {
  value: number;
  trend: TrendInfo;
}

export interface OverviewCards {
  total_users: CardMetric;
  total_providers: CardMetric;
  active_bookings: CardMetric;
  completed_jobs: CardMetric;
  revenue_total: number;
}

export interface RecentUser {
  id: string;
  full_name: string;
  role: string;
  normal_id: string;
  email_address: string;
  contact_number: string | null;
  join_date: string;
}

export interface RecentUsersData {
  count: number;
  total_pages: number;
  page: number;
  page_size: number;
  results: RecentUser[];
}

export interface OverviewData {
  cards: OverviewCards;
  recent_users: RecentUsersData;
}

export interface OverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
}

export interface OverviewRequest {
  search?: string;
  page?: number;
}

// User Details types
export interface UserDetail {
  id: string;
  normal_id: string;
  full_name: string;
  email_address: string;
  phone: string | null;
  image: string | null;
  address: string | null;
  total_job: number;
  role: string;
  created_at: string;
}

export interface JobHistoryItem {
  id: number;
  job_id: string;
  provider_name: string | null;
  contact_number: string | null;
  category: string;
  booking_date: string;
  complete_date: string | null;
}

export interface JobHistoryData {
  count: number;
  total_pages: number;
  page: number;
  page_size: number;
  results: JobHistoryItem[];
}

export interface UserDetailsData {
  user: UserDetail;
  job_history: JobHistoryData;
}

export interface UserDetailsResponse {
  success: boolean;
  message: string;
  data: UserDetailsData;
}
