import { addLog, isApiAvailable } from './adminData';

const DEFAULT_SEO = [
  {
    page_key: 'home',
    title: 'Nexora360 Global Solutions | One partner. Every business need.',
    description: 'A next-generation global business services and capability partner — bringing GCC, BPO, KPO, digital, customer experience, IT, HR, finance and AI & automation together under one integrated ecosystem.',
    keywords: 'Nexora360, GCC, BPO, KPO, customer experience, digital marketing, AI automation, global business services, IT, HR recruitment, finance',
    robots: 'index, follow',
  },
  {
    page_key: 'about',
    title: 'About Us | Nexora360 Global Solutions',
    description: 'Learn about Nexora360 — businesses shouldn’t need multiple partners for multiple functions. Discover our Technology, People, and Process.',
    keywords: 'about Nexora360, global capability partner, business services ecosystem',
    robots: 'index, follow',
  },
  {
    page_key: 'values',
    title: 'Our Core Values | Nexora360 Global Solutions',
    description: 'What NEXORA360 stands for: Next-Generation Thinking, Excellence, eXecution, Ownership, Reliability, Agility, and 360° Optimization & Value.',
    keywords: 'Nexora360 values, corporate culture, excellence, execution, agility',
    robots: 'index, follow',
  },
  {
    page_key: 'capabilities',
    title: 'Capability Directory | Nexora360 Global Solutions',
    description: 'Thirteen capabilities, one integrated ecosystem: GCC, BPO, CX, Digital Marketing, Sales, KPO, HR, Finance, Admin, Data, AI & Automation, Customized Support.',
    keywords: 'GCC solutions, BPO services, KPO, CX contact center, AI automation, outsourced operations',
    robots: 'index, follow',
  },
  {
    page_key: 'advantage',
    title: 'The Nexora360 360° Advantage | One Ecosystem',
    description: 'One partner. Multiple capabilities. One integrated ecosystem. Every capability connects into the same operating model and single point of accountability.',
    keywords: 'the 360 advantage, unified outsourcing, shared capability model',
    robots: 'index, follow',
  },
  {
    page_key: 'contact',
    title: 'Get In Touch | Nexora360 Global Solutions',
    description: 'Tell us what you’d rather not manage yourself. Contact Nexora360 Global Solutions in Chennai, India.',
    keywords: 'contact Nexora360, outsource operations, business inquiry Chennai',
    robots: 'index, follow',
  }
];

const LOCAL_STORAGE_KEY = '__nexora360_seo_metadata';
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

export const getSeoMetadata = async () => {
  const apiRes = await apiRequest('get_seo_metadata', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SEO));
    return DEFAULT_SEO;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_SEO;
  }
};

export const updateSeoMetadata = async (seoItem) => {
  addLog('SEO Config Modified', `SEO meta tags updated for page: ${seoItem.page_key}.`);
  const apiRes = await apiRequest('update_seo_metadata', seoItem, 'POST');
  if (apiRes && apiRes.success) {
    return true;
  }

  const seoList = await getSeoMetadata();
  const index = seoList.findIndex(item => item.page_key === seoItem.page_key);
  if (index !== -1) {
    seoList[index] = seoItem;
  } else {
    seoList.push(seoItem);
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(seoList));
  return true;
};
