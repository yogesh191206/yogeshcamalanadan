import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing with generous limit for certificate attachments or previews
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const STORE_FILE = path.join(DATA_DIR, 'portfolio-store.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

interface PortfolioStore {
  internships: any[];
  courses: any[];
  certificates: any[];
}

function getStore(): PortfolioStore {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading store:', err);
  }
  return { internships: [], courses: [], certificates: [] };
}

function saveStore(data: PortfolioStore) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store:', err);
  }
}

function getMessages(): any[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading messages:', err);
  }
  return [];
}

function saveMessages(msgs: any[]) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing messages:', err);
  }
}

// Simple in-memory session store for verified admin tokens
const activeAdminTokens = new Set<string>();
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'yogesh@2026';

function verifyAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Admin authentication required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token && (activeAdminTokens.has(token) || token === ADMIN_PASSCODE)) {
    return next();
  }

  return res.status(401).json({ success: false, message: 'Invalid or expired admin session' });
}

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. Get Dynamic Portfolio Data
app.get('/api/portfolio-data', (req, res) => {
  const store = getStore();
  res.json({
    success: true,
    data: store
  });
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ success: false, message: 'Passcode is required' });
  }

  if (passcode.trim() === ADMIN_PASSCODE) {
    const token = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    activeAdminTokens.add(token);
    return res.json({
      success: true,
      message: 'Admin authenticated successfully',
      token
    });
  }

  return res.status(401).json({ success: false, message: 'Incorrect passcode. Please try again.' });
});

// 3. Admin Verify Session
app.post('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  const isValid = token && (activeAdminTokens.has(token) || token === ADMIN_PASSCODE);
  return res.json({ authenticated: !!isValid });
});

// 4. Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    activeAdminTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// 5. Add Internship (Admin)
app.post('/api/internships', verifyAdmin, (req, res) => {
  const { company, role, duration, description, skills, certificate, badge } = req.body;

  if (!company?.trim() || !role?.trim() || !duration?.trim() || !description?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Company Name, Role, Internship Duration, and Description are required.'
    });
  }

  const parsedSkills = Array.isArray(skills)
    ? skills.map(s => String(s).trim()).filter(Boolean)
    : typeof skills === 'string'
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  const store = getStore();
  const newInternship = {
    id: `internship-${Date.now()}`,
    company: company.trim(),
    role: role.trim(),
    duration: duration.trim(),
    description: description.trim(),
    skills: parsedSkills.length > 0 ? parsedSkills : ['Web Development'],
    certificate: certificate ? certificate.trim() : undefined,
    badge: badge ? badge.trim() : (duration.toLowerCase().includes('30') ? '30-Day Internship' : null),
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  store.internships.unshift(newInternship);
  saveStore(store);

  res.status(201).json({
    success: true,
    message: 'Internship added successfully',
    item: newInternship
  });
});

// 6. Add Course (Admin)
app.post('/api/courses', verifyAdmin, (req, res) => {
  const { name, platform, completionDate, description, certificate, skills } = req.body;

  if (!name?.trim() || !platform?.trim() || !completionDate?.trim() || !description?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Course Name, Platform/Institution, Completion Date, and Description are required.'
    });
  }

  const parsedSkills = Array.isArray(skills)
    ? skills.map(s => String(s).trim()).filter(Boolean)
    : typeof skills === 'string'
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  const store = getStore();
  const newCourse = {
    id: `course-${Date.now()}`,
    name: name.trim(),
    platform: platform.trim(),
    completionDate: completionDate.trim(),
    description: description.trim(),
    certificate: certificate ? certificate.trim() : undefined,
    skills: parsedSkills,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  store.courses.unshift(newCourse);
  saveStore(store);

  res.status(201).json({
    success: true,
    message: 'Course added successfully',
    item: newCourse
  });
});

// 7. Add Certificate (Admin)
app.post('/api/certificates', verifyAdmin, (req, res) => {
  const { title, issuer, date, certificateImage, certificateLink, description, skills, tag } = req.body;

  if (!title?.trim() || !issuer?.trim() || !date?.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Certificate Name, Issuing Organization, and Date are required.'
    });
  }

  const parsedSkills = Array.isArray(skills)
    ? skills.map(s => String(s).trim()).filter(Boolean)
    : typeof skills === 'string'
      ? skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  const store = getStore();
  const newCert = {
    id: `cert-${Date.now()}`,
    title: title.trim(),
    issuer: issuer.trim(),
    date: date.trim(),
    tag: tag ? tag.trim() : 'Verified Credential',
    description: description ? description.trim() : `Official certification awarded by ${issuer.trim()}.`,
    skills: parsedSkills.length > 0 ? parsedSkills : ['Accreditation'],
    certificateImage: certificateImage ? certificateImage.trim() : undefined,
    certificateLink: certificateLink ? certificateLink.trim() : undefined,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  store.certificates.unshift(newCert);
  saveStore(store);

  res.status(201).json({
    success: true,
    message: 'Certificate added successfully',
    item: newCert
  });
});

// 8. Delete Dynamic Item (Admin)
app.delete('/api/items/:type/:id', verifyAdmin, (req, res) => {
  const { type, id } = req.params;
  const store = getStore();

  if (type === 'internships' || type === 'courses' || type === 'certificates') {
    const originalLen = store[type].length;
    store[type] = store[type].filter((item: any) => item.id !== id);
    if (store[type].length !== originalLen) {
      saveStore(store);
      return res.json({ success: true, message: `Item deleted successfully.` });
    }
  }

  return res.status(404).json({ success: false, message: 'Item not found' });
});

// 9. Contact / Message System (Public endpoint with validation)
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Form validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid name (at least 2 characters).'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a descriptive message (at least 5 characters).'
    });
  }

  const sanitizedSubject = subject && typeof subject === 'string' && subject.trim()
    ? subject.trim()
    : `Portfolio Inquiry from ${name.trim()}`;

  const messageRecord = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    email: email.trim(),
    subject: sanitizedSubject,
    message: message.trim(),
    sentToEmail: process.env.CONTACT_EMAIL || 'yogesh191206@gmail.com',
    timestamp: new Date().toISOString(),
    ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
    read: false
  };

  // Persist message record
  const messages = getMessages();
  messages.unshift(messageRecord);
  saveMessages(messages);

  // Attempt email delivery if SMTP is configured in environment variables
  let emailDispatched = false;
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"${name.trim()}" <${process.env.SMTP_USER}>`,
        replyTo: email.trim(),
        to: process.env.CONTACT_EMAIL || 'yogesh191206@gmail.com',
        subject: `[Portfolio Contact] ${sanitizedSubject}`,
        text: `You have received a new contact message from your portfolio website:\n\nFrom: ${name.trim()} (${email.trim()})\nSubject: ${sanitizedSubject}\n\nMessage:\n${message.trim()}\n\nDate: ${new Date().toLocaleString()}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 16px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 20px;">New Portfolio Contact Message</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Received for Yogesh (${process.env.CONTACT_EMAIL || 'yogesh191206@gmail.com'})</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>From:</strong> ${name.trim()}</p>
              <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>Email:</strong> <a href="mailto:${email.trim()}" style="color: #2563eb;">${email.trim()}</a></p>
              <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>Subject:</strong> ${sanitizedSubject}</p>
            </div>
            <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message.trim()}</p>
            </div>
            <div style="font-size: 12px; color: #94a3b8; text-align: center;">
              Sent from Yogesh's Portfolio Contact Portal • ${new Date().toLocaleString()}
            </div>
          </div>
        `
      });
      emailDispatched = true;
    } catch (mailErr) {
      console.error('SMTP email dispatch error (message preserved in inbox store):', mailErr);
    }
  }

  const targetEmail = process.env.CONTACT_EMAIL || 'yogesh191206@gmail.com';
  return res.json({
    success: true,
    message: emailDispatched
      ? `Your message has been directly dispatched to Yogesh (${targetEmail}). Thank you for reaching out!`
      : `Your message has been received and stored for Yogesh (${targetEmail}). You will receive a response shortly!`,
    timestamp: messageRecord.timestamp
  });
});

// 10. Admin: Get Messages
app.get('/api/admin/messages', verifyAdmin, (req, res) => {
  const msgs = getMessages();
  res.json({ success: true, messages: msgs });
});

// ==========================================
// VITE MIDDLEWARE & SERVER LAUNCH
// ==========================================
async function startServer() {
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
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
