export const DEFAULT_RESUME_URL = "/Mohamed_Faisal_Resume.pdf";
export const DEFAULT_RESUME_FILENAME = "Mohamed_Faisal_Resume.pdf";

export interface ResumeSettings {
  resume_url: string;
  resume_filename: string;
}

export const DEFAULT_RESUME: ResumeSettings = {
  resume_url: DEFAULT_RESUME_URL,
  resume_filename: DEFAULT_RESUME_FILENAME,
};
