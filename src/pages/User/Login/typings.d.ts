// @ts-ignore
/* eslint-disable */

export type LoginResult = {
  code?: number;
  data?: {
    expired_at?: string;
    refresh_token?: string;
    token?: string;
    user_id?: string;
    username?: string;
  };
  message?: string;
};
export type LoginParams = {
  username?: string;
  password?: string;
};
