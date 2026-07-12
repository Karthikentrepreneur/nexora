import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  isLoggedIn,
  setLoggedIn,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  updatePassword,
  getLogs,
  clearLogs,
  uploadFile,
  getUploadedFiles
} from '../../utils/adminData';
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog
} from '../../utils/blogData';
import {
  getAboutDetails,
  updateAboutDetails
} from '../../utils/aboutData';
import {
  getServicesVideoDetails,
  updateServicesVideoDetails
} from '../../utils/servicesVideoData';
import {
  getFooterDetails,
  updateFooterDetails
} from '../../utils/footerData';
import {
  getLeadershipDetails,
  updateLeadershipDetails
} from '../../utils/leadershipData';
import {
  getNavbarVerticals,
  addNavbarVertical,
  updateNavbarVertical,
  deleteNavbarVertical
} from '../../utils/navbarVerticalData';
import {
  getGlobalPresence,
  addGlobalPresence,
  updateGlobalPresence,
  deleteGlobalPresence
} from '../../utils/globalPresenceData';
import {
  getHomeHero,
  updateHomeHero
} from '../../utils/homeHeroData';
import {
  getSeoMetadata,
  updateSeoMetadata
} from '../../utils/seoData';
import './admin.css';
import {
  LayoutDashboard,
  Home,
  Info,
  Users,
  Layers,
  MapPin,
  Layout,
  BookOpen,
  Mail,
  Activity,
  Shield,
  Globe,
  LogOut,
  Search,
  Bell,
  Cpu,
  Server,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Pencil,
  Trash,
  Eye,
  MailOpen,
  Upload,
  Plus,
  IndianRupee
} from 'lucide-react';

const LOGOS = [
  { img: "/logosss01.png", alt: "Global Gateway Logistics", link: "https://www.ggl.sg/" },
  { img: "/logosss03.png", alt: "OECL Supply Chain", link: "https://www.oecl.sg/" },
  { img: "/logosss02.png", alt: "Global Consol", link: "https://www.globalconsol.com/" },
  { img: "/Haixun_logo.png", alt: "Hai Xun Logistics", link: "https://www.haixun.co/" },
  { img: "/one.png", alt: "ONE Global Logistics", link: "https://www.onegloballogistics.co/" },
  { img: "/logosss04.png", alt: "Moltech Energy", link: "https://www.moltechglobal.com/" },
  { img: "/logosss05.png", alt: "CityGn Distribution", link: "https://www.citygnenergy.com/" },
  { img: "/logo-2.png", alt: "Future Net Logistics", link: "https://futurenetlogistics.com/" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [logs, setLogs] = useState([]);
  const [logos, setLogos] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Modals state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [logoForm, setLogoForm] = useState({
    index: -1,
    alt: '',
    img: '',
    link: ''
  });
  const [blogForm, setBlogForm] = useState({
    id: '',
    title: '',
    date: '',
    month: '',
    author: '',
    tag: '',
    content: '',
    img: '',
  });

  // Home Hero State
  const [heroForm, setHeroForm] = useState({
    subtitle: '',
    title: '',
    video_src: '',
  });
  const [heroMessage, setHeroMessage] = useState('');
  const [heroSuccess, setHeroSuccess] = useState(true);

  // About State
  const [aboutForm, setAboutForm] = useState({
    main_title: '',
    who_we_are_title: '',
    who_we_are_desc: '',
    our_reach_title: '',
    our_reach_desc: '',
    expertise_title: '',
    expertise_desc: '',
    logo_src: '',
    banner_src: '',
  });
  const [aboutMessage, setAboutMessage] = useState('');
  const [aboutSuccess, setAboutSuccess] = useState(true);

  // Services Video State
  const [svsForm, setSvsForm] = useState({
    video_src: '',
    heading: '',
    subheading: '',
  });
  const [svsMessage, setSvsMessage] = useState('');
  const [svsSuccess, setSvsSuccess] = useState(true);

  // Footer State
  const [footerForm, setFooterForm] = useState({
    address: '',
    email: '',
    phone_1: '',
    phone_2: '',
    phone_3: '',
    copyright: '',
    linkedin_url: '',
  });
  const [footerMessage, setFooterMessage] = useState('');
  const [footerSuccess, setFooterSuccess] = useState(true);

  // Leadership State
  const [leadershipForm, setLeadershipForm] = useState({
    block_1_title: '',
    block_1_desc: '',
    block_2_title: '',
    block_2_desc: '',
    block_3_title: '',
    block_3_desc: '',
    founder_img: '',
    founder_name: '',
    founder_title: '',
  });
  const [leadershipMessage, setLeadershipMessage] = useState('');
  const [leadershipSuccess, setLeadershipSuccess] = useState(true);

  // Settings state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(true);

  // SEO state
  const [seoList, setSeoList] = useState([]);
  const [seoForm, setSeoForm] = useState({
    page_key: 'home',
    title: '',
    description: '',
    keywords: '',
    robots: 'index, follow'
  });
  const [seoMessage, setSeoMessage] = useState('');
  const [seoSuccess, setSeoSuccess] = useState(true);

  // Navbar Verticals state
  const [navVerticals, setNavVerticals] = useState([]);
  const [isNavVerticalModalOpen, setIsNavVerticalModalOpen] = useState(false);
  const [navVerticalMessage, setNavVerticalMessage] = useState('');
  const [navVerticalSuccess, setNavVerticalSuccess] = useState(true);
  const [navVerticalForm, setNavVerticalForm] = useState({
    id: '',
    title: '',
    url_path: '',
    is_active: 1,
    image_src: '/shipping.png',
    content: ''
  });

  // Global Presence state
  const [globalPresence, setGlobalPresence] = useState([]);
  const [isPresenceModalOpen, setIsPresenceModalOpen] = useState(false);
  const [presenceMessage, setPresenceMessage] = useState('');
  const [presenceSuccess, setPresenceSuccess] = useState(true);
  const [presenceForm, setPresenceForm] = useState({
    id: '',
    code: '',
    name: '',
    lat: '',
    lng: '',
    priority: 1,
    address: '',
    cities: []
  });
  const [cityForm, setCityForm] = useState({
    index: -1,
    name: '',
    lat: '',
    lng: '',
    address: '',
    contacts: ''
  });

  // Security Check
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/admin/login');
    } else {
      loadData();
    }
  }, [navigate]);

  // Set page meta tags and title for admin panel security and SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "1GE Control Room - Dashboard";

    // Set Robots Meta Tag (Noindex/Nofollow for security)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    let createdRobots = false;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
      createdRobots = true;
    }
    const originalRobots = robotsMeta.content;
    robotsMeta.content = 'noindex, nofollow';

    // Set Description Meta Tag
    let descMeta = document.querySelector('meta[name="description"]');
    let createdDesc = false;
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
      createdDesc = true;
    }
    const originalDesc = descMeta.content;
    descMeta.content = 'Administrative dashboard for the 1Global Console control room.';

    return () => {
      document.title = originalTitle;
      if (createdRobots) {
        if (robotsMeta.parentNode) robotsMeta.parentNode.removeChild(robotsMeta);
      } else {
        robotsMeta.content = originalRobots;
      }
      if (createdDesc) {
        if (descMeta.parentNode) descMeta.parentNode.removeChild(descMeta);
      } else {
        descMeta.content = originalDesc;
      }
    };
  }, []);

  // Auto-resize textareas to read description fully without scroll option
  useEffect(() => {
    const adjustHeights = () => {
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    };
    adjustHeights();
    const timer = setTimeout(adjustHeights, 100);
    return () => clearTimeout(timer);
  }, [activeTab, isBlogModalOpen, aboutForm, svsForm, leadershipForm, blogForm, footerForm, isNavVerticalModalOpen, navVerticalForm, isPresenceModalOpen, presenceForm, heroForm]);

  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const loadData = async () => {
    const blogsData = await getBlogs();
    const inquiriesData = await getInquiries();
    const aboutData = await getAboutDetails();
    const svsData = await getServicesVideoDetails();
    const footerData = await getFooterDetails();
    const logsData = getLogs();
    const uploadedData = getUploadedFiles();
    const presenceData = await getGlobalPresence();
    const heroData = await getHomeHero();
    
    // Load subsidiary logos
    const storedLogos = localStorage.getItem('__1ge_subsidiary_logos');
    if (storedLogos) {
      setLogos(JSON.parse(storedLogos));
    } else {
      localStorage.setItem('__1ge_subsidiary_logos', JSON.stringify(LOGOS));
      setLogos(LOGOS);
    }

    setBlogs(blogsData);
    setInquiries(inquiriesData);
    setLogs(logsData);
    setUploadedFiles(uploadedData);
    setGlobalPresence(presenceData || []);
    const navbarVerticalsData = await getNavbarVerticals();
    setNavVerticals(navbarVerticalsData || []);
    if (aboutData) {
      setAboutForm({
        ...aboutData,
        logo_src: aboutData.logo_src || '/1global1.png',
        banner_src: aboutData.banner_src || '/team1.jpg'
      });
    }
    if (svsData) {
      setSvsForm(svsData);
    }
    if (footerData) {
      setFooterForm(footerData);
    }
    if (heroData) {
      setHeroForm(heroData);
    }
    const leadershipData = await getLeadershipDetails();
    if (leadershipData) {
      setLeadershipForm(leadershipData);
    }
    const seoDataList = await getSeoMetadata();
    setSeoList(seoDataList || []);
    if (seoDataList && seoDataList.length > 0) {
      const homeSeo = seoDataList.find(item => item.page_key === 'home');
      if (homeSeo) {
        setSeoForm(homeSeo);
      } else {
        setSeoForm(seoDataList[0]);
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/admin/login');
  };

  const handleSeoPageChange = (key) => {
    const selectedSeo = seoList.find(item => item.page_key === key) || {
      page_key: key,
      title: '',
      description: '',
      keywords: '',
      robots: 'index, follow'
    };
    setSeoForm(selectedSeo);
    setSeoMessage('');
  };

  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    setSeoMessage('Saving SEO configurations...');
    setSeoSuccess(true);
    try {
      const success = await updateSeoMetadata(seoForm);
      if (success) {
        setSeoMessage('SEO metadata updated successfully!');
        setSeoSuccess(true);
        // Refresh local seo list state
        const updatedList = await getSeoMetadata();
        setSeoList(updatedList || []);
      } else {
        setSeoMessage('Failed to update SEO metadata.');
        setSeoSuccess(false);
      }
    } catch (err) {
      setSeoMessage('An error occurred while saving SEO configurations.');
      setSeoSuccess(false);
    }
  };

  // Inquiry Actions
  const handleViewInquiry = async (inq) => {
    setSelectedInquiry(inq);
    await updateInquiryStatus(inq.id, 'read');
    await loadData(); // Reload updated read status
  };

  const handleToggleInquiryStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'read' ? 'unread' : 'read';
    await updateInquiryStatus(id, nextStatus);
    await loadData();
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await deleteInquiry(id);
      await loadData();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // Blog Actions
  const openAddBlogModal = () => {
    setBlogForm({
      id: '',
      title: '',
      date: new Date().getDate().toString().padStart(2, '0'),
      month: new Date().toLocaleString('en-US', { month: 'short' }),
      author: 'Admin',
      tag: 'General',
      content: '',
      img: '/blog1.png',
    });
    setIsBlogModalOpen(true);
  };

  const openEditBlogModal = (blog) => {
    setBlogForm({
      id: blog.id,
      title: blog.title,
      date: blog.date,
      month: blog.month,
      author: blog.author,
      tag: blog.tag,
      content: blog.content || '',
      img: blog.img || '/blog1.png',
    });
    setIsBlogModalOpen(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      alert('Title and Content are required!');
      return;
    }

    if (blogForm.id) {
      // Edit mode
      await updateBlog(blogForm.id, {
        title: blogForm.title,
        date: blogForm.date,
        month: blogForm.month,
        author: blogForm.author,
        tag: blogForm.tag,
        content: blogForm.content,
        img: blogForm.img || '/blog1.png',
      });
    } else {
      // Add mode
      await addBlog({
        title: blogForm.title,
        date: blogForm.date,
        month: blogForm.month,
        author: blogForm.author,
        tag: blogForm.tag,
        content: blogForm.content,
        img: blogForm.img || '/blog1.png',
      });
    }

    setIsBlogModalOpen(false);
    await loadData();
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlog(id);
      await loadData();
    }
  };

  // Password Update Action
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword.length < 5) {
      setPasswordSuccess(false);
      setPasswordMessage('Password must be at least 5 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordSuccess(false);
      setPasswordMessage('Passwords do not match.');
      return;
    }

    await updatePassword(newPassword);
    setPasswordSuccess(true);
    setPasswordMessage('Password updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
  };

  // About Page Update Action
  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    const success = await updateHomeHero(heroForm);
    if (success) {
      setHeroSuccess(true);
      setHeroMessage('Homepage hero details updated successfully!');
      setTimeout(() => setHeroMessage(''), 3000);
      await loadData();
    } else {
      setHeroSuccess(false);
      setHeroMessage('Failed to update homepage hero details.');
    }
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    const success = await updateAboutDetails(aboutForm);
    if (success) {
      setAboutSuccess(true);
      setAboutMessage('About page details updated successfully!');
      setTimeout(() => setAboutMessage(''), 3000);
      await loadData();
    } else {
      setAboutSuccess(false);
      setAboutMessage('Failed to update About details.');
    }
  };

  // Services Video Section Update Action
  const handleSvsSubmit = async (e) => {
    e.preventDefault();
    const success = await updateServicesVideoDetails(svsForm);
    if (success) {
      setSvsSuccess(true);
      setSvsMessage('Services video section updated successfully!');
      setTimeout(() => setSvsMessage(''), 3000);
      await loadData();
    } else {
      setSvsSuccess(false);
      setSvsMessage('Failed to update Services video section.');
    }
  };

  // Footer Section Update Action
  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    const success = await updateFooterDetails(footerForm);
    if (success) {
      setFooterSuccess(true);
      setFooterMessage('Footer configurations updated successfully!');
      setTimeout(() => setFooterMessage(''), 3000);
      await loadData();
    } else {
      setFooterSuccess(false);
      setFooterMessage('Failed to update Footer details.');
    }
  };

  // Leadership Update Action
  const handleLeadershipSubmit = async (e) => {
    e.preventDefault();
    const success = await updateLeadershipDetails(leadershipForm);
    if (success) {
      setLeadershipSuccess(true);
      setLeadershipMessage('Leadership details updated successfully!');
      setTimeout(() => setLeadershipMessage(''), 3000);
      await loadData();
    } else {
      setLeadershipSuccess(false);
      setLeadershipMessage('Failed to update Leadership details.');
    }
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all system activity logs?')) {
      clearLogs();
      loadData();
    }
  };

  const handleFileUpload = async (e, fieldTarget = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const res = await uploadFile(file);
    setIsUploading(false);

    if (res && res.success) {
      if (fieldTarget) {
        fieldTarget(res.url);
      }
      await loadData();
    }
  };

  // Navbar Verticals Actions
  const openAddNavVerticalModal = () => {
    setNavVerticalForm({
      id: '',
      title: '',
      url_path: '',
      is_active: 1,
      image_src: '/shipping.png',
      content: ''
    });
    setIsNavVerticalModalOpen(true);
  };

  const openEditNavVerticalModal = (item) => {
    setNavVerticalForm({
      id: item.id,
      title: item.title,
      url_path: item.url_path,
      is_active: Number(item.is_active),
      image_src: item.image_src || '/shipping.png',
      content: item.content || ''
    });
    setIsNavVerticalModalOpen(true);
  };

  const handleNavVerticalSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (navVerticalForm.id) {
      success = await updateNavbarVertical(navVerticalForm);
      if (success) {
        setNavVerticalMessage('Navbar vertical updated successfully!');
      }
    } else {
      success = await addNavbarVertical(navVerticalForm);
      if (success) {
        setNavVerticalMessage('Navbar vertical created successfully!');
      }
    }

    if (success) {
      setNavVerticalSuccess(true);
      setIsNavVerticalModalOpen(false);
      setTimeout(() => setNavVerticalMessage(''), 3000);
      await loadData();
    } else {
      setNavVerticalSuccess(false);
      setNavVerticalMessage('Failed to save navbar vertical link.');
    }
  };

  const handleDeleteNavVertical = async (id) => {
    if (window.confirm('Are you sure you want to delete this navbar business vertical link?')) {
      const success = await deleteNavbarVertical(id);
      if (success) {
        setNavVerticalSuccess(true);
        setNavVerticalMessage('Navbar vertical link deleted.');
        setTimeout(() => setNavVerticalMessage(''), 3000);
        await loadData();
      } else {
        setNavVerticalSuccess(false);
        setNavVerticalMessage('Failed to delete navbar vertical link.');
      }
    }
  };

  // Global Presence Actions
  const openAddPresenceModal = () => {
    setPresenceForm({
      id: '',
      code: '',
      name: '',
      lat: '',
      lng: '',
      priority: 1,
      address: '',
      cities: []
    });
    setCityForm({
      index: -1,
      name: '',
      lat: '',
      lng: '',
      address: '',
      contacts: ''
    });
    setIsPresenceModalOpen(true);
  };

  const openEditPresenceModal = (item) => {
    setPresenceForm({
      id: item.id,
      code: item.code,
      name: item.name,
      lat: item.lat,
      lng: item.lng,
      priority: item.priority || 1,
      address: item.address || '',
      cities: Array.isArray(item.cities) ? [...item.cities] : []
    });
    setCityForm({
      index: -1,
      name: '',
      lat: '',
      lng: '',
      address: '',
      contacts: ''
    });
    setIsPresenceModalOpen(true);
  };

  const handlePresenceSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    
    // Validate
    if (!presenceForm.code || !presenceForm.name || !presenceForm.lat || !presenceForm.lng) {
      setPresenceSuccess(false);
      setPresenceMessage('Please fill all required country fields.');
      return;
    }

    if (presenceForm.id) {
      success = await updateGlobalPresence(presenceForm);
      if (success) {
        setPresenceMessage('Global Presence country updated successfully!');
      }
    } else {
      success = await addGlobalPresence(presenceForm);
      if (success) {
        setPresenceMessage('Global Presence country created successfully!');
      }
    }

    if (success) {
      setPresenceSuccess(true);
      setIsPresenceModalOpen(false);
      setTimeout(() => setPresenceMessage(''), 3000);
      await loadData();
    } else {
      setPresenceSuccess(false);
      setPresenceMessage('Failed to save Global Presence details.');
    }
  };

  const handleDeletePresence = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      const success = await deleteGlobalPresence(item.id, item.code, item.name);
      if (success) {
        setPresenceSuccess(true);
        setPresenceMessage('Global Presence location deleted.');
        setTimeout(() => setPresenceMessage(''), 3000);
        await loadData();
      } else {
        setPresenceSuccess(false);
        setPresenceMessage('Failed to delete Global Presence location.');
      }
    }
  };

  // City sub-actions within presence modal
  const handleAddOrEditCity = () => {
    if (!cityForm.name || !cityForm.lat || !cityForm.lng) {
      alert('City Name, Latitude, and Longitude are required.');
      return;
    }

    const contactsArray = cityForm.contacts
      ? cityForm.contacts.split(',').map(c => c.trim()).filter(Boolean)
      : [];

    const newCity = {
      name: cityForm.name,
      lat: Number(cityForm.lat),
      lng: Number(cityForm.lng),
      address: cityForm.address,
      contacts: contactsArray
    };

    let updatedCities = [...presenceForm.cities];
    if (cityForm.index >= 0) {
      updatedCities[cityForm.index] = newCity;
    } else {
      updatedCities.push(newCity);
    }

    setPresenceForm({
      ...presenceForm,
      cities: updatedCities
    });

    // Reset city form
    setCityForm({
      index: -1,
      name: '',
      lat: '',
      lng: '',
      address: '',
      contacts: ''
    });
  };

  const handleEditCity = (index, city) => {
    setCityForm({
      index,
      name: city.name,
      lat: city.lat,
      lng: city.lng,
      address: city.address || '',
      contacts: Array.isArray(city.contacts) ? city.contacts.join(', ') : ''
    });
  };

  const handleDeleteCity = (index) => {
    if (window.confirm('Delete this city location?')) {
      const updatedCities = presenceForm.cities.filter((_, i) => i !== index);
      setPresenceForm({
        ...presenceForm,
        cities: updatedCities
      });
    }
  };

  const openAddLogoModal = () => {
    setLogoForm({
      index: -1,
      alt: '',
      img: '/logosss01.png',
      link: ''
    });
    setIsLogoModalOpen(true);
  };

  const openEditLogoModal = (index, logo) => {
    setLogoForm({
      index,
      alt: logo.alt,
      img: logo.img,
      link: logo.link
    });
    setIsLogoModalOpen(true);
  };

  const handleLogoSubmit = (e) => {
    e.preventDefault();
    if (!logoForm.alt || !logoForm.img || !logoForm.link) {
      alert('All fields are required!');
      return;
    }

    const updatedLogos = [...logos];
    if (logoForm.index >= 0) {
      // Edit
      updatedLogos[logoForm.index] = {
        alt: logoForm.alt,
        img: logoForm.img,
        link: logoForm.link
      };
      addLog('Brand Logo Updated', `Updated brand logo: "${logoForm.alt}".`);
    } else {
      // Add
      updatedLogos.push({
        alt: logoForm.alt,
        img: logoForm.img,
        link: logoForm.link
      });
      addLog('Brand Logo Added', `Added new brand logo: "${logoForm.alt}".`);
    }

    localStorage.setItem('__1ge_subsidiary_logos', JSON.stringify(updatedLogos));
    setLogos(updatedLogos);
    setLogs(getLogs());
    setIsLogoModalOpen(false);
  };

  const handleDeleteLogo = (index, alt) => {
    if (window.confirm(`Are you sure you want to delete the logo for "${alt}"?`)) {
      const updatedLogos = logos.filter((_, idx) => idx !== index);
      localStorage.setItem('__1ge_subsidiary_logos', JSON.stringify(updatedLogos));
      addLog('Brand Logo Deleted', `Deleted brand logo for "${alt}".`);
      setLogos(updatedLogos);
      setLogs(getLogs());
    }
  };

  const getUnreadInquiriesCount = () => {
    return inquiries.filter((inq) => inq.status === 'unread').length;
  };

  return (
    <div className="admin-body">
      {/* Background Orbs for Deep Glow Atmosphere */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>

      <div className="dashboard-wrapper">
        {/* --- SIDEBAR --- */}
        <aside className="admin-sidebar">
          <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--admin-accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(2, 132, 199, 0.3)',
              flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div>
              <h3 style={{ margin: 0 }}>1GE Console</h3>
              <span style={{ display: 'block', marginTop: '2px' }}>Corporate System Admin</span>
            </div>
          </div>

          <ul className="sidebar-menu">
            <li>
              <div
                className={`sidebar-link ${activeTab === 'hero' ? 'active' : ''}`}
                onClick={() => setActiveTab('hero')}
              >
                <Home className="sidebar-icon" />
                <span>Manage Hero</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <Info className="sidebar-icon" />
                <span>Manage About</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'leadership' ? 'active' : ''}`}
                onClick={() => setActiveTab('leadership')}
              >
                <Users className="sidebar-icon" />
                <span>Manage Leadership</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'nav_verticals' ? 'active' : ''}`}
                onClick={() => setActiveTab('nav_verticals')}
              >
                <Layers className="sidebar-icon" />
                <span>Business Verticals</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'global_presence' ? 'active' : ''}`}
                onClick={() => setActiveTab('global_presence')}
              >
                <MapPin className="sidebar-icon" />
                <span>Global Presence</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'footer' ? 'active' : ''}`}
                onClick={() => setActiveTab('footer')}
              >
                <Layout className="sidebar-icon" />
                <span>Manage Footer</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'seo' ? 'active' : ''}`}
                onClick={() => setActiveTab('seo')}
              >
                <Search className="sidebar-icon" />
                <span>SEO Meta Tags</span>
              </div>
            </li>
            <li>
              <div
                className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Shield className="sidebar-icon" />
                <span>Security</span>
              </div>
            </li>
          </ul>

          <div className="sidebar-footer">
            <a
              href="https://1ge.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-link"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                color: 'var(--admin-text-sub)'
              }}
            >
              <Globe className="sidebar-icon" />
              <span>1ge.sg (Live Site)</span>
            </a>
            <button
              onClick={handleLogout}
              className="sidebar-link btn-logout"
              style={{
                width: '100%',
                border: 'none',
                textAlign: 'left',
              }}
            >
              <LogOut className="sidebar-icon" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="admin-content-area" style={{ padding: 0 }}>
          {/* Top Header Navbar */}
          <div className="top-header-navbar">
            <div className="search-box-container">
              <Search className="search-box-icon" size={16} />
              <input type="text" placeholder="Search system resources, activity logs..." />
            </div>
            <div className="header-actions">
              <button className="notification-dot-btn" title="System Notifications">
                <Bell size={18} />
                <span className="notification-dot"></span>
              </button>
            </div>
          </div>

          <div style={{ padding: '40px 50px' }}>
            {/* Header */}
            <div className="content-header">
              <div>
                <h1>
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'hero' && 'Manage Homepage Hero'}
                  {activeTab === 'about' && 'Manage About Page'}
                  {activeTab === 'leadership' && 'Manage Leadership & Founder Profile'}
                  {activeTab === 'nav_verticals' && 'Manage Business Verticals'}
                  {activeTab === 'global_presence' && 'Manage Global Presence'}
                  {activeTab === 'footer' && 'Manage Website Footer'}
                  {activeTab === 'blogs' && 'Manage Corporate Blogs'}
                  {activeTab === 'inquiries' && 'Contact Inquiries'}
                  {activeTab === 'logs' && 'System Activity Logs'}
                  {activeTab === 'settings' && 'System Security Settings'}
                  {activeTab === 'seo' && 'Manage SEO Meta Tags'}
                </h1>
                <p>
                  {activeTab === 'dashboard' && 'Key metrics and status at a glance.'}
                  {activeTab === 'hero' && 'Modify subtitle, title, and background video path of the main home banner.'}
                  {activeTab === 'about' && 'Modify corporate descriptions, values, and credentials.'}
                  {activeTab === 'leadership' && 'Modify details of our corporate leadership values and the founder profile info.'}
                  {activeTab === 'nav_verticals' && 'Configure dynamic link items under Business Verticals in the header navigation bar.'}
                  {activeTab === 'global_presence' && 'Configure office locations, coordinates, and contact details globally.'}
                  {activeTab === 'footer' && 'Modify corporate address, support email, contact numbers, and social media handles.'}
                  {activeTab === 'blogs' && 'Create, edit, or remove news articles.'}
                  {activeTab === 'inquiries' && 'Review and respond to client form entries.'}
                  {activeTab === 'logs' && 'Review administrative actions, update history, and log records.'}
                  {activeTab === 'settings' && 'Modify administration settings and credentials.'}
                  {activeTab === 'seo' && 'Configure search engine optimization tags, keywords, and description settings for site pages.'}
                </p>
              </div>
              <div style={{ color: 'var(--admin-text-sub)', fontSize: '14px', fontWeight: '500' }}>
                Logged in as: <strong style={{ color: 'var(--admin-accent)' }}>Admin</strong>
              </div>
            </div>

          {/* --- TAB CONTENT: OVERVIEW --- */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Metrics Grid Section */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <IndianRupee style={{ color: 'var(--admin-accent)' }} size={22} />
                  </div>
                  <div className="stat-info">
                    <h4>Gross Revenue</h4>
                    <div className="stat-value-container">
                      <h3>₹4.27Cr</h3>
                      <span className="trend-pill up">
                        <TrendingUp size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '2px' }} /> +14.2%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon purple">
                    <Server style={{ color: 'var(--admin-purple)' }} size={22} />
                  </div>
                  <div className="stat-info">
                    <h4>Node Status</h4>
                    <div className="stat-value-container">
                      <h3>16/16 Online</h3>
                      <span className="trend-pill up" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon warning">
                    <Cpu style={{ color: 'var(--admin-warning)' }} size={22} />
                  </div>
                  <div className="stat-info">
                    <h4>System Latency</h4>
                    <div className="stat-value-container">
                      <h3>18 ms</h3>
                      <span className="trend-pill down" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                        <TrendingDown size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '2px' }} /> -4.5%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon sapphire">
                    <Activity style={{ color: 'var(--admin-sapphire)' }} size={22} />
                  </div>
                  <div className="stat-info">
                    <h4>Query Throughput</h4>
                    <div className="stat-value-container">
                      <h3>842 QPS</h3>
                      <span className="trend-pill up">
                        <TrendingUp size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '2px' }} /> +2.8%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics & Visualization Hub */}
              <div className="analytics-split-grid">
                {/* Left: Load Factors Panel */}
                <div className="content-card load-factors-panel" style={{ marginBottom: 0 }}>
                  <div className="card-header-flex" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '10px' }}>
                    <h2>Real-Time Load Factors</h2>
                    <span style={{ fontSize: '12px', color: 'var(--admin-accent)', fontWeight: '600' }}>Network Traffic Load %</span>
                  </div>
                  <div className="load-factors-chart-area">
                    {/* Grid lines */}
                    <div className="chart-grid-line" style={{ top: '25%' }}></div>
                    <div className="chart-grid-line" style={{ top: '50%' }}></div>
                    <div className="chart-grid-line" style={{ top: '75%' }}></div>
                    
                    {[
                      { time: '09:00', val: 42 },
                      { time: '10:00', val: 55, purple: true },
                      { time: '11:00', val: 78 },
                      { time: '12:00', val: 65 },
                      { time: '13:00', val: 50 },
                      { time: '14:00', val: 68, purple: true },
                      { time: '15:00', val: 82 },
                      { time: '16:00', val: 71 },
                      { time: '17:00', val: 59 },
                      { time: '18:00', val: 45 }
                    ].map((item, idx) => (
                      <div className="load-chart-bar-wrapper" key={idx}>
                        <div 
                          className={`load-chart-bar ${item.purple ? 'purple-gradient' : ''}`}
                          style={{ height: `${item.val}%` }}
                        >
                          <div className="load-bar-tooltip">{item.val}%</div>
                        </div>
                        <span className="load-chart-label">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Region Nodes Distribution */}
                <div className="content-card nodes-distribution-panel" style={{ marginBottom: 0 }}>
                  <div className="card-header-flex" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '15px' }}>
                    <h2>Active Regions</h2>
                    <span className="trend-pill neutral">5 regions</span>
                  </div>
                  
                  {[
                    { name: 'SG Headquarters', val: 98, status: 'success', color: 'var(--admin-accent)' },
                    { name: 'India East (Chennai)', val: 85, status: 'success', color: 'var(--admin-sapphire)' },
                    { name: 'Malaysia South', val: 70, status: 'success', color: 'var(--admin-purple)' },
                    { name: 'UAE Central', val: 55, status: 'warning', color: 'var(--admin-accent)' },
                    { name: 'US West Branch', val: 40, status: 'success', color: 'var(--admin-sapphire)' }
                  ].map((region, idx) => (
                    <div className="region-node-row" key={idx}>
                      <div className="region-node-info">
                        <span className="region-node-name">
                          <span className={`region-status-dot ${region.status === 'warning' ? 'warning' : ''}`}></span>
                          {region.name}
                        </span>
                        <span className="region-node-val">{region.val}%</span>
                      </div>
                      <div className="node-progress-bg">
                        <div 
                          className="node-progress-bar" 
                          style={{ 
                            width: `${region.val}%`, 
                            backgroundColor: region.color,
                            boxShadow: `0 0 8px ${region.color}`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction Registry Table */}
              <div className="content-card" style={{ marginTop: '24px' }}>
                <div className="card-header-flex">
                  <h2>System Activity Database</h2>
                  <button className="btn-action" onClick={() => setActiveTab('logs')}>
                    View Database Logs
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client / Entity</th>
                        <th>Operation Log</th>
                        <th>System Timestamp</th>
                        <th>Verification State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.slice(0, 6).map((log) => (
                        <tr key={log.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div className="user-avatar" style={{ width: '28px', height: '28px', fontSize: '11px' }}>
                                {log.action.slice(0, 2).toUpperCase()}
                              </div>
                              <strong style={{ color: 'var(--admin-text-main)' }}>Admin User</strong>
                            </div>
                          </td>
                          <td>
                            <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{log.action}</div>
                            <div style={{ fontSize: '12px', color: 'var(--admin-text-sub)' }}>{log.details}</div>
                          </td>
                          <td style={{ color: 'var(--admin-text-sub)' }}>
                            <Clock size={12} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td>
                            <span className="badge-status completed">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                      {logs.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', color: 'var(--admin-text-sub)' }}>
                            No system operations logged.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* --- TAB CONTENT: HOMEPAGE HERO --- */}
          {activeTab === 'hero' && (
            <div className="content-card" style={{ width: '100%' }}>
              <div className="card-header-flex">
                <h2>Edit Homepage Hero Banner</h2>
              </div>

              {heroMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: heroSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: heroSuccess ? '#10b981' : '#ef4444',
                  marginBottom: '20px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {heroMessage}
                </div>
              )}

              <form onSubmit={handleHeroSubmit}>
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <div className="admin-form-group">
                      <label htmlFor="heroSubtitle">Hero Subtitle</label>
                      <input
                        type="text"
                        id="heroSubtitle"
                        className="admin-input"
                        value={heroForm.subtitle}
                        onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                        placeholder="Enter hero subtitle (e.g. Sustainability Through Innovation)"
                        required
                      />
                    </div>

                    <div className="admin-form-group" style={{ marginTop: '20px' }}>
                      <label htmlFor="heroTitle">Hero Headline/Title</label>
                      <textarea
                        id="heroTitle"
                        className="admin-input"
                        value={heroForm.title}
                        onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                        onInput={handleTextareaInput}
                        placeholder="Enter hero title"
                        rows="3"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ width: '320px', flexShrink: 0 }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                      Background Video Source
                    </label>
                    <div style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--admin-border)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                      background: '#000',
                      height: '180px',
                      position: 'relative'
                    }}>
                      {heroForm.video_src ? (
                        <video
                          src={heroForm.video_src.startsWith('http') || heroForm.video_src.startsWith('/') ? heroForm.video_src : `/${heroForm.video_src}`}
                          muted
                          loop
                          autoPlay
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          key={heroForm.video_src}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--admin-text-sub)' }}>
                          No video selected
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                      <label className="btn-action" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: 0, padding: '10px' }}>
                        <Upload size={14} style={{ marginRight: '6px' }} /> Upload MP4
                        <input
                          type="file"
                          accept="video/mp4"
                          onChange={(e) => handleFileUpload(e, (url) => setHeroForm(prev => ({ ...prev, video_src: url })))}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>

                    <div className="admin-form-group" style={{ marginTop: '15px' }}>
                      <label htmlFor="heroVideoPath" style={{ fontSize: '12px' }}>Video File Path / URL</label>
                      <input
                        type="text"
                        id="heroVideoPath"
                        className="admin-input"
                        value={heroForm.video_src}
                        onChange={(e) => setHeroForm({ ...heroForm, video_src: e.target.value })}
                        placeholder="e.g. video4.mp4 or URL"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions-flex" style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '30px',
                  borderTop: '1px solid var(--admin-border)',
                  paddingTop: '20px',
                  width: '100%'
                }}>
                  <button type="submit" className="admin-btn-primary" disabled={isUploading} style={{ maxWidth: '260px' }}>
                    {isUploading ? 'Uploading...' : 'Save Hero Configurations'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* --- TAB CONTENT: ABOUT PAGE --- */}
          {activeTab === 'about' && (
            <div className="content-card" style={{ width: '100%' }}>
              <div className="card-header-flex">
                <h2>Edit About Us Sections</h2>
              </div>

              {aboutMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: aboutSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: aboutSuccess ? '#10b981' : '#ef4444',
                  marginBottom: '20px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {aboutMessage}
                </div>
              )}

              <form onSubmit={handleAboutSubmit}>
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>General Content</h4>
                    <div className="admin-form-group">
                      <label htmlFor="mainTitle">Main Headline/Title</label>
                      <input
                        type="text"
                        id="mainTitle"
                        className="admin-input"
                        value={aboutForm.main_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, main_title: e.target.value })}
                        placeholder="Enter main title"
                        required
                      />
                    </div>
                  </div>
                  <div style={{ width: '220px', flexShrink: 0 }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                      About Us Banner Image
                    </label>
                    <div style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--admin-border)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                      background: '#fff',
                      height: '110px'
                    }}>
                      <img
                        src={aboutForm.banner_src || "/team1.jpg"}
                        alt="Current about team"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <label className="btn-action" style={{ display: 'inline-flex', justifyContent: 'center', cursor: 'pointer', marginTop: '8px', width: '100%', boxSizing: 'border-box' }}>
                      <i className="bi bi-upload" style={{ marginRight: '6px' }}></i> Upload Banner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setAboutForm(prev => ({ ...prev, banner_src: url })))}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <small style={{ color: 'var(--admin-text-sub)', fontSize: '11px', marginTop: '6px', display: 'block', wordBreak: 'break-all' }}>
                      Source path: <code>{aboutForm.banner_src || "/team1.jpg"}</code>
                    </small>
                  </div>

                  <div style={{ width: '220px', flexShrink: 0 }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                      Company Logo
                    </label>
                    <div style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--admin-border)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                      background: '#090d16',
                      height: '110px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px'
                    }}>
                      <img
                        src={aboutForm.logo_src || "/1global1.png"}
                        alt="Company Logo"
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <label className="btn-action" style={{ display: 'inline-flex', justifyContent: 'center', cursor: 'pointer', marginTop: '8px', width: '100%', boxSizing: 'border-box' }}>
                      <i className="bi bi-upload" style={{ marginRight: '6px' }}></i> Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setAboutForm(prev => ({ ...prev, logo_src: url })))}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <small style={{ color: 'var(--admin-text-sub)', fontSize: '11px', marginTop: '6px', display: 'block', wordBreak: 'break-all' }}>
                      Source path: <code>{aboutForm.logo_src || "/1global1.png"}</code>
                    </small>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>
                      Corporate Reference Links
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
                      <a href="https://1ge.sg" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1.5px solid var(--admin-border)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }} 
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--admin-accent)'; e.currentTarget.style.backgroundColor = '#fff'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}>
                        <i className="bi bi-globe" style={{ fontSize: '20px', color: 'var(--admin-accent)' }}></i>
                        <div>
                          <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase' }}>Website</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--admin-text-main)' }}>https://1ge.sg</span>
                        </div>
                      </a>
                      <a href="https://www.linkedin.com/company/1-global-enterprises/" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1.5px solid var(--admin-border)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }} 
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--admin-accent)'; e.currentTarget.style.backgroundColor = '#fff'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}>
                        <i className="bi bi-linkedin" style={{ fontSize: '20px', color: '#0077b5' }}></i>
                        <div>
                          <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase' }}>LinkedIn</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--admin-text-main)' }}>LinkedIn Profile</span>
                        </div>
                      </a>
                      <a href="mailto:info@1ge.sg" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1.5px solid var(--admin-border)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }} 
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--admin-accent)'; e.currentTarget.style.backgroundColor = '#fff'; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}>
                        <i className="bi bi-envelope" style={{ fontSize: '20px', color: '#ea4335' }}></i>
                        <div>
                          <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase' }}>Support Email</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--admin-text-main)' }}>info@1ge.sg</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '25px 0' }} />

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', margin: 0 }}>
                        Subsidiary Brand Logos
                      </label>
                      <button type="button" className="btn-action btn-view" onClick={openAddLogoModal} style={{ padding: '6px 12px', fontSize: '12px' }}>
                        <i className="bi bi-plus-lg"></i> Add Brand Logo
                      </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                      {logos.map((logo, index) => (
                        <div key={index} style={{
                          padding: '14px',
                          borderRadius: '16px',
                          background: '#ffffff',
                          border: '1.5px solid var(--admin-border)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '10px',
                        }}>
                          <div style={{
                            width: '100%',
                            height: '60px',
                            borderRadius: '10px',
                            background: '#090d16',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px'
                          }}>
                            <img src={logo.img} alt={logo.alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                          <div style={{ textAlign: 'center', width: '100%' }}>
                            <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--admin-text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {logo.alt}
                            </span>
                            <a href={logo.link} target="_blank" rel="noopener noreferrer" style={{
                              fontSize: '11px',
                              color: 'var(--admin-accent)',
                              textDecoration: 'none',
                              fontWeight: '600',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              marginTop: '3px'
                            }}>
                              Visit Link <i className="bi bi-box-arrow-up-right" style={{ fontSize: '9px' }}></i>
                            </a>
                          </div>
                          <div style={{
                            display: 'flex',
                            gap: '6px',
                            width: '100%',
                            borderTop: '1px solid var(--admin-border)',
                            paddingTop: '8px',
                            marginTop: '4px',
                            justifyContent: 'center'
                          }}>
                            <button type="button" className="btn-action" onClick={() => openEditLogoModal(index, logo)} style={{ padding: '4px 8px', fontSize: '11px', flex: 1, justifyContent: 'center' }}>
                              <i className="bi bi-pencil" style={{ fontSize: '11px' }}></i> Edit
                            </button>
                            <button type="button" className="btn-action btn-delete" onClick={() => handleDeleteLogo(index, logo.alt)} style={{ padding: '4px 8px', fontSize: '11px', flex: 1, justifyContent: 'center' }}>
                              <i className="bi bi-trash" style={{ fontSize: '11px' }}></i> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '25px 0' }} />

                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Section 1: Who We Are</h4>
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="whoTitle">Section Title</label>
                    <input
                      type="text"
                      id="whoTitle"
                      className="admin-input"
                      value={aboutForm.who_we_are_title}
                      onChange={(e) => setAboutForm({ ...aboutForm, who_we_are_title: e.target.value })}
                      placeholder="e.g. Who We Are"
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="whoDesc">Section Description</label>
                  <textarea
                    id="whoDesc"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '150px', overflowY: 'hidden', resize: 'vertical' }}
                    value={aboutForm.who_we_are_desc}
                    onChange={(e) => setAboutForm({ ...aboutForm, who_we_are_desc: e.target.value })}
                    onInput={handleTextareaInput}
                    placeholder="Enter description text"
                    required
                  />
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '25px 0' }} />

                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Section 2: Our Reach</h4>
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="reachTitle">Section Title</label>
                    <input
                      type="text"
                      id="reachTitle"
                      className="admin-input"
                      value={aboutForm.our_reach_title}
                      onChange={(e) => setAboutForm({ ...aboutForm, our_reach_title: e.target.value })}
                      placeholder="e.g. Our Reach"
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="reachDesc">Section Description</label>
                  <textarea
                    id="reachDesc"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '150px', overflowY: 'hidden', resize: 'vertical' }}
                    value={aboutForm.our_reach_desc}
                    onChange={(e) => setAboutForm({ ...aboutForm, our_reach_desc: e.target.value })}
                    onInput={handleTextareaInput}
                    placeholder="Enter reach description"
                    required
                  />
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '25px 0' }} />

                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Section 3: Expertise</h4>
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="expTitle">Section Title</label>
                    <input
                      type="text"
                      id="expTitle"
                      className="admin-input"
                      value={aboutForm.expertise_title}
                      onChange={(e) => setAboutForm({ ...aboutForm, expertise_title: e.target.value })}
                      placeholder="e.g. Expertise"
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="expDesc">Section Description</label>
                  <textarea
                    id="expDesc"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '150px', overflowY: 'hidden', resize: 'vertical' }}
                    value={aboutForm.expertise_desc}
                    onChange={(e) => setAboutForm({ ...aboutForm, expertise_desc: e.target.value })}
                    onInput={handleTextareaInput}
                    placeholder="Enter expertise details"
                    required
                  />
                </div>

                <button type="submit" className="admin-btn-primary mt-4" style={{ maxWidth: '200px' }}>
                  Save About Content
                </button>
              </form>
            </div>
          )}

          {/* --- TAB CONTENT: WEBSITE FOOTER --- */}
          {activeTab === 'footer' && (
            <div className="content-card" style={{ width: '100%' }}>
              <div className="card-header-flex">
                <h2>Edit Footer Details & Social Handles</h2>
              </div>

              {footerMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: footerSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: footerSuccess ? '#10b981' : '#ef4444',
                  marginBottom: '20px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {footerMessage}
                </div>
              )}

              <form onSubmit={handleFooterSubmit}>
                <div className="admin-form-group">
                  <label htmlFor="footerAddress">Corporate Address (Newlines supported)</label>
                  <textarea
                    id="footerAddress"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '120px', overflowY: 'hidden', resize: 'vertical' }}
                    value={footerForm.address}
                    onChange={(e) => setFooterForm({ ...footerForm, address: e.target.value })}
                    onInput={handleTextareaInput}
                    placeholder="Enter corporate address..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="footerEmail">Support Email</label>
                    <input
                      type="email"
                      id="footerEmail"
                      className="admin-input"
                      value={footerForm.email}
                      onChange={(e) => setFooterForm({ ...footerForm, email: e.target.value })}
                      placeholder="e.g. info@1ge.sg"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="footerLinkedin">LinkedIn Page URL</label>
                    <input
                      type="url"
                      id="footerLinkedin"
                      className="admin-input"
                      value={footerForm.linkedin_url}
                      onChange={(e) => setFooterForm({ ...footerForm, linkedin_url: e.target.value })}
                      placeholder="e.g. https://www.linkedin.com/..."
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="footerPhone1">Primary Contact Phone</label>
                    <input
                      type="text"
                      id="footerPhone1"
                      className="admin-input"
                      value={footerForm.phone_1}
                      onChange={(e) => setFooterForm({ ...footerForm, phone_1: e.target.value })}
                      placeholder="e.g. +65 69080838"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="footerPhone2">Secondary Phone (Optional)</label>
                    <input
                      type="text"
                      id="footerPhone2"
                      className="admin-input"
                      value={footerForm.phone_2 || ''}
                      onChange={(e) => setFooterForm({ ...footerForm, phone_2: e.target.value })}
                      placeholder="e.g. +65 69080849"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="footerPhone3">Tertiary Phone (Optional)</label>
                    <input
                      type="text"
                      id="footerPhone3"
                      className="admin-input"
                      value={footerForm.phone_3 || ''}
                      onChange={(e) => setFooterForm({ ...footerForm, phone_3: e.target.value })}
                      placeholder="e.g. +65 98177292"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="footerCopyright">Copyright Info Text</label>
                  <input
                    type="text"
                    id="footerCopyright"
                    className="admin-input"
                    value={footerForm.copyright}
                    onChange={(e) => setFooterForm({ ...footerForm, copyright: e.target.value })}
                    placeholder="e.g. © 1 Global Enterprises, All Rights Reserved."
                    required
                  />
                </div>

                <button type="submit" className="admin-btn-primary mt-2" style={{ maxWidth: '240px' }}>
                  Save Footer Config
                </button>
              </form>
            </div>
          )}
          {/* --- TAB CONTENT: WEBSITE LEADERSHIP --- */}
          {activeTab === 'leadership' && (
            <div className="content-card" style={{ width: '100%' }}>
              <div className="card-header-flex">
                <h2>Edit Corporate Leadership & Founder Profile</h2>
              </div>

              {leadershipMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: leadershipSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: leadershipSuccess ? '#10b981' : '#ef4444',
                  marginBottom: '20px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {leadershipMessage}
                </div>
              )}

              <form onSubmit={handleLeadershipSubmit}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Section 1: Our People, Our Strength</h4>
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="leadTitle1">Block Title</label>
                    <input
                      type="text"
                      id="leadTitle1"
                      className="admin-input"
                      value={leadershipForm.block_1_title}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, block_1_title: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="leadDesc1">Block Description</label>
                  <textarea
                    id="leadDesc1"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '160px', overflowY: 'hidden', resize: 'vertical' }}
                    value={leadershipForm.block_1_desc}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, block_1_desc: e.target.value })}
                    onInput={handleTextareaInput}
                    required
                  />
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '20px 0' }} />

                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Section 2: Leadership That Empowers</h4>
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="leadTitle2">Block Title</label>
                    <input
                      type="text"
                      id="leadTitle2"
                      className="admin-input"
                      value={leadershipForm.block_2_title}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, block_2_title: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="leadDesc2">Block Description</label>
                  <textarea
                    id="leadDesc2"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '160px', overflowY: 'hidden', resize: 'vertical' }}
                    value={leadershipForm.block_2_desc}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, block_2_desc: e.target.value })}
                    onInput={handleTextareaInput}
                    required
                  />
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '20px 0' }} />

                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Section 3: Vision for Lasting Impact</h4>
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="leadTitle3">Block Title</label>
                    <input
                      type="text"
                      id="leadTitle3"
                      className="admin-input"
                      value={leadershipForm.block_3_title}
                      onChange={(e) => setLeadershipForm({ ...leadershipForm, block_3_title: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="leadDesc3">Block Description</label>
                  <textarea
                    id="leadDesc3"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '160px', overflowY: 'hidden', resize: 'vertical' }}
                    value={leadershipForm.block_3_desc}
                    onChange={(e) => setLeadershipForm({ ...leadershipForm, block_3_desc: e.target.value })}
                    onInput={handleTextareaInput}
                    required
                  />
                </div>

                <hr style={{ borderColor: 'var(--admin-border)', margin: '20px 0' }} />

                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: 'var(--admin-accent)' }}>Founder Profile Data</h4>
                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <div className="admin-form-group">
                      <label htmlFor="founderName">Founder Name</label>
                      <input
                        type="text"
                        id="founderName"
                        className="admin-input"
                        value={leadershipForm.founder_name}
                        onChange={(e) => setLeadershipForm({ ...leadershipForm, founder_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginTop: '15px' }}>
                      <label htmlFor="founderTitle">Founder Title / Role</label>
                      <input
                        type="text"
                        id="founderTitle"
                        className="admin-input"
                        value={leadershipForm.founder_title}
                        onChange={(e) => setLeadershipForm({ ...leadershipForm, founder_title: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ width: '220px', flexShrink: 0 }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--admin-text-sub)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>
                      Founder Photo
                    </label>
                    <div style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1.5px solid var(--admin-border)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                      background: '#fff',
                      height: '110px'
                    }}>
                      <img
                        src={leadershipForm.founder_img || "/founder.jpg"}
                        alt="Founder Jay Prakash"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <label className="btn-action" style={{ display: 'inline-flex', justifyContent: 'center', cursor: 'pointer', marginTop: '8px', width: '100%', boxSizing: 'border-box' }}>
                      <i className="bi bi-upload" style={{ marginRight: '6px' }}></i> Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setLeadershipForm(prev => ({ ...prev, founder_img: url })))}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <small style={{ color: 'var(--admin-text-sub)', fontSize: '11px', marginTop: '6px', display: 'block', wordBreak: 'break-all' }}>
                      Source path: <code>{leadershipForm.founder_img || "/founder.jpg"}</code>
                    </small>
                  </div>
                </div>

                <button type="submit" className="admin-btn-primary mt-2" style={{ maxWidth: '240px' }}>
                  Save Leadership Details
                </button>
              </form>
            </div>
          )}
          
          


          {/* --- TAB CONTENT: BLOGS --- */}
          {activeTab === 'blogs' && (
            <div className="content-card">
              <div className="card-header-flex">
                <h2>All News & Blog Posts</h2>
                <button className="btn-create" onClick={openAddBlogModal}>
                  <i className="bi bi-plus-lg"></i> Create Blog Post
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Date</th>
                      <th>Category/Tag</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <img
                            src={blog.img || '/blog1.png'}
                            alt="blog-thumb"
                            style={{
                              width: '56px',
                              height: '42px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1.5px solid var(--admin-border)'
                            }}
                          />
                        </td>
                        <td>
                          <div style={{ fontWeight: '700' }}>{blog.title}</div>
                        </td>
                        <td>{blog.author}</td>
                        <td>{blog.date} {blog.month}</td>
                        <td>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(0, 210, 255, 0.1)',
                            color: 'var(--admin-accent)',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>{blog.tag}</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="btn-action-group" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="btn-action btn-view"
                              onClick={() => openEditBlogModal(blog)}
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDeleteBlog(blog.id)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {blogs.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: 'var(--admin-text-sub)' }}>
                          No blogs found. Create one above!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB CONTENT: INQUIRIES --- */}
          {activeTab === 'inquiries' && (
            <div className="content-card">
              <div className="card-header-flex">
                <h2>All Contact Inquiries</h2>
                <div style={{ color: 'var(--admin-text-sub)', fontSize: '14px' }}>
                  {getUnreadInquiriesCount()} Unread Message(s)
                </div>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Received Date</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td><strong>{inq.name}</strong></td>
                        <td>{inq.email}</td>
                        <td>{inq.subject}</td>
                        <td>
                          <span className={`badge-status ${inq.status}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td>{new Date(inq.date).toLocaleString()}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="btn-action-group" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="btn-action btn-view"
                              onClick={() => handleViewInquiry(inq)}
                            >
                              <i className="bi bi-eye"></i> View
                            </button>
                            <button
                              className="btn-action btn-mark"
                              onClick={() => handleToggleInquiryStatus(inq.id, inq.status)}
                            >
                              <i className="bi bi-envelope-open"></i> {inq.status === 'read' ? 'Unread' : 'Read'}
                            </button>
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDeleteInquiry(inq.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', color: 'var(--admin-text-sub)' }}>
                          No contact inquiries available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB CONTENT: SETTINGS --- */}
          {activeTab === 'settings' && (
            <div className="content-card" style={{ width: '100%' }}>
              <div className="card-header-flex">
                <h2>Admin Credentials Settings</h2>
              </div>

              {passwordMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: passwordSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: passwordSuccess ? '#a7f3d0' : '#ff8585',
                  marginBottom: '20px',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  {passwordMessage}
                </div>
              )}

              <form onSubmit={handlePasswordChange}>
                <div className="admin-form-group">
                  <label>Login ID / Username</label>
                  <input
                    type="text"
                    className="admin-input"
                    value="admin"
                    disabled
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  />
                  <small style={{ color: 'var(--admin-text-sub)', marginTop: '4px', display: 'block' }}>
                    Username cannot be changed.
                  </small>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="admin-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="admin-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="admin-btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* --- TAB CONTENT: SEO META TAGS --- */}
          {activeTab === 'seo' && (
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px', alignItems: 'start' }}>
              {/* Left Side: Page Selector List */}
              <div className="content-card" style={{ padding: '15px', margin: 0 }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: 'var(--admin-text-main)', borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px' }}>Select Page</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {[
                    { key: 'home', label: 'Home Page', path: '/' },
                    { key: 'about', label: 'About Us', path: '/about' },
                    { key: 'business_verticals', label: 'Business Verticals', path: '/our-business-verticals' },
                    { key: 'global_presence', label: 'Global Presence', path: '/global-presence' },
                    { key: 'investors', label: 'Investor Relations', path: '/investor-relations' },
                    { key: 'contact', label: 'Contact Us', path: '/contact' },
                    { key: 'shipping', label: 'Shipping Page', path: '/shipping' },
                    { key: 'logistics', label: 'Logistics Page', path: '/logistics' },
                    { key: 'distribution', label: 'Product Distribution', path: '/product-distribution' },
                    { key: 'software', label: 'Software Development', path: '/software' },
                    { key: 'renewable', label: 'Renewable Energy', path: '/renewable' },
                    { key: 'sustainability', label: 'Corporate Sustainability', path: '/corporate-sustainability' },
                    { key: 'supply_chain', label: 'Supply Chain Solutions', path: '/supply-chain-solutions' },
                    { key: 'blog', label: 'Corporate Blog', path: '/blog' }
                  ].map((page) => (
                    <button
                      key={page.key}
                      onClick={() => handleSeoPageChange(page.key)}
                      style={{
                        textAlign: 'left',
                        padding: '10px 15px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: seoForm.page_key === page.key ? 'var(--admin-accent-dim)' : 'transparent',
                        color: seoForm.page_key === page.key ? 'var(--admin-accent)' : 'var(--admin-text-sub)',
                        fontWeight: seoForm.page_key === page.key ? '600' : '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <span>{page.label}</span>
                      <small style={{ fontSize: '11px', opacity: 0.7, color: seoForm.page_key === page.key ? 'var(--admin-accent)' : 'var(--admin-text-sub)' }}>{page.path}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: SEO Editor Form */}
              <div className="content-card" style={{ margin: 0 }}>
                <div className="card-header-flex">
                  <div>
                    <h2>SEO Settings for {seoForm.page_key.toUpperCase().replace('_', ' ')}</h2>
                    <p style={{ color: 'var(--admin-text-sub)', fontSize: '13px', margin: '4px 0 0 0' }}>Configure how this page appears in search engines.</p>
                  </div>
                </div>

                {seoMessage && (
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: seoSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: seoSuccess ? '#a7f3d0' : '#ff8585',
                    marginBottom: '20px',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    {seoMessage}
                  </div>
                )}

                {/* Search Engine Result Snippet Mockup Preview */}
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '8px',
                  padding: '20px',
                  border: '1px solid #334155',
                  marginBottom: '25px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>
                    <Search size={12} /> Google Search Snippet Preview
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
                    {/* Breadcrumbs / URL */}
                    <div style={{ fontSize: '12px', color: '#bdc1c6', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      https://1ge.sg {seoForm.page_key === 'home' ? '' : ` › ${seoForm.page_key}`}
                    </div>
                    {/* Google Blue Link Title */}
                    <h3 style={{
                      fontSize: '20px',
                      lineHeight: '1.3',
                      color: '#8ab4f8',
                      margin: '0 0 6px 0',
                      fontWeight: 'normal',
                      fontFamily: 'Arial, sans-serif',
                      wordWrap: 'break-word',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {seoForm.title || 'Please enter a title...'}
                    </h3>
                    {/* Google Grey Description Text */}
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.4',
                      color: '#bdc1c6',
                      margin: 0,
                      wordWrap: 'break-word',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {seoForm.description || 'Provide an SEO description below to describe the page content in search results.'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSeoSubmit}>
                  {/* Title Field */}
                  <div className="admin-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <label htmlFor="seoTitle">SEO Page Title</label>
                      <span style={{ fontSize: '12px', color: seoForm.title?.length >= 50 && seoForm.title?.length <= 60 ? '#10b981' : '#f59e0b' }}>
                        {seoForm.title?.length || 0} / 60 characters (Recommended: 50-60)
                      </span>
                    </div>
                    <input
                      type="text"
                      id="seoTitle"
                      className="admin-input"
                      value={seoForm.title || ''}
                      onChange={(e) => setSeoForm({ ...seoForm, title: e.target.value })}
                      placeholder="e.g. Services | 1 Global Enterprises"
                      required
                    />
                  </div>

                  {/* Description Field */}
                  <div className="admin-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <label htmlFor="seoDescription">Meta Description</label>
                      <span style={{ fontSize: '12px', color: seoForm.description?.length >= 120 && seoForm.description?.length <= 160 ? '#10b981' : '#f59e0b' }}>
                        {seoForm.description?.length || 0} / 160 characters (Recommended: 120-160)
                      </span>
                    </div>
                    <textarea
                      id="seoDescription"
                      className="admin-input"
                      rows="3"
                      value={seoForm.description || ''}
                      onChange={(e) => setSeoForm({ ...seoForm, description: e.target.value })}
                      placeholder="Provide a compelling summary of the page for search results..."
                      required
                    />
                  </div>

                  {/* Keywords Field */}
                  <div className="admin-form-group">
                    <label htmlFor="seoKeywords">Meta Keywords (Comma separated)</label>
                    <input
                      type="text"
                      id="seoKeywords"
                      className="admin-input"
                      value={seoForm.keywords || ''}
                      onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                      placeholder="e.g. shipping, container logistics, clean energy"
                    />
                  </div>

                  {/* Robots Directives */}
                  <div className="admin-form-group">
                    <label htmlFor="seoRobots">Search Engines Indexing (Robots Tag)</label>
                    <select
                      id="seoRobots"
                      className="admin-input"
                      value={seoForm.robots || 'index, follow'}
                      onChange={(e) => setSeoForm({ ...seoForm, robots: e.target.value })}
                    >
                      <option value="index, follow">index, follow (Allow Indexing & Links Following - Default)</option>
                      <option value="noindex, follow">noindex, follow (Do NOT Index Page, but follow links)</option>
                      <option value="index, nofollow">index, nofollow (Index Page, but do NOT follow links)</option>
                      <option value="noindex, nofollow">noindex, nofollow (Completely Block Indexing & Links)</option>
                    </select>
                  </div>

                  <button type="submit" className="admin-btn-primary" style={{ marginTop: '10px' }}>
                    Save SEO Meta Tags
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* --- TAB CONTENT: SYSTEM LOGS --- */}
          {activeTab === 'logs' && (
            <div className="content-card">
              <div className="card-header-flex">
                <h2>Activity History</h2>
                <button className="btn-action btn-delete" onClick={handleClearLogs}>
                  <i className="bi bi-trash"></i> Clear All Logs
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '220px' }}>Date & Time</th>
                      <th style={{ width: '200px' }}>Action</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td style={{ color: 'var(--admin-text-sub)', whiteSpace: 'nowrap' }}>
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            backgroundColor: log.action.includes('Failure') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(28, 168, 203, 0.1)',
                            color: log.action.includes('Failure') ? 'var(--admin-danger)' : 'var(--admin-accent)',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {log.action}
                          </span>
                        </td>
                        <td>
                          <strong style={{ fontWeight: '500' }}>{log.details}</strong>
                        </td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', color: 'var(--admin-text-sub)' }}>
                          No activity logs found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB CONTENT: NAVBAR VERTICALS --- */}
          {activeTab === 'nav_verticals' && (
            <div className="content-card">
              <div className="card-header-flex">
                <h2>Navbar Business Verticals</h2>
                <button className="btn-create" onClick={openAddNavVerticalModal}>
                  <i className="bi bi-plus-lg"></i> Add Navbar Vertical
                </button>
              </div>

              {navVerticalMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: navVerticalSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: navVerticalSuccess ? '#10b981' : '#ef4444',
                  marginBottom: '20px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {navVerticalMessage}
                </div>
              )}

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>URL Path</th>
                      <th>Banner Image</th>
                      <th style={{ width: '40%' }}>Description Content</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {navVerticals.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div style={{ fontWeight: '700' }}>{item.title}</div>
                        </td>
                        <td>
                          <code>{item.url_path}</code>
                        </td>
                        <td>
                          {item.image_src ? (
                            <img
                              src={item.image_src}
                              alt="Banner"
                              style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                            />
                          ) : (
                            <span style={{ color: 'var(--admin-text-sub)' }}>None</span>
                          )}
                        </td>
                        <td>
                          <div style={{ whiteSpace: 'pre-wrap', maxHeight: 'none', overflow: 'visible', fontSize: '13px', lineHeight: '1.5', color: 'var(--admin-text)' }}>
                            {item.content}
                          </div>
                        </td>
                        <td>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: Number(item.is_active) === 1 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: Number(item.is_active) === 1 ? '#10b981' : '#ef4444',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {Number(item.is_active) === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="btn-action-group" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="btn-action btn-view"
                              onClick={() => openEditNavVerticalModal(item)}
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDeleteNavVertical(item.id)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {navVerticals.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', color: 'var(--admin-text-sub)' }}>
                          No verticals found. Create one above!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- TAB CONTENT: GLOBAL PRESENCE --- */}
          {activeTab === 'global_presence' && (
            <div className="content-card">
              <div className="card-header-flex">
                <h2>Global Presence Locations</h2>
                <button className="btn-create" onClick={openAddPresenceModal}>
                  <i className="bi bi-plus-lg"></i> Add Country Location
                </button>
              </div>

              {presenceMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: presenceSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: presenceSuccess ? '#10b981' : '#ef4444',
                  marginBottom: '20px',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {presenceMessage}
                </div>
              )}

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '8%' }}>Code</th>
                      <th style={{ width: '20%' }}>Country Name</th>
                      <th style={{ width: '25%' }}>Address Details</th>
                      <th style={{ width: '10%' }}>Latitude</th>
                      <th style={{ width: '10%' }}>Longitude</th>
                      <th style={{ width: '8%' }}>Priority</th>
                      <th style={{ width: '12%' }}>Cities Count</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalPresence.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <code>{item.code.toUpperCase()}</code>
                        </td>
                        <td>
                          <div style={{ fontWeight: '700' }}>{item.name}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '12px', color: 'var(--admin-text-sub)', maxHeight: '110px', overflowY: 'auto' }}>
                            {item.address && (
                              <div style={{ marginBottom: '6px', borderBottom: (Array.isArray(item.cities) && item.cities.length > 0) ? '1px dashed rgba(255,255,255,0.1)' : 'none', paddingBottom: '4px' }}>
                                <span style={{ color: '#f59e0b', fontWeight: '600' }}>Country: </span>{item.address}
                              </div>
                            )}
                            {Array.isArray(item.cities) && item.cities.length > 0 ? (
                              item.cities.map((city, idx) => (
                                <div key={idx} style={{ marginBottom: '4px', borderBottom: idx < item.cities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingBottom: '4px' }}>
                                  <strong>{city.name}:</strong> {city.address || 'No Address'}
                                </div>
                              ))
                            ) : (
                              !item.address && <span style={{ fontStyle: 'italic', color: 'var(--admin-text-sub)' }}>No addresses</span>
                            )}
                          </div>
                        </td>
                        <td>{item.lat}</td>
                        <td>{item.lng}</td>
                        <td>{item.priority}</td>
                        <td>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            color: '#3b82f6',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {Array.isArray(item.cities) ? item.cities.length : 0} Cities
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="btn-action-group" style={{ justifyContent: 'flex-end' }}>
                            <button
                              className="btn-action btn-view"
                              onClick={() => openEditPresenceModal(item)}
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button
                              className="btn-action btn-delete"
                              onClick={() => handleDeletePresence(item)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {globalPresence.length === 0 && (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', color: 'var(--admin-text-sub)' }}>
                          No global presence locations found. Create one above!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </div>
        </main>
      </div>

      {/* --- INQUIRY VIEW MODAL --- */}
      {selectedInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>Message Details</h3>
              <button className="modal-close" onClick={() => setSelectedInquiry(null)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--admin-text-sub)' }}>From:</strong>{' '}
                <span>{selectedInquiry.name} ({selectedInquiry.email})</span>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--admin-text-sub)' }}>Subject:</strong>{' '}
                <span>{selectedInquiry.subject}</span>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ color: 'var(--admin-text-sub)' }}>Date:</strong>{' '}
                <span>{new Date(selectedInquiry.date).toLocaleString()}</span>
              </div>
              <hr style={{ borderColor: 'var(--admin-border)', margin: '20px 0' }} />
              <div>
                <strong style={{ color: 'var(--admin-text-sub)', display: 'block', marginBottom: '8px' }}>
                  Message Content:
                </strong>
                <p style={{
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: '#090d16',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid var(--admin-border)'
                }}>
                  {selectedInquiry.message}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-action btn-delete"
                onClick={() => handleDeleteInquiry(selectedInquiry.id)}
              >
                <i className="bi bi-trash"></i> Delete
              </button>
              <button
                className="btn-create"
                onClick={() => setSelectedInquiry(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- BLOG ADD/EDIT MODAL --- */}
      {isBlogModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <form onSubmit={handleBlogSubmit}>
              <div className="modal-header">
                <h3>{blogForm.id ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsBlogModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="admin-form-group">
                  <label htmlFor="blogTitle">Blog Title</label>
                  <input
                    type="text"
                    id="blogTitle"
                    className="admin-input"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="blogImg">Blog Post Image</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      id="blogImg"
                      className="admin-input"
                      value={blogForm.img}
                      onChange={(e) => setBlogForm({ ...blogForm, img: e.target.value })}
                      placeholder="e.g. /blog1.png"
                      required
                      style={{ flex: 1 }}
                    />
                    <label className="btn-action" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <i className="bi bi-upload" style={{ marginRight: '6px' }}></i> Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setBlogForm(prev => ({ ...prev, img: url })))}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  {blogForm.img && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={blogForm.img}
                        alt="Preview"
                        style={{ maxWidth: '120px', maxHeight: '80px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="blogDate">Day Date</label>
                    <input
                      type="text"
                      id="blogDate"
                      className="admin-input"
                      value={blogForm.date}
                      onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                      placeholder="e.g. 15"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="blogMonth">Month (Short)</label>
                    <input
                      type="text"
                      id="blogMonth"
                      className="admin-input"
                      value={blogForm.month}
                      onChange={(e) => setBlogForm({ ...blogForm, month: e.target.value })}
                      placeholder="e.g. Aug"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="blogAuthor">Author</label>
                    <input
                      type="text"
                      id="blogAuthor"
                      className="admin-input"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      placeholder="e.g. Corporate Comms"
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label htmlFor="blogTag">Tag/Category</label>
                    <input
                      type="text"
                      id="blogTag"
                      className="admin-input"
                      value={blogForm.tag}
                      onChange={(e) => setBlogForm({ ...blogForm, tag: e.target.value })}
                      placeholder="e.g. Global Expansion"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="blogContent">Blog Content (Summary/Body)</label>
                  <textarea
                    id="blogContent"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '200px', overflowY: 'hidden', resize: 'vertical' }}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    onInput={handleTextareaInput}
                    placeholder="Enter the blog article body..."
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-action"
                  onClick={() => setIsBlogModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  {blogForm.id ? 'Save Changes' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- BRAND LOGO ADD/EDIT MODAL --- */}
      {isLogoModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '500px' }}>
            <form onSubmit={handleLogoSubmit}>
              <div className="modal-header">
                <h3>{logoForm.index >= 0 ? 'Edit Brand Logo' : 'Add Brand Logo'}</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsLogoModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="admin-form-group">
                  <label htmlFor="logoAlt">Brand Name / Alt Text</label>
                  <input
                    type="text"
                    id="logoAlt"
                    className="admin-input"
                    value={logoForm.alt}
                    onChange={(e) => setLogoForm({ ...logoForm, alt: e.target.value })}
                    placeholder="e.g. Global Gateway Logistics"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="logoImg">Logo Image Path</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      id="logoImg"
                      className="admin-input"
                      value={logoForm.img}
                      onChange={(e) => setLogoForm({ ...logoForm, img: e.target.value })}
                      placeholder="e.g. /logosss01.png"
                      required
                      style={{ flex: 1 }}
                    />
                    <label className="btn-action" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <i className="bi bi-upload" style={{ marginRight: '6px' }}></i> Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setLogoForm(prev => ({ ...prev, img: url })))}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  {logoForm.img && (
                    <div style={{
                      marginTop: '10px',
                      background: '#090d16',
                      padding: '10px',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      <img
                        src={logoForm.img}
                        alt="Preview"
                        style={{ maxHeight: '50px', maxWidth: '120px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                  <small style={{ color: 'var(--admin-text-sub)', marginTop: '4px', display: 'block' }}>
                    Path to logo image relative to public folder (e.g. /logosss01.png)
                  </small>
                </div>

                <div className="admin-form-group">
                  <label htmlFor="logoLink">Website URL</label>
                  <input
                    type="url"
                    id="logoLink"
                    className="admin-input"
                    value={logoForm.link}
                    onChange={(e) => setLogoForm({ ...logoForm, link: e.target.value })}
                    placeholder="https://www.example.com"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-action"
                  onClick={() => setIsLogoModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  {logoForm.index >= 0 ? 'Save Changes' : 'Add Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- NAVBAR VERTICAL ADD/EDIT MODAL --- */}
      {isNavVerticalModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '650px' }}>
            <form onSubmit={handleNavVerticalSubmit}>
              <div className="modal-header">
                <h3>{navVerticalForm.id ? 'Edit Business Vertical' : 'Add Business Vertical'}</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsNavVerticalModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-row">
                  <div className="admin-form-group">
                    <label htmlFor="vertTitle">Vertical Title</label>
                    <input
                      type="text"
                      id="vertTitle"
                      className="admin-input"
                      value={navVerticalForm.title}
                      onChange={(e) => setNavVerticalForm({ ...navVerticalForm, title: e.target.value })}
                      placeholder="e.g. Shipping"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label htmlFor="vertUrl">URL Path / Link</label>
                    <input
                      type="text"
                      id="vertUrl"
                      className="admin-input"
                      value={navVerticalForm.url_path}
                      onChange={(e) => setNavVerticalForm({ ...navVerticalForm, url_path: e.target.value })}
                      placeholder="e.g. /shipping"
                      required
                    />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '15px' }}>
                  <div className="admin-form-group">
                    <label htmlFor="vertActive">Menu Visibility Status</label>
                    <select
                      id="vertActive"
                      className="admin-input"
                      value={navVerticalForm.is_active}
                      onChange={(e) => setNavVerticalForm({ ...navVerticalForm, is_active: Number(e.target.value) })}
                      style={{ background: 'var(--admin-card-bg)', color: 'var(--admin-text)' }}
                    >
                      <option value={1}>Active (Visible in dropdown)</option>
                      <option value={0}>Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="vertImg">Page Banner Image Path</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      id="vertImg"
                      className="admin-input"
                      value={navVerticalForm.image_src || ''}
                      onChange={(e) => setNavVerticalForm({ ...navVerticalForm, image_src: e.target.value })}
                      placeholder="e.g. /shipping.png"
                      required
                      style={{ flex: 1 }}
                    />
                    <label className="btn-action" style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <i className="bi bi-upload" style={{ marginRight: '6px' }}></i> Upload Banner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setNavVerticalForm(prev => ({ ...prev, image_src: url })))}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  {navVerticalForm.image_src && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={navVerticalForm.image_src}
                        alt="Banner Preview"
                        style={{ maxWidth: '120px', maxHeight: '80px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                      />
                    </div>
                  )}
                </div>

                <div className="admin-form-group" style={{ marginTop: '15px' }}>
                  <label htmlFor="vertContent">Page Content Text (Paragraphs, support newlines)</label>
                  <textarea
                    id="vertContent"
                    className="admin-input admin-textarea"
                    style={{ minHeight: '160px', overflowY: 'hidden', resize: 'vertical' }}
                    value={navVerticalForm.content || ''}
                    onChange={(e) => setNavVerticalForm({ ...navVerticalForm, content: e.target.value })}
                    onInput={handleTextareaInput}
                    placeholder="Enter page paragraph content text..."
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-action"
                  onClick={() => setIsNavVerticalModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  {navVerticalForm.id ? 'Save Changes' : 'Create Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* --- GLOBAL PRESENCE COUNTRY MODAL --- */}
      {isPresenceModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '750px', width: '90%' }}>
            <form onSubmit={handlePresenceSubmit}>
              <div className="modal-header">
                <h3>{presenceForm.id ? 'Edit Country Location' : 'Add Country Location'}</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsPresenceModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--admin-text)' }}>Country Name <span style={{ color: 'var(--admin-danger)' }}>*</span></label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Singapore"
                      value={presenceForm.name}
                      onChange={(e) => setPresenceForm({ ...presenceForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--admin-text)' }}>Country Code (ISO-2) <span style={{ color: 'var(--admin-danger)' }}>*</span></label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. sg"
                      value={presenceForm.code}
                      onChange={(e) => setPresenceForm({ ...presenceForm, code: e.target.value.toLowerCase().slice(0, 2) })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--admin-text)' }}>Latitude <span style={{ color: 'var(--admin-danger)' }}>*</span></label>
                    <input
                      type="number"
                      step="any"
                      className="admin-input"
                      placeholder="e.g. 1.3521"
                      value={presenceForm.lat}
                      onChange={(e) => setPresenceForm({ ...presenceForm, lat: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--admin-text)' }}>Longitude <span style={{ color: 'var(--admin-danger)' }}>*</span></label>
                    <input
                      type="number"
                      step="any"
                      className="admin-input"
                      placeholder="e.g. 103.8198"
                      value={presenceForm.lng}
                      onChange={(e) => setPresenceForm({ ...presenceForm, lng: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--admin-text)' }}>Priority (Order)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={presenceForm.priority}
                      onChange={(e) => setPresenceForm({ ...presenceForm, priority: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ color: 'var(--admin-text)' }}>Country Primary Address</label>
                  <textarea
                    rows="2"
                    className="admin-input"
                    placeholder="e.g. Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore - 099447"
                    value={presenceForm.address || ''}
                    onChange={(e) => setPresenceForm({ ...presenceForm, address: e.target.value })}
                    style={{ minHeight: '60px', resize: 'vertical', background: 'var(--admin-card-bg)', color: 'var(--admin-text)' }}
                  />
                </div>

                {/* Cities Management Section */}
                <h4 style={{ margin: '20px 0 10px 0', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px', color: 'var(--admin-text)' }}>
                  Manage Cities / Offices
                </h4>

                {/* Add/Edit City Form */}
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px dashed var(--admin-border)',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <strong style={{ display: 'block', marginBottom: '12px', color: 'var(--admin-text)' }}>
                    {cityForm.index >= 0 ? 'Edit City Office Details' : 'Add New City Office'}
                  </strong>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', color: 'var(--admin-text)' }}>City Name</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Mumbai"
                        value={cityForm.name}
                        onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', color: 'var(--admin-text)' }}>Latitude</label>
                      <input
                        type="number"
                        step="any"
                        className="admin-input"
                        placeholder="e.g. 19.1061"
                        value={cityForm.lat}
                        onChange={(e) => setCityForm({ ...cityForm, lat: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '12px', color: 'var(--admin-text)' }}>Longitude</label>
                      <input
                        type="number"
                        step="any"
                        className="admin-input"
                        placeholder="e.g. 72.8830"
                        value={cityForm.lng}
                        onChange={(e) => setCityForm({ ...cityForm, lng: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--admin-text)' }}>Office Address</label>
                    <textarea
                      rows="2"
                      className="admin-input"
                      placeholder="e.g. Office No. 607, 6th Floor..."
                      value={cityForm.address}
                      onChange={(e) => setCityForm({ ...cityForm, address: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--admin-text)' }}>Contacts (Comma-separated numbers)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. +91 8879756838, 022-35131688"
                      value={cityForm.contacts}
                      onChange={(e) => setCityForm({ ...cityForm, contacts: e.target.value })}
                    />
                  </div>

                  <button
                    type="button"
                    className="theme-btn"
                    onClick={handleAddOrEditCity}
                    style={{ fontSize: '13px', padding: '6px 16px', borderRadius: '4px', border: 'none' }}
                  >
                    <span>{cityForm.index >= 0 ? 'Update City Details' : 'Add City Office'}</span>
                  </button>
                  {cityForm.index >= 0 && (
                    <button
                      type="button"
                      className="btn-action"
                      style={{ fontSize: '13px', padding: '6px 16px', marginLeft: '8px' }}
                      onClick={() => setCityForm({ index: -1, name: '', lat: '', lng: '', address: '', contacts: '' })}
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* Cities List Table */}
                <div className="table-responsive" style={{ border: '1px solid var(--admin-border)', borderRadius: '6px' }}>
                  <table className="admin-table" style={{ margin: 0 }}>
                    <thead>
                      <tr>
                        <th>City Name</th>
                        <th>Coordinates</th>
                        <th>Address</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {presenceForm.cities.map((city, idx) => (
                        <tr key={idx}>
                          <td><strong>{city.name}</strong></td>
                          <td><span style={{ fontSize: '12px', color: 'var(--admin-text-sub)' }}>{city.lat}, {city.lng}</span></td>
                          <td>
                            <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '12px' }}>
                              {city.address || 'None'}
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="btn-action-group" style={{ justifyContent: 'flex-end' }}>
                              <button
                                type="button"
                                className="btn-action btn-view"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                                onClick={() => handleEditCity(idx, city)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                type="button"
                                className="btn-action btn-delete"
                                style={{ padding: '2px 8px', fontSize: '12px' }}
                                onClick={() => handleDeleteCity(idx)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {presenceForm.cities.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', color: 'var(--admin-text-sub)', padding: '12px' }}>
                            No cities added to this country yet. Add at least one above!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-action"
                  onClick={() => setIsPresenceModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-create">
                  {presenceForm.id ? 'Save Country Changes' : 'Create Country'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
