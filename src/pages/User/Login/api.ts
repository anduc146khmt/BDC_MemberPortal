// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { LoginParams, LoginResult } from './typings';

/** POST /api/v1/auth/login/ */
export async function login(body: LoginParams, options?: { [key: string]: any }) {
  return request<LoginResult>('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
