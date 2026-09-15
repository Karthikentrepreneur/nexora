// Utility to manage admin login state, credentials, and contact inquiries with Hostinger MySQL API and System Logs

const CREDENTIALS_KEY = '__nexora360_admin_credentials';
const INQUIRIES_KEY = '__nexora360_contact_inquiries';
const LOGS_KEY = '__nexora360_admin_logs';
const API_URL = '/api/index.php';

const DEFAULT_CREDENTIALS = {
  username: 'admin@nexora360global.com',
  password: 'nexora360@global',
};

const DEFAULT_INQUIRIES = [
  {
    id: 'inq_1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@acmecorp.com',
    subject: 'Capability Inquiry: Global Capability Centre (GCC)',
    message: 'Hello, we are interested in establishing a dedicated Global Capability Centre (GCC) with Nexora360. Could you please share details on your BOT model and timeline?',
    date: '2026-06-21T10:30:00Z',
    status: 'unread',
  },
  {
    id: 'inq_2',
    name: 'David Reynolds',
    email: 'david.r@cloudscale.io',
    subject: 'Capability Inquiry: AI & Automation Services',
    message: 'We are looking to outsource our back-office processing and integrate automated IDP pipelines. Let us know when we can schedule an introductory discussion.',
    date: '2026-06-22T14:15:00Z',
    status: 'read',
  },
];

export const isApiAvailable = () => {
  if (API_URL.startsWith('http://') || API_URL.startsWith('https://')) {
    return true;
  }
  // On localhost the Vite dev server proxies /api to the local Node gateway (server.js),
  // so the API is available. Only Vercel deployments (no PHP runtime) fall back to localStorage.
  const hostname = window.location.hostname;
  return !hostname.endsWith('.vercel.app');
};

// Helper to make API calls to the Hostinger PHP MySQL gateway
async function apiRequest(action, data = null, method = 'POST') {
  if (!isApiAvailable()) return null;
  try {
    const url = `${API_URL}?action=${action}`;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (data && method === 'POST') {
      options.body = JSON.stringify(data);
    }
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    // Fail silently to trigger localStorage fallback
    return null;
  }
}

// ----------------------------------------------------
// SYSTEM LOGS HELPERS
// ----------------------------------------------------
export const getLogs = () => {
  const stored = localStorage.getItem(LOGS_KEY);
  if (!stored) {
    const initLogs = [
      { id: 'log_1', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), action: 'System Setup', details: 'Database tables auto-initialized.' },
      { id: 'log_2', timestamp: new Date(Date.now() - 3600000).toISOString(), action: 'Data Seeding', details: 'Default corporate blogs and inquiries loaded.' },
    ];
    localStorage.setItem(LOGS_KEY, JSON.stringify(initLogs));
    return initLogs;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const addLog = (action, details) => {
  const logs = getLogs();
  const newLog = {
    id: 'log_' + Date.now().toString(),
    timestamp: new Date().toISOString(),
    action,
    details
  };
  logs.unshift(newLog);
  // Cap logs to avoid local storage bloat
  if (logs.length > 50) {
    logs.pop();
  }
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  return newLog;
};

export const clearLogs = () => {
  localStorage.removeItem(LOGS_KEY);
  addLog('Logs Action', 'System logs cleared by administrator.');
};

// ----------------------------------------------------
// AUTH HELPERS
// ----------------------------------------------------
export const getCredentials = () => {
  const stored = localStorage.getItem(CREDENTIALS_KEY);
  if (!stored) {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
    return DEFAULT_CREDENTIALS;
  }
  try {
    const creds = JSON.parse(stored);
    // If the browser still has the old default credentials stored, upgrade them to the new ones
    if (creds && creds.username === 'admin' && creds.password === 'password123') {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
      return DEFAULT_CREDENTIALS;
    }
    return creds;
  } catch (e) {
    return DEFAULT_CREDENTIALS;
  }
};

export const updatePassword = async (newPassword) => {
  const apiRes = await apiRequest('update_password', { username: 'admin@1ge.com', password: newPassword }, 'POST');
  addLog('Security Config', 'Admin account password updated.');
  if (apiRes && apiRes.success) {
    return true;
  }

  // Local Storage Fallback
  const creds = getCredentials();
  creds.password = newPassword;
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  return true;
};

export const checkLogin = async (username, password) => {
  const apiRes = await apiRequest('check_login', { username, password }, 'POST');
  let success = false;
  let message = '';

  if (apiRes) {
    success = apiRes.success;
    message = apiRes.message || '';
  } else {
    // Local Storage Fallback
    const creds = getCredentials();
    success = creds.username.toLowerCase() === username.toLowerCase() && creds.password === password;
    if (!success) {
      message = 'Authorization failed. Invalid credentials.';
    }
  }

  if (success) {
    addLog('Auth Access', 'Admin successfully logged in.');
  } else {
    addLog('Auth Failure', `Failed login attempt with username: ${username}. Reason: ${message || 'Invalid credentials'}`);
  }
  return { success, message };
};

export const setLoggedIn = (status) => {
  if (status) {
    sessionStorage.setItem('__1ge_admin_logged_in', 'true');
  } else {
    addLog('Auth Access', 'Admin logged out.');
    sessionStorage.removeItem('__1ge_admin_logged_in');
  }
};

export const isLoggedIn = () => {
  return sessionStorage.getItem('__1ge_admin_logged_in') === 'true';
};

// ----------------------------------------------------
// INQUIRIES HELPERS
// ----------------------------------------------------
export const getInquiries = async () => {
  const apiRes = await apiRequest('get_inquiries', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data.map(inq => ({
      ...inq,
      id: inq.id.toString(),
      date: inq.date || new Date().toISOString()
    }));
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(INQUIRIES_KEY);
  if (!stored) {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(DEFAULT_INQUIRIES));
    return DEFAULT_INQUIRIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_INQUIRIES;
  }
};

export const addInquiry = async (inquiry) => {
  addLog('Inquiry Received', `New contact inquiry submitted by ${inquiry.name}.`);
  const apiRes = await apiRequest('add_inquiry', inquiry, 'POST');
  if (apiRes && apiRes.success) {
    return { ...inquiry, id: apiRes.id.toString(), date: new Date().toISOString(), status: 'unread' };
  }

  // Local Storage Fallback
  const inquiries = await getInquiries();
  const newInquiry = {
    ...inquiry,
    id: 'inq_' + Date.now().toString(),
    date: new Date().toISOString(),
    status: 'unread',
  };
  inquiries.unshift(newInquiry);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  return newInquiry;
};

export const updateInquiryStatus = async (id, status) => {
  // If id is inq_1 or similar (local fallback ID), use local storage. MySQL uses integer IDs.
  if (id.includes('inq_')) {
    const inquiries = await getInquiries();
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return;
  }

  const apiRes = await apiRequest('update_inquiry_status', { id: parseInt(id), status }, 'POST');
  if (apiRes && apiRes.success) {
    return;
  }

  // Local Storage Fallback
  const inquiries = await getInquiries();
  const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
};

export const deleteInquiry = async (id) => {
  addLog('Inquiry Action', `Deleted contact inquiry record ID: ${id}`);
  if (id.includes('inq_')) {
    const inquiries = await getInquiries();
    const filtered = inquiries.filter((inq) => inq.id !== id);
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));
    return;
  }

  const apiRes = await apiRequest('delete_inquiry', { id: parseInt(id) }, 'POST');
  if (apiRes && apiRes.success) {
    return;
  }

  // Local Storage Fallback
  const inquiries = await getInquiries();
  const filtered = inquiries.filter((inq) => inq.id !== id);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const res = await fetch(`${API_URL}?action=upload_file`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Upload request failed');
    const data = await res.json();
    if (data && data.success) {
      addLog('Media Uploaded', `File uploaded: "${data.filename}" (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      return data;
    }
    alert(data ? data.message : 'Upload failed');
    return null;
  } catch (e) {
    // Local Dev preview mock upload
    const mockUrl = '/' + file.name.replace(/\s+/g, '_');
    // Store uploaded files log in local storage mock upload history
    const stored = localStorage.getItem('__1ge_mock_uploads') || '[]';
    const uploads = JSON.parse(stored);
    uploads.unshift({
      name: file.name.replace(/\s+/g, '_'),
      url: mockUrl,
      size: file.size,
      type: file.type,
      date: new Date().toISOString()
    });
    localStorage.setItem('__1ge_mock_uploads', JSON.stringify(uploads));
    addLog('Media Uploaded', `[Mock] Local file preview uploaded: "${file.name}"`);
    return { success: true, url: mockUrl, filename: file.name.replace(/\s+/g, '_') };
  }
};

export const getUploadedFiles = () => {
  const stored = localStorage.getItem('__1ge_mock_uploads');
  return stored ? JSON.parse(stored) : [];
};
