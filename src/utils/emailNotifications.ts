export const sendDownNotification = async (siteName: string, siteUrl: string, email: string) => {
  console.log('Site is down:', {
    site: siteName,
    url: siteUrl
  });
};