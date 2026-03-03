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

// Job Details Types
export interface JobInformation {
  job_id: string;
  job_category: string | null;
  booking_date: string;
}

export interface JobScheduleLocation {
  customer_name: string;
  contact_number: string;
  date: string;
  time: string;
  address: string | null;
  city_state: string | null;
  zip_code: string;
  pin_location: {
    lat: number | null;
    lng: number | null;
  };
}

export interface ProviderDetails {
  id: string;
  provider_name: string;
  email: string;
  contact_number: string;
  address: string;
  image: string;
}

export interface ServiceItem {
  id: number;
  service_name: string;
  duration: string;
  price: number;
}

export interface ServiceInformation {
  status: string;
  items: ServiceItem[];
}

export interface ServiceImages {
  before: string[];
  after: string[];
}

export interface BookingDetail {
  id: number;
  booking_code: string;
  status: string;
  job_information: JobInformation;
  job_schedule_location: JobScheduleLocation;
  provider_details: ProviderDetails | null;
  service_information: ServiceInformation;
  service_images: ServiceImages;
}

export interface GetBookingDetailResponse {
  success: boolean;
  message: string;
  data: BookingDetail;
}

// Available Providers Types
export interface AvailableProvider {
  provider_id: string;
  normal_id: string;
  provider_name: string;
  email: string;
  contact_number: string;
  address: string;
  image: string;
}

export interface GetAvailableProvidersResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    service_id: number;
    providers: AvailableProvider[];
  };
}

// Assign Provider Types
export interface AssignProviderRequest {
  provider_id: string;
  provider_name: string;
  email: string;
  contact_number: string;
  address: string;
}

export interface AssignProviderResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    status: string;
    provider: {
      id: string;
      normal_id: string;
      provider_name: string;
      email: string;
    };
  };
}

// Change Provider Types
export interface ChangeProviderRequest {
  provider_id: string;
  provider_name: string;
  email: string;
  contact_number: string;
  address: string;
}

export interface ChangeProviderResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    booking_code: string;
    old_provider_id: string | null;
    new_provider_id: string;
    status: string;
  };
}

// Cancel Job Types
export interface CancelJobResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    booking_code: string;
    old_status: string;
    new_status: string;
  };
}
