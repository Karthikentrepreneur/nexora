import { addLog, isApiAvailable } from './adminData';

const DEFAULT_SEO = [
  {
    page_key: 'home',
    title: '1 Global Enterprises Pte Ltd - Sustainable Logistics & Energy',
    description: 'Providing strategic investments for a sustainable, connected future in logistics, renewable energy, and software development.',
    keywords: 'logistics, shipping, renewable energy, software development, sustainability',
    robots: 'index, follow',
  },
  {
    page_key: 'about',
    title: 'About Us | 1 Global Enterprises Pte Ltd',
    description: 'Learn about our reach, our business model, expertise, and leadership in global operations.',
    keywords: 'about us, corporate overview, logistics leadership',
    robots: 'index, follow',
  },
  {
    page_key: 'business_verticals',
    title: 'Our Business Verticals | 1 Global Enterprises Pte Ltd',
    description: 'Discover our core business operations including logistics, shipping, renewable energy, and software development.',
    keywords: 'business verticals, corporate portfolio, logistics services',
    robots: 'index, follow',
  },
  {
    page_key: 'global_presence',
    title: 'Global Presence | 1 Global Enterprises Pte Ltd',
    description: 'View our global offices, coordinates, and contact details across Singapore, India, and internationally.',
    keywords: 'global presence, offices, contact info, shipping coordinates',
    robots: 'index, follow',
  },
  {
    page_key: 'investors',
    title: 'Investor Relations | 1 Global Enterprises Pte Ltd',
    description: 'Corporate transparency, financial performance updates, governance, and annual reports for investors.',
    keywords: 'investor relations, corporate governance, financial reports',
    robots: 'index, follow',
  },
  {
    page_key: 'contact',
    title: 'Contact Us | 1 Global Enterprises Pte Ltd',
    description: 'Get in touch with our team for partnerships, ERP integrations, shipping, and custom solutions.',
    keywords: 'contact us, support email, office phone number',
    robots: 'index, follow',
  },
  {
    page_key: 'shipping',
    title: 'Shipping Services | 1 Global Enterprises Pte Ltd',
    description: 'Professional marine shipping and cargo transport solutions connecting global markets.',
    keywords: 'marine shipping, cargo transport, freight forwarding',
    robots: 'index, follow',
  },
  {
    page_key: 'logistics',
    title: 'Logistics Solutions | 1 Global Enterprises Pte Ltd',
    description: 'End-to-end supply chain logistics, warehousing, and tracking solutions for global enterprises.',
    keywords: 'logistics solutions, warehousing, cargo tracking',
    robots: 'index, follow',
  },
  {
    page_key: 'distribution',
    title: 'Product Distribution | 1 Global Enterprises Pte Ltd',
    description: 'Reliable commercial distribution services connecting suppliers with dynamic global markets.',
    keywords: 'product distribution, supplier network, commercial shipping',
    robots: 'index, follow',
  },
  {
    page_key: 'software',
    title: 'Software Development | 1 Global Enterprises Pte Ltd',
    description: 'Custom software, ERP, and API integration services for modern enterprise operations.',
    keywords: 'software development, ERP integration, API systems',
    robots: 'index, follow',
  },
  {
    page_key: 'renewable',
    title: 'Renewable Energy | 1 Global Enterprises Pte Ltd',
    description: 'Pioneering clean energy investments, solar power grids, and sustainable utility projects.',
    keywords: 'renewable energy, solar power, clean energy grids',
    robots: 'index, follow',
  },
  {
    page_key: 'sustainability',
    title: 'Corporate Sustainability | 1 Global Enterprises Pte Ltd',
    description: 'Our environmental, social, and governance (ESG) commitment to building a greener future.',
    keywords: 'corporate sustainability, ESG metrics, green energy goals',
    robots: 'index, follow',
  },
  {
    page_key: 'supply_chain',
    title: 'Supply Chain Solutions | 1 Global Enterprises Pte Ltd',
    description: 'Optimized and resilient supply chain consulting and implementation for international businesses.',
    keywords: 'supply chain solutions, business resilience, logistics consulting',
    robots: 'index, follow',
  },
  {
    page_key: 'blog',
    title: 'Corporate Blog & News | 1 Global Enterprises Pte Ltd',
    description: 'Stay updated with the latest corporate news, shipping trends, and sustainability insights.',
    keywords: 'corporate blog, industry news, shipping updates',
    robots: 'index, follow',
  }
];

const LOCAL_STORAGE_KEY = '__1ge_seo_metadata';
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

  // Local Storage Fallback
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
