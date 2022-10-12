import { authHeaderConfig } from '@/requestConfig';
import { request } from '@umijs/max';
import type { JobListResult } from './typings';

export async function queryJobsList(options?: Record<string, any>) {
  return request<JobListResult>('/api/v1/jobs', {
    method: 'GET',
    ...authHeaderConfig,
    ...(options || {}),
  });
}
