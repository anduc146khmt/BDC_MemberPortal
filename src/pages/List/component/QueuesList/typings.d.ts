export type ItemQueue = {
  key: number;
  name: string;
  enabled: boolean;
  max_CPU?: number;
  max_memory?: number;
  max_walltime?: number;
  max_run?: number;
  job_running: number;
  job_state?: {
    q?: number;
    r?: number;
  };
};

export type QueueListResult = {
  code?: number;
  message?: string;
  total?: number;
  data?: ItemQueue[];
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
