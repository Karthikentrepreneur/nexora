// Local development mirror of public/api/index.php (Hostinger PHP gateway).
// Serves the same `/api/index.php?action=...` contract against the remote MySQL DB
// so the Vite dev server can proxy API calls during local development.
// In production on Hostinger, PHP handles these routes — this file is dev-only.
import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env manually to avoid extra dependency (same parser as import-db.js)
function loadEnv() {
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let val = parts.slice(1).join('=').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val;
      }
    });
  }
}
loadEnv();

const PORT = process.env.PORT || 3007;

const pool = mysql.createPool({
  host: process.env.DB_HOST || '193.203.184.173',
  user: process.env.DB_USER || 'u546576758_1ge',
  password: process.env.DB_PASS || 'Admin@2026@#',
  database: process.env.DB_NAME || 'u546576758_1ge',
  waitForConnections: true,
  connectionLimit: 5
});

const app = express();
app.use(express.json());

// Uploads go to public/ so Vite serves them at / immediately (mirrors PHP behavior)
const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'mp4', 'webm', 'ico'];
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'public'),
    filename: (req, file, cb) => {
      let name = path.basename(file.originalname).replace(/\s+/g, '_').replace(/[^A-Za-z0-9_\-.]/g, '');
      cb(null, name);
    }
  })
});

const ok = (data = {}) => ({ success: true, ...data });
const fail = (message) => ({ success: false, message });

const handlers = {
  // --- GLOBAL PRESENCE ---
  async get_global_presence() {
    const [rows] = await pool.query('SELECT id, code, name, lat, lng, priority, address, cities FROM global_presence ORDER BY priority ASC, name ASC');
    for (const r of rows) {
      try { r.cities = JSON.parse(r.cities) || []; } catch { r.cities = []; }
    }
    return ok({ data: rows });
  },
  async add_global_presence(input) {
    const [res] = await pool.query(
      'INSERT INTO global_presence (code, name, lat, lng, priority, address, cities) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [input.code, input.name, input.lat, input.lng, input.priority ?? 1, input.address ?? null, JSON.stringify(input.cities ?? [])]
    );
    return ok({ id: res.insertId });
  },
  async update_global_presence(input) {
    await pool.query(
      'UPDATE global_presence SET code = ?, name = ?, lat = ?, lng = ?, priority = ?, address = ?, cities = ? WHERE id = ?',
      [input.code, input.name, input.lat, input.lng, input.priority, input.address ?? null, JSON.stringify(input.cities ?? []), input.id]
    );
    return ok();
  },
  async delete_global_presence(input) {
    await pool.query('DELETE FROM global_presence WHERE id = ?', [input.id]);
    return ok();
  },

  // --- BLOGS ---
  async get_blogs() {
    const [rows] = await pool.query('SELECT id, img, title, date_day as date, month_short as month, author, tag, content FROM blogs ORDER BY id DESC');
    return ok({ data: rows });
  },
  async add_blog(input) {
    const [res] = await pool.query(
      'INSERT INTO blogs (img, title, date_day, month_short, author, tag, content) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [input.img ?? '/blog1.png', input.title, input.date, input.month, input.author, input.tag, input.content]
    );
    return ok({ id: res.insertId });
  },
  async update_blog(input) {
    await pool.query(
      'UPDATE blogs SET title = ?, date_day = ?, month_short = ?, author = ?, tag = ?, content = ? WHERE id = ?',
      [input.title, input.date, input.month, input.author, input.tag, input.content, input.id]
    );
    return ok();
  },
  async delete_blog(input) {
    await pool.query('DELETE FROM blogs WHERE id = ?', [input.id]);
    return ok();
  },

  // --- INQUIRIES ---
  async get_inquiries() {
    const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY id DESC');
    return ok({ data: rows });
  },
  async add_inquiry(input) {
    const [res] = await pool.query(
      "INSERT INTO inquiries (name, email, subject, message, status) VALUES (?, ?, ?, ?, 'unread')",
      [input.name, input.email, input.subject ?? 'No Subject', input.message]
    );
    return ok({ id: res.insertId });
  },
  async update_inquiry_status(input) {
    await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [input.status, input.id]);
    return ok();
  },
  async delete_inquiry(input) {
    await pool.query('DELETE FROM inquiries WHERE id = ?', [input.id]);
    return ok();
  },

  // --- AUTH ---
  async check_login(input) {
    const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [input.username]);
    const user = rows[0];
    // PHP's password_hash emits $2y$ which bcryptjs doesn't recognize; $2b$/$2a$ are equivalent
    if (user && bcrypt.compareSync(input.password, user.password.replace(/^\$2y\$/, '$2b$'))) {
      return ok();
    }
    return fail('Invalid credentials');
  },
  async update_password(input) {
    const hashed = bcrypt.hashSync(input.password, 10);
    await pool.query('UPDATE admin_users SET password = ? WHERE username = ?', [hashed, input.username ?? 'admin@1ge.com']);
    return ok();
  },

  // --- ABOUT ---
  async get_about() {
    const [rows] = await pool.query('SELECT main_title, who_we_are_title, who_we_are_desc, our_reach_title, our_reach_desc, expertise_title, expertise_desc, logo_src, banner_src FROM about_details LIMIT 1');
    return ok({ data: rows[0] || null });
  },
  async update_about(input) {
    const [[{ n }]] = await pool.query('SELECT COUNT(*) n FROM about_details');
    const vals = [input.main_title, input.who_we_are_title, input.who_we_are_desc, input.our_reach_title, input.our_reach_desc, input.expertise_title, input.expertise_desc, input.logo_src ?? '/1global1.png', input.banner_src ?? '/team1.jpg'];
    if (n === 0) {
      await pool.query('INSERT INTO about_details (main_title, who_we_are_title, who_we_are_desc, our_reach_title, our_reach_desc, expertise_title, expertise_desc, logo_src, banner_src) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', vals);
    } else {
      await pool.query('UPDATE about_details SET main_title = ?, who_we_are_title = ?, who_we_are_desc = ?, our_reach_title = ?, our_reach_desc = ?, expertise_title = ?, expertise_desc = ?, logo_src = ?, banner_src = ?', vals);
    }
    return ok();
  },

  // --- HOME HERO ---
  async get_home_hero() {
    const [rows] = await pool.query('SELECT subtitle, title, video_src FROM home_hero LIMIT 1');
    return ok({ data: rows[0] || null });
  },
  async update_home_hero(input) {
    const [[{ n }]] = await pool.query('SELECT COUNT(*) n FROM home_hero');
    const vals = [input.subtitle, input.title, input.video_src];
    if (n === 0) {
      await pool.query('INSERT INTO home_hero (subtitle, title, video_src) VALUES (?, ?, ?)', vals);
    } else {
      await pool.query('UPDATE home_hero SET subtitle = ?, title = ?, video_src = ?', vals);
    }
    return ok();
  },

  // --- SERVICES VIDEO ---
  async get_services_video() {
    const [rows] = await pool.query('SELECT video_src, heading, subheading FROM services_video_section LIMIT 1');
    return ok({ data: rows[0] || null });
  },
  async update_services_video(input) {
    const [[{ n }]] = await pool.query('SELECT COUNT(*) n FROM services_video_section');
    const vals = [input.video_src, input.heading, input.subheading];
    if (n === 0) {
      await pool.query('INSERT INTO services_video_section (video_src, heading, subheading) VALUES (?, ?, ?)', vals);
    } else {
      await pool.query('UPDATE services_video_section SET video_src = ?, heading = ?, subheading = ?', vals);
    }
    return ok();
  },

  // --- FOOTER ---
  async get_footer() {
    const [rows] = await pool.query('SELECT address, email, phone_1, phone_2, phone_3, copyright, linkedin_url FROM footer_details LIMIT 1');
    return ok({ data: rows[0] || null });
  },
  async update_footer(input) {
    const [[{ n }]] = await pool.query('SELECT COUNT(*) n FROM footer_details');
    const vals = [input.address, input.email, input.phone_1, input.phone_2, input.phone_3, input.copyright, input.linkedin_url];
    if (n === 0) {
      await pool.query('INSERT INTO footer_details (address, email, phone_1, phone_2, phone_3, copyright, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?)', vals);
    } else {
      await pool.query('UPDATE footer_details SET address = ?, email = ?, phone_1 = ?, phone_2 = ?, phone_3 = ?, copyright = ?, linkedin_url = ?', vals);
    }
    return ok();
  },

  // --- LEADERSHIP ---
  async get_leadership() {
    const [rows] = await pool.query('SELECT block_1_title, block_1_desc, block_2_title, block_2_desc, block_3_title, block_3_desc, founder_img, founder_name, founder_title FROM about_leadership LIMIT 1');
    return ok({ data: rows[0] || null });
  },
  async update_leadership(input) {
    const [[{ n }]] = await pool.query('SELECT COUNT(*) n FROM about_leadership');
    const vals = [input.block_1_title, input.block_1_desc, input.block_2_title, input.block_2_desc, input.block_3_title, input.block_3_desc, input.founder_img, input.founder_name, input.founder_title];
    if (n === 0) {
      await pool.query('INSERT INTO about_leadership (block_1_title, block_1_desc, block_2_title, block_2_desc, block_3_title, block_3_desc, founder_img, founder_name, founder_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', vals);
    } else {
      await pool.query('UPDATE about_leadership SET block_1_title = ?, block_1_desc = ?, block_2_title = ?, block_2_desc = ?, block_3_title = ?, block_3_desc = ?, founder_img = ?, founder_name = ?, founder_title = ?', vals);
    }
    return ok();
  },

  // --- NAVBAR VERTICALS ---
  async get_navbar_verticals() {
    const [rows] = await pool.query('SELECT id, title, url_path, is_active, image_src, content FROM navbar_verticals ORDER BY id ASC');
    return ok({ data: rows });
  },
  async add_navbar_vertical(input) {
    const [res] = await pool.query(
      'INSERT INTO navbar_verticals (title, url_path, is_active, image_src, content) VALUES (?, ?, ?, ?, ?)',
      [input.title, input.url_path, input.is_active ?? 1, input.image_src ?? '/shipping.png', input.content ?? '']
    );
    return ok({ id: res.insertId });
  },
  async update_navbar_vertical(input) {
    await pool.query(
      'UPDATE navbar_verticals SET title = ?, url_path = ?, is_active = ?, image_src = ?, content = ? WHERE id = ?',
      [input.title, input.url_path, input.is_active, input.image_src, input.content, input.id]
    );
    return ok();
  },
  async delete_navbar_vertical(input) {
    await pool.query('DELETE FROM navbar_verticals WHERE id = ?', [input.id]);
    return ok();
  },

  // --- SEO METADATA ---
  async get_seo_metadata() {
    const [rows] = await pool.query('SELECT page_key, title, description, keywords, robots FROM seo_metadata');
    return ok({ data: rows });
  },
  async update_seo_metadata(input) {
    await pool.query(
      `INSERT INTO seo_metadata (page_key, title, description, keywords, robots) VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description), keywords = VALUES(keywords), robots = VALUES(robots)`,
      [input.page_key, input.title, input.description, input.keywords, input.robots]
    );
    return ok();
  }
};

app.all('/api/index.php', upload.single('file'), async (req, res) => {
  const action = req.query.action || '';

  if (action === 'upload_file') {
    if (!req.file) return res.json(fail('No file uploaded.'));
    const ext = path.extname(req.file.filename).slice(1).toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      fs.unlinkSync(req.file.path);
      return res.json(fail('Invalid file type. Allowed: ' + ALLOWED_EXT.join(', ')));
    }
    return res.json(ok({ url: '/' + req.file.filename, filename: req.file.filename }));
  }

  const handler = handlers[action];
  if (!handler) return res.json(fail('Invalid gateway action'));
  try {
    res.json(await handler(req.body || {}));
  } catch (e) {
    res.json(fail(e.message));
  }
});

app.listen(PORT, () => {
  console.log(`1GE dev API gateway running at http://localhost:${PORT} (DB: ${process.env.DB_NAME || 'u546576758_1ge'} @ ${process.env.DB_HOST || '193.203.184.173'})`);
});
