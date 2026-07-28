const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateOrderPDF = (order, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // --- COLORS & STYLES ---
      const brandColor = '#c5a059';
      const textColor = '#333333';
      const lightGray = '#f4f4f4';
      const darkGray = '#555555';

      // --- HEADER ---
      // Brand Name
      doc.fontSize(32).font('Helvetica-Bold').fillColor(brandColor).text('YUMMY', { align: 'center' });
      doc.moveDown(0.2);

      // Contact Info
      doc.fontSize(10).font('Helvetica').fillColor(darkGray);
      doc.text('Yumyyy... Shop No. 10, Maruti Mandir, Ratnagiri', { align: 'center' });
      doc.text('Phone: 8080299491 | Email: kashishsalvi06@gmail.com', { align: 'center' });

      doc.moveDown(1.5);

      // Divider
      doc.strokeColor(brandColor).lineWidth(1.5).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
      doc.moveDown(1.5);

      // --- ORDER INFO ---
      doc.fontSize(16).font('Helvetica-Bold').fillColor(textColor).text('ORDER RECEIPT', { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(11).font('Helvetica').fillColor(darkGray);
      const topOfInfo = doc.y;

      // Left Column (Order Details)
      doc.text(`Order ID:`, 50, topOfInfo, { continued: true }).font('Helvetica-Bold').text(` ${order._id}`);
      doc.font('Helvetica').text(`Date:`, 50, doc.y + 5, { continued: true }).font('Helvetica-Bold').text(` ${new Date(order.createdAt).toLocaleString()}`);
      doc.font('Helvetica').text(`Type:`, 50, doc.y + 5, { continued: true }).font('Helvetica-Bold').text(` ${order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}`);

      // Right Column (Customer Details)
      doc.font('Helvetica').text(`Customer:`, 300, topOfInfo, { continued: true }).font('Helvetica-Bold').text(` ${order.customerInfo?.name || 'Guest'}`);
      doc.font('Helvetica').text(`Email:`, 300, doc.y + 5, { continued: true }).font('Helvetica-Bold').text(` ${order.customerInfo?.email || 'N/A'}`);

      if (order.orderType === 'delivery' && order.deliveryAddress) {
        const addr = order.deliveryAddress;
        doc.font('Helvetica').text(`Address:`, 300, doc.y + 5, { continued: true }).font('Helvetica-Bold').text(` ${addr.street || ''}, ${addr.city || ''} ${addr.zipCode || ''}`);
      }

      doc.moveDown(2);

      // --- ITEMS TABLE ---
      const tableTop = doc.y + 20;

      // Table Header Background
      doc.rect(50, tableTop - 5, 495, 25).fill(brandColor);

      // Table Header Text
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(12);
      doc.text('Item Description', 60, tableTop);
      doc.text('Qty', 300, tableTop, { width: 50, align: 'center' });
      doc.text('Price', 380, tableTop, { width: 70, align: 'right' });
      doc.text('Total', 470, tableTop, { width: 65, align: 'right' });

      // Items Rows
      let yPosition = tableTop + 35;
      doc.font('Helvetica').fontSize(11);

      let isAlternate = false;

      order.items.forEach(item => {
        // Bug Fix: use item.name directly since item.menuItem is unpopulated ObjectId
        const itemName = item.name || 'Unknown Item';
        const price = item.price;
        const qty = item.quantity;
        const total = price * qty;

        // Alternate row shading
        if (isAlternate) {
          doc.rect(50, yPosition - 5, 495, 25).fill(lightGray);
        }
        isAlternate = !isAlternate;

        doc.fillColor(textColor);
        doc.text(itemName, 60, yPosition, { width: 230, lineBreak: false });
        doc.text(qty.toString(), 300, yPosition, { width: 50, align: 'center' });
        doc.text(`Rs ${price.toFixed(2)}`, 380, yPosition, { width: 70, align: 'right' });
        doc.text(`Rs ${total.toFixed(2)}`, 470, yPosition, { width: 65, align: 'right' });

        yPosition += 25;
      });

      doc.moveDown(1);
      yPosition = doc.y;

      // --- TOTALS SECTION ---
      doc.strokeColor(brandColor).lineWidth(1).moveTo(300, yPosition).lineTo(545, yPosition).stroke();
      yPosition += 10;

      doc.font('Helvetica-Bold').fontSize(12).fillColor(textColor);
      doc.text('Subtotal:', 300, yPosition, { width: 150, align: 'right' });
      doc.text(`Rs ${order.subtotal?.toFixed(2) || '0.00'}`, 470, yPosition, { width: 65, align: 'right' });

      yPosition += 20;
      doc.text('Tax:', 300, yPosition, { width: 150, align: 'right' });
      doc.text(`Rs ${order.tax?.toFixed(2) || '0.00'}`, 470, yPosition, { width: 65, align: 'right' });

      yPosition += 20;
      doc.rect(300, yPosition - 5, 245, 25).fill(lightGray);
      doc.font('Helvetica-Bold').fontSize(14).fillColor(brandColor);
      doc.text('Grand Total:', 300, yPosition, { width: 150, align: 'right' });
      doc.text(`Rs ${order.totalAmount?.toFixed(2) || '0.00'}`, 470, yPosition, { width: 65, align: 'right' });

      // --- FOOTER ---
      doc.moveDown(4);
      doc.font('Helvetica-Oblique').fontSize(12).fillColor(darkGray);
      doc.text('Thank you for choosing Yummy!', 50, doc.y, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(10).text('We hope you enjoy your meal. Looking forward to serving you again.', { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateOrderPDF;
