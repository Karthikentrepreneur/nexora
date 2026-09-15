import { addLog, isApiAvailable } from './adminData';

const DEFAULT_ABOUT = {
  main_title: 'Nexora360 Global Solutions',
  tagline: 'One partner. Every business need.',
  who_we_are_title: 'Integrated Ecosystem',
  who_we_are_desc: 'A next-generation global business services and capability partner — bringing GCC, BPO, KPO, digital, customer experience, IT, HR, finance and AI & automation together under one integrated ecosystem.',
  our_reach_title: 'Industry-Agnostic & Globally Focused',
  our_reach_desc: 'Built to support businesses across industries and geographies with flexible operating models from single processes to full GCCs.',
  expertise_title: 'Technology, People & Process',
  expertise_desc: 'Digital automation & AI-enabled solutions, experienced professionals, and structured repeatable ways of working.',
  logo_src: '/nexora360-logo.svg',
  logo_white_src: '/nexora360-logo-white.svg',
  banner_src: '/aboutbg.png',
};

const LOCAL_STORAGE_KEY = '__nexora360_about';
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
