const generateEmailTemplate = (title, content, callToAction = null) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@300;400;600&display=swap');
      body {
        margin: 0;
        padding: 0;
        background-color: #050505;
        color: #f5f5f5;
        font-family: 'Manrope', Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
        background-color: #0a0a0a;
        border: 1px solid #222;
      }
      .header {
        text-align: center;
        margin-bottom: 40px;
      }
      .logo {
        font-family: 'EB Garamond', serif;
        font-size: 32px;
        color: #c5a059;
        font-style: italic;
        margin: 0;
        letter-spacing: 2px;
      }
      .title {
        font-family: 'EB Garamond', serif;
        font-size: 28px;
        color: #ffffff;
        margin-top: 30px;
        margin-bottom: 20px;
        text-align: center;
      }
      .content {
        font-size: 15px;
        line-height: 1.6;
        color: #aaaaaa;
        text-align: center;
        margin-bottom: 40px;
      }
      .content p {
        margin-bottom: 15px;
      }
      .content strong {
        color: #ffffff;
      }
      .cta-wrapper {
        text-align: center;
        margin-bottom: 40px;
      }
      .cta-button {
        display: inline-block;
        padding: 14px 30px;
        background-color: #c5a059;
        color: #050505;
        text-decoration: none;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 600;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #555555;
        border-top: 1px solid #222;
        padding-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="logo">Yummy</h1>
      </div>
      
      <h2 class="title">${title}</h2>
      
      <div class="content">
        ${content}
      </div>
      
      ${callToAction ? `
      <div class="cta-wrapper">
        <a href="${callToAction.url}" class="cta-button">${callToAction.text}</a>
      </div>
      ` : ''}
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Yummy Fine Dining. All rights reserved.</p>
        <p>Yumyyy...  Shop No 10, Maruti Mandir, Ratnagiri-415612</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = generateEmailTemplate;
