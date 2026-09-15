import { addLog, isApiAvailable } from './adminData';

const DEFAULT_FOOTER = {
  company: 'Nexora360 Global Solutions Pvt. Ltd.',
  tagline: 'One partner. Every business need.',
  address: 'ED-305, Bollineni Hillside Phase 2,\nPerumbakkam, Chennai 600126',
  email: 'info@nexora360global.com',
  phone_1: '+91 96556 80234',
  phone_2: '',
  phone_3: '',
  copyright: '© 2026 Nexora360 Global Solutions Private Limited',
  linkedin_url: 'https://www.linkedin.com/company/nexora360-global-solutions',
};

const LOCAL_STORAGE_KEY = '__nexora360_footer';
const API_URL = '/api/index.php';

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
    return null;
  }
}

export const getFooterDetails = async () => {
  const apiRes = await apiRequest('get_footer', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_FOOTER));
    return DEFAULT_FOOTER;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_FOOTER;
  }
};

export const updateFooterDetails = async (footerData) => {
  addLog('Footer Modified', 'Footer contact, social, and address details updated.');
  const apiRes = await apiRequest('update_footer', footerData, 'POST');
  if (apiRes && apiRes.success) {
    return true;
  }

  // Local Storage Fallback
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(footerData));
  return true;
};
