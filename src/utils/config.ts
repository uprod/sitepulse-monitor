export interface WebsiteConfig {
  url: string;
  name: string;
  checkInterval: number;
}

export const saveConfig = (config: WebsiteConfig[]) => {
  localStorage.setItem('website-monitor-config', JSON.stringify(config));
};

export const loadConfig = (): WebsiteConfig[] | null => {
  const saved = localStorage.getItem('website-monitor-config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
};