import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resend-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/send-email' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const { name, email, phone, company, message } = JSON.parse(body);
                  if (!name || !email || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Name, email, and message are required.' }));
                    return;
                  }
                  
                  const apiKey = process.env.RESEND_API_KEY || 're_123456789';
                  
                  const { Resend } = await import('resend');
                  const resend = new Resend(apiKey);
                  
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
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(data));
                } catch (error: any) {
                  console.error('Middleware Error sending email:', error);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: error.message || 'Error sending email' }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
