import { addLog, isApiAvailable } from './adminData';
import { COUNTRIES } from '../Components/GlobalPresence/countriesData';

const LOCAL_STORAGE_KEY = '__1ge_global_presence';
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

export const getGlobalPresence = async () => {
  const apiRes = await apiRequest('get_global_presence', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }

  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(COUNTRIES));
    return COUNTRIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return COUNTRIES;
  }
};

export const addGlobalPresence = async (country) => {
  addLog('Global Presence Added', `Added country location: ${country.name}`);
  const apiRes = await apiRequest('add_global_presence', country, 'POST');
  
  const current = await getGlobalPresence();
  const newCountry = {
    ...country,
    id: apiRes && apiRes.success ? apiRes.id : Date.now()
  };
  current.push(newCountry);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  return true;
};

export const updateGlobalPresence = async (country) => {
  addLog('Global Presence Modified', `Updated country location: ${country.name}`);
  await apiRequest('update_global_presence', country, 'POST');

  const current = await getGlobalPresence();
  const index = current.findIndex(c => c.id === country.id || c.code === country.code);
  if (index !== -1) {
    current[index] = { ...current[index], ...country };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
  }
  return true;
};

export const deleteGlobalPresence = async (id, code, name) => {
  addLog('Global Presence Deleted', `Deleted country location: ${name} (${code})`);
  await apiRequest('delete_global_presence', { id }, 'POST');

  const current = await getGlobalPresence();
  const updated = current.filter(c => c.id !== id && c.code !== code);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return true;
};
