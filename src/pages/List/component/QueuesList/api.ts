import { authHeaderConfig } from '@/requestConfig';
import { request } from '@umijs/max';
import type { JobListResult } from '../JobsList/typings';
import type { QueueListResult } from './typings';

export async function queryQueuesList(options?: Record<string, any>) {
  return request<QueueListResult>('/api/v1/jobqueues', {
    method: 'GET',
    ...authHeaderConfig,
    ...(options || {}),
  });
}

export async function queryQueueJobsList(options?: Record<string, any>) {
  return request<JobListResult>('/api/v1/jobs', {
    method: 'GET',
    ...authHeaderConfig,
    ...(options || {}),
  });
}
