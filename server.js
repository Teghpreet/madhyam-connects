import express from 'express';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

// API endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, company, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const data = await resend.emails.send({
      from: 'team@madhyamconnects.com',
      to: ['teghpreetsingh01@gmail.com'],
      replyTo: email,
      subject: 'New Website Enquiry - Madhyam Connects',
      html: `
        <h3>New Website Enquiry - Madhyam Connects</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error sending email' });
  }
});

// Serve static files in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
