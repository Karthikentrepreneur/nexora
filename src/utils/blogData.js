// Utility to manage blog data dynamically using Hostinger Remote MySQL or localStorage fallback
import { addLog, isApiAvailable } from './adminData';

const DEFAULT_BLOGS = [
  {
    id: '1',
    img: '/aboutbg.png',
    title: 'Nexora360 Unveils Integrated 360° Capability Ecosystem',
    date: '15',
    month: 'Jan',
    author: 'Corporate Communications',
    tag: 'Ecosystem Launch',
    content: 'Nexora360 Global Solutions Private Limited brings GCC, BPO, KPO, digital marketing, sales, customer experience, IT, HR, finance, and AI & automation together under one unified operating model, eliminating vendor fragmentation.',
  },
  {
    id: '2',
    img: '/aboutbg.png',
    title: 'Why Enterprises Are Replacing Fragmented Vendors with Unified Pods',
    date: '28',
    month: 'Feb',
    author: 'Strategy Pod',
    tag: 'Operating Model',
    content: 'Businesses shouldn’t need multiple partners for multiple functions. Discover how unified reporting, integrated security governance, and single-point accountability deliver superior SLA outcomes.',
  },
  {
    id: '3',
    img: '/aboutbg.png',
    title: 'Next-Generation AI & Robotic Automation in Modern Global Services',
    date: '12',
    month: 'Mar',
    author: 'AI & Automation Lab',
    tag: 'AI & Automation',
    content: 'Embracing emerging technologies, AI, and digital process automation creates smarter solutions and future-ready businesses with measurable outcomes, not just reduced costs.',
  },
];

const LOCAL_STORAGE_KEY = '__nexora360_blogs';
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
