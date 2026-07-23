import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Backend API route for secure admin authentication
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body || {};

    const rawAdminEmail = process.env.ADMIN_EMAIL || 'excuses.heckles.94@icloud.com';
    const rawAdminPassword = process.env.ADMIN_PASSWORD || 'Sd2-@3cd-eas(*&8mss_s0';

    // Sanitize target credentials (remove surrounding quotes & trim)
    const targetEmail = rawAdminEmail.replace(/^["']|["']$/g, '').trim().toLowerCase();
    const targetPassword = rawAdminPassword.replace(/^["']|["']$/g, '').trim();

    // Sanitize user input (remove surrounding quotes & trim)
    const cleanEmail = String(email || '').replace(/^["']|["']$/g, '').trim().toLowerCase();
    const cleanPassword = String(password || '').replace(/^["']|["']$/g, '').trim();

    const isMatch = cleanEmail === targetEmail && cleanPassword === targetPassword;

    console.log(`[SERVER AUTH LOG] Input Email: "${cleanEmail}" | Expected Email: "${targetEmail}"`);
    console.log(`[SERVER AUTH LOG] Input Password Length: ${cleanPassword.length} | Expected Password Length: ${targetPassword.length}`);
    console.log(`[SERVER AUTH LOG] Match Result: ${isMatch}`);

    if (isMatch) {
      return res.json({
        success: true,
        message: 'Authentication successful',
        user: { email: targetEmail, role: 'admin' }
      });
    } else {
      return res.status(401).json({
        success: false,
        error: 'Failed to Access',
        subError: 'Add correct Credentials'
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fortis Law Associates Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
