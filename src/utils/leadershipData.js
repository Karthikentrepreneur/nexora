import { addLog, isApiAvailable } from './adminData';

const DEFAULT_LEADERSHIP = {
  block_1_title: 'Our People, Our Strength',
  block_1_desc: 'At 1 Global Enterprises, our greatest strength is our people. Across every division and region, it is the passion, creativity, and commitment of our employees that turn ideas into real impact. Their dedication drives innovation, builds trust with our partners, and fuels the progress that defines who we are as a company.',
  block_2_title: 'Leadership That Empowers',
  block_2_desc: 'JP, the Managing Director and Founder of 1 Global Enterprises, believes that true leadership begins with empowering others. He attributes the company’s growth and success to the collective effort of a talented and diverse team that shares a common purpose — creating meaningful progress for our people and our customers.',
  block_3_title: 'Vision for Lasting Impact',
  block_3_desc: 'Under JP’s guidance, 1 Global Enterprises has evolved into a group of businesses spanning renewable energy, sustainable supply chain solutions, software innovation, and responsible product distribution. His vision proves that commercial excellence and social responsibility can coexist — empowering communities, advancing cleaner technologies, and creating lasting value for generations to come through collaboration and having a long term vision.',
  founder_img: '/founder.jpg',
  founder_name: 'Mr. Jay Prakash',
  founder_title: 'Managing Director & Founder',
};

const LOCAL_STORAGE_KEY = '__1ge_leadership';
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

  // Local Storage Fallback
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
  addLog('Leadership Details Modified', 'About Us leadership and founder profile details updated.');
  const apiRes = await apiRequest('update_leadership', leadershipData, 'POST');
  if (apiRes && apiRes.success) {
    return true;
  }

  // Local Storage Fallback
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leadershipData));
  return true;
};
