// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserInfo = {
    name?: string;
    avatar?: string;
    phone_number?: string;
    role?: string;
    user_id?: string;
    username?: string;
    email?: string;
    address?: string;
    organization?: string;
  };
  type CurrentUser = {
    code?: number;
    data?: UserInfo;
    message?: string;
  };
  type ErrorResponse = {
    errorCode: string;
    errorMessage?: string;
    success?: boolean;
  };
}
