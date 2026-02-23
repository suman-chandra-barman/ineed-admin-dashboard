export interface Service {
  id: number;
  category_id: number;
  name: string;
  description: string;
  man_price: string;
  offer_price: string;
  discount: string;
  image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetServicesRequest {
  category_id: number;
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetServicesResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Service[];
}

export interface AdditionalFeature {
  id: number;
  service_id: number;
  additional_features_title: string;
  subtitle: string;
  additional_features_price: string;
  additional_features_image: string;
  estimate_time: string;
  estimate_time_unit: string;
  created_at: string;
  updated_at: string;
}

export interface GetAdditionalFeaturesRequest {
  service_id: number;
}

export interface GetAdditionalFeaturesResponse {
  success: boolean;
  message: string;
  data: AdditionalFeature[];
}

export interface CreateAdditionalFeatureRequest {
  service_id: number;
  additional_features_title: string;
  subtitle: string;
  additional_features_price: string;
  additional_features_image: File;
  estimate_time: string;
  estimate_time_unit: string;
}

export interface CreateAdditionalFeatureResponse {
  success: boolean;
  message: string;
  data: AdditionalFeature;
}

export interface ServiceHour {
  day_of_week: number;
  from_time: string;
  to_time: string;
  is_closed: boolean;
}

export interface CreateServiceRequest {
  category_id: number;
  name: string;
  description: string;
  main_price: string;
  offer_price: string;
  discount: string;
  images: File[]; // Changed from single image to multiple images
  service_hours: string; // JSON stringified array of ServiceHour
}

export interface CreateServiceResponse {
  success: boolean;
  message: string;
  data: Service;
}

export interface DeleteServiceResponse {
  success: boolean;
  message: string;
}

export interface DeleteAdditionalFeatureResponse {
  success: boolean;
  message: string;
}

export interface GetFullServiceResponse {
  success: boolean;
  message: string;
  data: {
    service: Service;
    service_hours: ServiceHour[];
    additional_features: AdditionalFeature[];
  };
}

export interface UpdateServiceRequest {
  id: number;
  category_id: number;
  name: string;
  description: string;
  main_price: string;
  offer_price: string;
  discount: string;
  image?: File;
  service_hours: string;
}

export interface UpdateServiceResponse {
  success: boolean;
  message: string;
  data: Service;
}
