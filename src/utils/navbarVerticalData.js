import { addLog, isApiAvailable } from './adminData';

const DEFAULT_VERTICALS = [
  {
    id: 1,
    title: 'Supply Chain Solutions',
    url_path: '/supply-chain-solutions',
    is_active: 1,
    image_src: '/image1.png',
    content: "1 Global Enterprises invests in and builds high-performing logistics and technology businesses that power global trade. Our portfolio spans 16 countries, covering every major segment of the supply chain — including freight forwarding, warehousing, distribution, and digital logistics infrastructure. Through strategic ownership and operational expertise, we support our group companies in driving innovation, operational excellence, and sustainable growth. Our focus is on strengthening global connectivity and creating long-term value across the supply chain landscape."
  },
  {
    id: 2,
    title: 'Renewable Energy',
    url_path: '/renewable-energy',
    is_active: 1,
    image_src: '/renew.jpeg',
    content: "We drive sustainable growth through strategic investments across the renewable energy value chain — from feedstock origination to processing and technology enablement. Our portfolio supports the global shift toward renewable fuels and SAF by securing and optimising advanced feedstock supply. Operating across multiple regions, we build ethical, traceable sourcing networks and pre-treatment infrastructure, strengthening transparency, efficiency, and environmental integrity while accelerating the transition to cleaner energy."
  },
  {
    id: 3,
    title: 'Product Distribution',
    url_path: '/product-distribution',
    is_active: 1,
    image_src: '/distribution.png',
    content: "Through strategic partnerships, our group company Citygn manages the distribution of ENOC lubricants and other industrial products across key territories. Our focus is on building efficient, customer-centric networks supported by strong logistics capabilities and reliable after-sales service. By combining local market expertise with the strength of global brands, we ensure consistent quality, reach, and value delivery across every channel."
  }
];

const LOCAL_STORAGE_KEY = '__1ge_navbar_verticals';
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
    const parsed = JSON.parse(stored);
    
    // Force reset local storage if old verticals are present or count is different
    const hasOldItems = parsed.some(item => 
      item.title === 'Shipping' || 
      item.title === 'Logistics' || 
      item.title === 'Software Development' || 
      item.title === 'Corporate Sustainability'
    );
    if (hasOldItems || parsed.length !== 3) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_VERTICALS));
      return DEFAULT_VERTICALS;
    }

    // Check if we need to migrate local storage to include content / image_src properties
    const needsMigration = parsed.some(item => item.content === undefined || item.image_src === undefined);
    if (needsMigration) {
      const migrated = DEFAULT_VERTICALS.map(def => {
        const found = parsed.find(p => p.id === def.id || p.url_path === def.url_path);
        return {
          ...def,
          ...found,
          content: found && found.content !== undefined ? found.content : def.content,
          image_src: found && found.image_src !== undefined ? found.image_src : def.image_src
        };
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return parsed;
  } catch (e) {
    return DEFAULT_VERTICALS;
  }
};

export const addNavbarVertical = async (vertical) => {
  addLog('Navbar Vertical Added', `Added navbar link: ${vertical.title}`);
  const apiRes = await apiRequest('add_navbar_vertical', vertical, 'POST');
  
  // Update local storage regardless
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

  // Update local storage
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

  // Update local storage
  const current = await getNavbarVerticals();
  const updated = current.filter(v => v.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return true;
};
