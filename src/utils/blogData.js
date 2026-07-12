// Utility to manage blog data dynamically using Hostinger Remote MySQL or localStorage fallback
import { addLog, isApiAvailable } from './adminData';

const DEFAULT_BLOGS = [
  {
    id: '1',
    img: '/blog1.png',
    title: '1GE Expands Operations Across 16+ Countries',
    date: '15',
    month: 'Aug',
    author: 'Corporate Comms',
    tag: 'Global Expansion',
    content: '1 Global Enterprises (1GE) has officially expanded its network footprint, setting up logistics hubs in over 16 countries globally. This strategic expansion is aimed at streamlining supply chain channels and reinforcing 1GE\'s commitment to reliable cross-border services.',
  },
  {
    id: '2',
    img: '/blog2.png',
    title: 'Driving Sustainable Logistics & Renewable Solutions',
    date: '02',
    month: 'Sep',
    author: 'Sustainability Team',
    tag: 'Sustainability',
    content: 'With climate concerns taking center stage, 1GE is incorporating green initiatives across shipping and distribution. Our investment in solar-powered warehouses and electric delivery fleets marks a major step towards reducing carbon footprints and promoting renewable energy solutions.',
  },
  {
    id: '3',
    img: '/blog3.png',
    title: 'Empowering Clients With Technology-Driven Solutions',
    date: '22',
    month: 'Oct',
    author: 'Innovation Desk',
    tag: 'Technology',
    content: '1GE has rolled out its latest custom ERP tracking tool, enabling business clients to track freight in real-time, view sustainability metrics, and optimize dispatch schedules. This tech-first approach aims to minimize delays and enhance operational transparency.',
  },
];

const LOCAL_STORAGE_KEY = '__1ge_blogs';
const API_URL = '/api/index.php';

// Helper to make API calls to the Hostinger PHP MySQL gateway
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
    // Fail silently to trigger localStorage fallback
    return null;
  }
}

export const getBlogs = async () => {
  const apiRes = await apiRequest('get_blogs', null, 'GET');
  if (apiRes && apiRes.success) {
    return apiRes.data;
  }
  
  // Local Storage Fallback
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_BLOGS));
    return DEFAULT_BLOGS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_BLOGS;
  }
};

export const saveBlogs = (blogs) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
};

export const addBlog = async (blog) => {
  addLog('Blog Added', `Created new blog post: "${blog.title}".`);
  const apiRes = await apiRequest('add_blog', blog, 'POST');
  if (apiRes && apiRes.success) {
    return { ...blog, id: apiRes.id };
  }

  // Local Storage Fallback
  const blogs = await getBlogs();
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
  };
  blogs.unshift(newBlog);
  saveBlogs(blogs);
  return newBlog;
};

export const updateBlog = async (id, updatedFields) => {
  addLog('Blog Updated', `Updated blog post ID: ${id} ("${updatedFields.title}").`);
  const apiRes = await apiRequest('update_blog', { id, ...updatedFields }, 'POST');
  if (apiRes && apiRes.success) {
    return;
  }

  // Local Storage Fallback
  const blogs = await getBlogs();
  const updated = blogs.map((b) => (b.id === id ? { ...b, ...updatedFields } : b));
  saveBlogs(updated);
};

export const deleteBlog = async (id) => {
  addLog('Blog Deleted', `Deleted blog post ID: ${id}.`);
  const apiRes = await apiRequest('delete_blog', { id }, 'POST');
  if (apiRes && apiRes.success) {
    return;
  }

  // Local Storage Fallback
  const blogs = await getBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  saveBlogs(filtered);
};
