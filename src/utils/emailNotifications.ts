import sendgrid from '@sendgrid/mail';

export const sendDownNotification = async (siteName: string, siteUrl: string, email: string) => {
  if (!email) {
    console.error('No email address provided for notifications');
    return;
  }

  const msg = {
    to: email,
    from: 'notifications@your-domain.com', // Replace with your verified sender
    subject: `🔴 Site Down Alert: ${siteName}`,
    text: `The website ${siteName} (${siteUrl}) is currently unavailable.`,
    html: `
      <div>
        <h2>Website Monitoring Alert</h2>
        <p>The following website is currently <strong>unavailable</strong>:</p>
        <ul>
          <li>Site: ${siteName}</li>
          <li>URL: ${siteUrl}</li>
        </ul>
        <p>Our system will continue monitoring and notify you when the site is back online.</p>
      </div>
    `,
  };

  try {
    await sendgrid.send(msg);
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};