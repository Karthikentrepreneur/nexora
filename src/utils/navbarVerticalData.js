import { addLog, isApiAvailable } from './adminData';
import { CAPABILITIES } from './capabilityData';

const DEFAULT_VERTICALS = CAPABILITIES.map((cap, idx) => ({
  id: idx + 1,
  title: cap.title,
  url_path: `/capabilities#cap-${cap.id}`,
  is_active: 1,
  image_src: '/aboutbg.png',
  content: cap.summary
}));

const LOCAL_STORAGE_KEY = '__nexora360_navbar_verticals';
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

export const getNavbarVerticals = async () => {
  const apiRes = await apiRequest('get_navbar_verticals', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_VERTICALS));
    return DEFAULT_VERTICALS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_VERTICALS;
  }
};

export const addNavbarVertical = async (vertical) => {
  addLog('Navbar Vertical Added', `Added navbar link: ${vertical.title}`);
  const apiRes = await apiRequest('add_navbar_vertical', vertical, 'POST');
  
  const current = await getNavbarVerticals();
  const newVertical = {
    ...vertical,
    id: apiRes && apiRes.success ? apiRes.id : Date.now()
  };
  current.push(newVertical);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  return true;
};

export const updateNavbarVertical = async (vertical) => {
  addLog('Navbar Vertical Modified', `Updated navbar link: ${vertical.title}`);
  await apiRequest('update_navbar_vertical', vertical, 'POST');

  const current = await getNavbarVerticals();
  const index = current.findIndex(v => v.id === vertical.id);
  if (index !== -1) {
    current[index] = vertical;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  }
  return true;
};

export const deleteNavbarVertical = async (id) => {
  addLog('Navbar Vertical Deleted', `Deleted navbar link ID: ${id}`);
  await apiRequest('delete_navbar_vertical', { id }, 'POST');

  const current = await getNavbarVerticals();
  const updated = current.filter(v => v.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return true;
};
