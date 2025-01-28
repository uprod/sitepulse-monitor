import { Client } from 'node-mailjet';

export const sendDownNotification = async (siteName: string, siteUrl: string, email: string) => {
  if (!email) {
    console.error('No email address provided for notifications');
    return;
  }

  try {
    const mailjet = new Client({
      apiKey: process.env.MAILJET_API_KEY || '',
      apiSecret: process.env.MAILJET_API_SECRET || ''
    });

    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: "your-verified-sender@domain.com", // Replace with your verified sender
            Name: "Website Monitor"
          },
          To: [
            {
              Email: email,
              Name: "Subscriber"
            }
          ],
          Subject: `🔴 Site Down Alert: ${siteName}`,
          TextPart: `The website ${siteName} (${siteUrl}) is currently unavailable.`,
          HTMLPart: `
            <div>
              <h2>Website Monitoring Alert</h2>
              <p>The following website is currently <strong>unavailable</strong>:</p>
              <ul>
                <li>Site: ${siteName}</li>
                <li>URL: ${siteUrl}</li>
              </ul>
              <p>Our system will continue monitoring and notify you when the site is back online.</p>
            </div>
          `
        }
      ]
    });

    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};