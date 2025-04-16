export interface AppDefaults {
  companyName: string;
  projectName: string;
  url: string;
}

export const defaultSettings: AppDefaults = {
  companyName: process.env.COMPANY_NAME || "MRogal.ski",
  projectName: process.env.PROJECT_NAME || "homepage",
  url: process.env.URL || "https://mrogal.ski"
}; 