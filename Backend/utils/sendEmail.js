const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Upgrades to secure via STARTTLS
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      // Force IPv4 lookup at the socket level to bypass Render IPv6 issues
      lookup: (hostname, dnsOptions, callback) => {
        require('dns').lookup(hostname, { family: 4 }, (err, address, family) => {
          callback(err, address, family);
        });
      }
    });

    const mailOptions = {
      from: `Yummy Restaurant <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
      attachments: options.attachments || []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendEmail;
