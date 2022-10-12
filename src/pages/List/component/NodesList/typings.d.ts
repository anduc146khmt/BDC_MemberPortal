export type ItemNode = {
  node: string;
  detail: {
    status: string;
    comment: string;
  };
  cpu_gpu: {
    used: number;
    total: number;
  };
  memory: {
    used: number;
    total: number;
  };
  jobs: number;
};

export type NodeListResult = {
  code?: number;
  message?: string;
  data?: ItemNode[];
  total?: number;
};
