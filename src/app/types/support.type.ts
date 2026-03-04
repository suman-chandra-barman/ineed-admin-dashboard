export interface ContactMessage {
  id: number;
  full_name: string;
  email_address: string;
  message: string;
  is_agreed: boolean;
  created_at: string;
}

export interface GetContactMessagesRequest {
  page?: number;
  limit?: number;
}

export interface GetContactMessagesResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ContactMessage[];
}
