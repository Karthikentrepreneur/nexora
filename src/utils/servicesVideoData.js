// Utility to manage Services Video Section dynamically using Hostinger MySQL or localStorage fallback
import { addLog, isApiAvailable } from './adminData';

const DEFAULT_SVS = {
  video_src: '/video.mp4',
  heading: 'Business Verticals',
  subheading: 'Integrated solutions powered by people, technology, and purpose',
};

const LOCAL_STORAGE_KEY = '__1ge_services_video';
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

export const getServicesVideoDetails = async () => {
  const apiRes = await apiRequest('get_services_video', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SVS));
    return DEFAULT_SVS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_SVS;
  }
};

export const updateServicesVideoDetails = async (svsData) => {
  addLog('SVS Configuration', 'Business verticals header and video configuration updated.');
  const apiRes = await apiRequest('update_services_video', svsData, 'POST');
  if (apiRes && apiRes.success) {
    return true;
  }

  // Local Storage Fallback
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(svsData));
  return true;
};
