export type ItemJob = {
  id: number;
  queue: string;
  cpu: {
    used: number;
    requested: number;
  };
  memory: {
    real_used: number;
    virtual_used: number;
    requested: number;
  };
  time: {
    used: number;
    wall_time: number;
  };
  time_left: string;
  queued_at_time: Date;
  started_at_time: Date;
  wait_time: number;
  job_state: string;
  exec_host: string;
};

export type JobListResult = {
  code?: number;
  message?: string;
  total?: number;
  data?: ItemJob[];
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
