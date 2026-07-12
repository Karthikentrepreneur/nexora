import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { checkLogin, setLoggedIn, isLoggedIn } from '../../utils/adminData';
import { 
  Globe, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Server
} from 'lucide-react';
import './admin.css';

// Canvas particle component for interactive backdrop
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 65;
    const connectionDistance = 110;
    const mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(2, 132, 199, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw lines to mouse
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
};

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [timeString, setTimeString] = useState('');
  
  const navigate = useNavigate();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // Set page meta tags and title for admin panel security and SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "1GE Control Room - Decrypt & Authenticate";

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
    descMeta.content = 'Secure administrative login portal for the 1Global Console.';

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

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatDigit = (num) => String(num).padStart(2, '0');
      
      const year = now.getUTCFullYear();
      const month = formatDigit(now.getUTCMonth() + 1);
      const day = formatDigit(now.getUTCDate());
      const hours = formatDigit(now.getUTCHours());
      const minutes = formatDigit(now.getUTCMinutes());
      const seconds = formatDigit(now.getUTCSeconds());
      
      setTimeString(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoggingIn(true);
    setError('');

    // Simulated delay for premium auth validation feedback
    setTimeout(async () => {
      try {
        const result = await checkLogin(username, password);
        const success = typeof result === 'boolean' ? result : result.success;
        const msg = typeof result === 'object' && result.message ? result.message : 'Authorization failed. Invalid credentials.';

        if (success) {
          setLoggedIn(true);
          navigate('/admin/dashboard');
        } else {
          setError(msg);
          setIsLoggingIn(false);
        }
      } catch (err) {
        setError('Network handshake failed. Please try again.');
        setIsLoggingIn(false);
      }
    }, 1200);
  };

  return (
    <div className="admin-body login-page-root">
      <div className="login-split-container">
        {/* Ambient background particles */}
        <div className="login-bg-blob login-bg-blob-1"></div>
        <div className="login-bg-blob login-bg-blob-2"></div>
        <div className="login-bg-blob login-bg-blob-3"></div>

        {/* Left Side: Immersive Hero Visuals */}
        <div className="login-hero-side">
          <ParticleCanvas />
          
          <div className="login-hero-header">
            <div className="login-hero-logo">
              <Globe size={20} style={{ color: '#ffffff' }} />
            </div>
            <span className="login-hero-brand">1GE Control Room</span>
          </div>

          <div className="login-hero-body">
            <div className="login-hero-badge">
              <i></i> SECURE OPERATIONAL NETWORKS
            </div>
            <h1 className="login-hero-title">
              Manage the Next Era of Enterprise Energy & logistics.
            </h1>
            <p className="login-hero-desc">
              Synchronize renewable grids, software development operations, 
              global shipping tracks, and corporate sustainability metrics in one unified dashboard.
            </p>

            <div className="login-telemetry-box">
              <div className="telemetry-item">
                <label>GLOBAL FIREWALL</label>
                <span className="status-green">
                  <ShieldCheck size={14} /> ACTIVE-PROT
                </span>
              </div>
              <div className="telemetry-item">
                <label>EDGE CLUSTERS</label>
                <span className="status-cyan">
                  <Cpu size={14} /> 24 ONLINE
                </span>
              </div>
              <div className="telemetry-item">
                <label>LOAD AVERAGE</label>
                <span>0.32 / 12ms</span>
              </div>
            </div>
          </div>

          <div className="login-hero-footer">
            <span>TERMINAL CLOCK: {timeString}</span>
            <span>BUILD: v4.12-SECURE</span>
          </div>
        </div>

        {/* Right Side: Sleek Login Card Form */}
        <div className="login-form-side">
          <div className="login-card-v2">
            <div className="login-card-header">
              <h2>Authenticate</h2>
              <p>Sign in to configure the 1Global Console.</p>
            </div>

            {error && (
              <div className="login-error-v2">
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                <input
                  type="text"
                  id="username"
                  className={`login-input ${username ? 'has-value' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoggingIn}
                  required
                  autoComplete="username"
                />
                <label htmlFor="username">Operator Login ID</label>
                <div className="input-icon">
                  <User size={16} />
                </div>
              </div>

              <div className="login-form-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`login-input ${password ? 'has-value' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoggingIn}
                  required
                  autoComplete="current-password"
                />
                <label htmlFor="password">Security Password</label>
                <div className="input-icon">
                  <Lock size={16} />
                </div>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoggingIn}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="login-extra-controls">
                <label className="remember-me-label">
                  <input type="checkbox" className="remember-me-checkbox" />
                  <span>Remember Session</span>
                </label>
                <a href="#forgot" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert("Contact security administrator to reset password."); }}>
                  Forgot Token?
                </a>
              </div>

              <button 
                type="submit" 
                className="login-submit-btn" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <span className="spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Handshaking security keys...</span>
                  </>
                ) : (
                  <>
                    <span>Decrypt & Authenticate</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
