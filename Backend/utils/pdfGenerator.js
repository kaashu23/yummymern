const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateOrderPDF = (order, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      
      doc.pipe(stream);

      // Header
      doc.fontSize(25).font('Helvetica-Bold').text('YUMMY', { align: 'center' });
      doc.fontSize(12).font('Helvetica').text('123 Culinary Avenue, Food City', { align: 'center' });
      doc.text('Phone: (123) 456-7890 | Email: hello@yummy.com', { align: 'center' });
      doc.moveDown();
      doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      // Order Details
      doc.fontSize(18).font('Helvetica-Bold').text('Order Receipt');
      doc.fontSize(12).font('Helvetica');
      doc.text(`Order ID: ${order._id}`);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`);
      doc.text(`Customer Name: ${order.user?.name || 'Guest'}`);
      doc.text(`Email: ${order.user?.email || 'N/A'}`);
      
      if (order.orderType === 'delivery') {
        doc.text(`Delivery Address: ${order.deliveryAddress}`);
      }
      doc.moveDown();

      // Items Table Header
      const tableTop = doc.y;
      doc.font('Helvetica-Bold');
      doc.text('Item', 50, tableTop);
      doc.text('Qty', 350, tableTop);
      doc.text('Price', 450, tableTop);
      doc.text('Total', 500, tableTop);
      
      doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).stroke();
      
      // Items
      let yPosition = doc.y + 20;
      doc.font('Helvetica');
      
      order.items.forEach(item => {
        const itemName = item.menuItem?.name || 'Unknown Item';
        const price = item.price;
        const qty = item.quantity;
        const total = price * qty;
        
        doc.text(itemName, 50, yPosition);
        doc.text(qty.toString(), 350, yPosition);
        doc.text(`$${price.toFixed(2)}`, 450, yPosition);
        doc.text(`$${total.toFixed(2)}`, 500, yPosition);
        
        yPosition += 20;
      });

      doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
      yPosition += 15;
      
      // Total
      doc.font('Helvetica-Bold');
      doc.text('Total Amount:', 350, yPosition);
      doc.text(`$${order.totalAmount.toFixed(2)}`, 500, yPosition);
      
      doc.moveDown(3);
      doc.font('Helvetica-Oblique').text('Thank you for dining with Yummy!', { align: 'center' });

      doc.end();
      
      stream.on('finish', () => {
        resolve(filePath);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateOrderPDF;
