import { addLog, isApiAvailable } from './adminData';

const DEFAULT_LEADERSHIP = {
  block_1_title: 'Our People, Our Strength',
  block_1_desc: 'At Nexora360 Global Solutions, our greatest strength is our people. Experienced professionals who continuously look for opportunities to improve process, productivity and customer experience across our global capability centres and operational hubs.',
  block_2_title: 'Integrated Ecosystem Governance',
  block_2_desc: "Businesses shouldn't need multiple partners for multiple functions. From supporting a single business function to managing complete outsourced operations, our leadership designs solutions around the unique requirements of every client.",
  block_3_title: 'Vision for Lasting Impact',
  block_3_desc: "To be the world's trusted 360° business capability partner, enabling organizations to operate smarter, scale faster and grow stronger. Industry-agnostic and globally focused, we build customized solutions rather than forcing clients into a standard outsourcing model.",
  founder_img: '/aboutbg.png',
  founder_name: 'Nexora360 Leadership Pod',
  founder_title: 'Global Capability & Operations',
};

const LOCAL_STORAGE_KEY = '__nexora360_leadership';
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

export const getLeadershipDetails = async () => {
  const apiRes = await apiRequest('get_leadership', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_LEADERSHIP));
    return DEFAULT_LEADERSHIP;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_LEADERSHIP;
  }
};

export const updateLeadershipDetails = async (leadershipData) => {
  addLog('Leadership Details Modified', 'About Us leadership and profile details updated.');
  const apiRes = await apiRequest('update_leadership', leadershipData, 'POST');
  if (apiRes && apiRes.success) {
    return true;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leadershipData));
  return true;
};
