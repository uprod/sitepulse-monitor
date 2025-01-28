export const sendDownNotification = async (siteName: string, siteUrl: string, email: string) => {
  if (!email) {
    console.error('No email address provided for notifications');
    return;
  }

  // Since we can't use Mailjet directly in the browser, we'll log the notification
  console.log('Would send email notification:', {
    to: email,
    subject: `🔴 Site Down Alert: ${siteName}`,
    message: `The website ${siteName} (${siteUrl}) is currently unavailable.`
  });

  // In a real application, this would make an API call to a backend service
  // that would handle the actual email sending using Mailjet
};