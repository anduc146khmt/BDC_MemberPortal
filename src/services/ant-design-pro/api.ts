// @ts-ignore
import { CONSTANTS_USER_ID } from '@/constants/local-storage-constants';
import { authHeaderConfig, errorConfig } from '@/requestConfig';
import { request } from '@umijs/max';

export async function outLogin(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/v1', {
    method: 'GET',
    ...(options || {}),
    ...errorConfig,
  });
}

/** GET /api/currentUser */
export async function getCurrentUser(options?: Record<string, any>) {
  return request<API.CurrentUser>('/api/v1/users/' + localStorage.getItem(CONSTANTS_USER_ID), {
    method: 'GET',
    ...(options || {}),
    ...authHeaderConfig,
    ...errorConfig,
  });
}
