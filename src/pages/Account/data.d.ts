export type UpdateProfileParams = {
  name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  organization?: string;
  avatar?: string;
};
export type UpdateProfileResponse = {
  code?: number;
  message?: string;
  data?: API.UserInfo;
};
