import { authHeaderConfig } from '@/requestConfig';
import { request } from '@umijs/max';
import type { NodeListResult } from './typings';

export async function queryNodeList(options?: Record<string, any>): Promise<NodeListResult> {
  return request('/api/v1/nodes', {
    method: 'GET',
    ...(options || {}),
    ...authHeaderConfig,
  });
}
