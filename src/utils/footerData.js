import { addLog, isApiAvailable } from './adminData';

const DEFAULT_FOOTER = {
  address: '1 Global Enterprises Pte Ltd\n#03-01, Keppel Distripark,\n511 Kampong Bahru Road,\nSingapore 099447',
  email: 'info@1ge.sg',
  phone_1: '+65 69080838',
  phone_2: '+65 69080849',
  phone_3: '+65 98177292',
  copyright: '© 1 Global Enterprises, All Rights Reserved.',
  linkedin_url: 'https://www.linkedin.com/company/1-global-enterprises/',
};

const LOCAL_STORAGE_KEY = '__1ge_footer';
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
