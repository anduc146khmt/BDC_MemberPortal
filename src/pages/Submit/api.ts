import { authHeaderConfig } from '@/requestConfig';
import { request } from '@umijs/max';
import type { JobScriptPayload, JobScriptResponse } from './typings';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export async function uploadScript(body: JobScriptPayload, options?: Record<string, any>) {
  await waitTime(5000);
  return request<JobScriptResponse>('/api/v1/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...authHeaderConfig,
    ...(options || {}),
  });
}
