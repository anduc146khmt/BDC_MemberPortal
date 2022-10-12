export type JobScriptData = {
  title: string;
  script?: any[];
  description: string;
};

export type JobScriptPayload = {
  job_title: string;
  job_script: string;
  job_description?: string;
};

export type JobScriptResponse = {
  code?: number;
  message?: string;
  data?: {
    job_id?: string;
    job_title?: string;
    job_description?: string;
  };
};
