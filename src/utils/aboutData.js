import { addLog, isApiAvailable } from './adminData';

const DEFAULT_ABOUT = {
  main_title: '1 Global Enterprises',
  who_we_are_title: 'Who We Are',
  who_we_are_desc: 'A diversified group with interests in Shipping, Logistics, Distribution, IT, Clean Energy & Trading.',
  our_reach_title: 'Our Reach',
  our_reach_desc: 'A global workforce of 700+ professionals.',
  expertise_title: 'Expertise',
  expertise_desc: 'Each business unit is led by experts ensuring sustainability, execution & growth.',
  logo_src: '/1global1.png',
  banner_src: '/team1.jpg',
};

const LOCAL_STORAGE_KEY = '__1ge_about';
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

export const getAboutDetails = async () => {
  const apiRes = await apiRequest('get_about', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_ABOUT));
    return DEFAULT_ABOUT;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_ABOUT;
  }
};

export const updateAboutDetails = async (aboutData) => {
  addLog('About Us Modified', 'About Us corporate profile content updated.');
  const apiRes = await apiRequest('update_about', aboutData, 'POST');
  if (apiRes && apiRes.success) {
    return true;
  }

  // Local Storage Fallback
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(aboutData));
  return true;
};
