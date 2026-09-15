import { addLog, isApiAvailable } from './adminData';

const DEFAULT_HERO = {
  subtitle: 'Nexora360 Global Solutions Private Limited',
  title: 'One partner. Every business need.',
  description: 'A next-generation global business services and capability partner — bringing GCC, BPO, KPO, digital, customer experience, IT, HR, finance and AI & automation together under one integrated ecosystem.',
  video_src: '/Video2.mp4',
};

const LOCAL_STORAGE_KEY = '__nexora360_home_hero';
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

export const getHomeHero = async () => {
  const apiRes = await apiRequest('get_home_hero', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_HERO));
    return DEFAULT_HERO;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_HERO;
  }
};

export const updateHomeHero = async (heroData) => {
  addLog('Home Hero Modified', 'Home page hero section content updated.');
  const apiRes = await apiRequest('update_home_hero', heroData, 'POST');
  if (apiRes) {
    return apiRes.success;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(heroData));
  return true;
};
