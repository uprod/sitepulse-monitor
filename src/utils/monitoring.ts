export interface WebsiteStatus {
  isUp: boolean;
  responseTime: number;
}

export const checkWebsiteStatus = async (url: string): Promise<WebsiteStatus> => {
  const startTime = performance.now();
  try {
    const response = await fetch(url);
    const endTime = performance.now();
    return {
      isUp: response.ok,
      responseTime: Math.round(endTime - startTime)
    };
  } catch (error) {
    return {
      isUp: false,
      responseTime: 0
    };
  }
};