// @ts-ignore
/* eslint-disable */
import { CONSTANTS_USER_ID } from '@/constants/local-storage-constants';
import { authHeaderConfig } from '@/requestConfig';
import { request } from '@umijs/max';
import { UpdateProfileParams, UpdateProfileResponse } from './data';

/** PUT /api/users */
export async function updateUserProfile(
  body: UpdateProfileParams,
  options?: { [key: string]: any },
) {
  return request<UpdateProfileResponse>(
    '/api/v1/users/' + localStorage.getItem(CONSTANTS_USER_ID),
    {
      method: 'PUT',
      data: body,
      ...(options || {}),
      ...authHeaderConfig,
    },
  );
}
