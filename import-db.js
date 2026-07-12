import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env manually to avoid extra dependency
function loadEnv() {
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let val = parts.slice(1).join('=').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val;
      }
    });
  }
}

loadEnv();

const dbConfig = {
  host: process.env.DB_HOST || '193.203.184.173',
  user: process.env.DB_USER || 'u546576758_1ge',
  password: process.env.DB_PASS || 'Admin@2026@#',
  database: process.env.DB_NAME || 'u546576758_1ge',
  multipleStatements: true
};

async function main() {
  console.log(`Connecting to database at ${dbConfig.host}...`);
  if (dbConfig.host === 'localhost') {
    console.log("WARNING: DB_HOST is set to 'localhost' in your .env file.");
    console.log("If your Hostinger MySQL database is hosted remotely, you must replace 'localhost' with your Hostinger Remote MySQL Host IP or domain in your .env file.");
  }
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Successfully connected to the database.');

    const sql = `
      -- 1. Create Inquiries Table
      CREATE TABLE IF NOT EXISTS inquiries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NULL,
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'unread',
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 2. Create Blogs Table
      CREATE TABLE IF NOT EXISTS blogs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          img VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          date_day VARCHAR(50) NOT NULL,
          month_short VARCHAR(50) NOT NULL,
          author VARCHAR(255) NOT NULL,
          tag VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 3. Create Admin Users Table
      CREATE TABLE IF NOT EXISTS admin_users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 4. Create About Details Table
      CREATE TABLE IF NOT EXISTS about_details (
          id INT AUTO_INCREMENT PRIMARY KEY,
          main_title VARCHAR(255) NOT NULL,
          who_we_are_title VARCHAR(255) NOT NULL,
          who_we_are_desc TEXT NOT NULL,
          our_reach_title VARCHAR(255) NOT NULL,
          our_reach_desc TEXT NOT NULL,
          expertise_title VARCHAR(255) NOT NULL,
          expertise_desc TEXT NOT NULL,
          logo_src VARCHAR(255) DEFAULT '/1global1.png',
          banner_src VARCHAR(255) DEFAULT '/team1.jpg'
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 5. Create Services Video Section Table
      CREATE TABLE IF NOT EXISTS services_video_section (
          id INT AUTO_INCREMENT PRIMARY KEY,
          video_src VARCHAR(255) NOT NULL,
          heading VARCHAR(255) NOT NULL,
          subheading TEXT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 6. Create Footer Details Table
      CREATE TABLE IF NOT EXISTS footer_details (
          id INT AUTO_INCREMENT PRIMARY KEY,
          address TEXT NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone_1 VARCHAR(50) NOT NULL,
          phone_2 VARCHAR(50) NULL,
          phone_3 VARCHAR(50) NULL,
          copyright TEXT NOT NULL,
          linkedin_url VARCHAR(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 7. Create About Leadership Table
      CREATE TABLE IF NOT EXISTS about_leadership (
          id INT AUTO_INCREMENT PRIMARY KEY,
          block_1_title VARCHAR(255) NOT NULL,
          block_1_desc TEXT NOT NULL,
          block_2_title VARCHAR(255) NOT NULL,
          block_2_desc TEXT NOT NULL,
          block_3_title VARCHAR(255) NOT NULL,
          block_3_desc TEXT NOT NULL,
          founder_img VARCHAR(255) NOT NULL,
          founder_name VARCHAR(255) NOT NULL,
          founder_title VARCHAR(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 8. Create Navbar Business Verticals Table
      CREATE TABLE IF NOT EXISTS navbar_verticals (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          url_path VARCHAR(255) NOT NULL,
          is_active INT DEFAULT 1,
          image_src VARCHAR(255) DEFAULT '/shipping.png',
          content TEXT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 9. Create Global Presence Table
      CREATE TABLE IF NOT EXISTS global_presence (
          id INT AUTO_INCREMENT PRIMARY KEY,
          code VARCHAR(10) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          lat DECIMAL(10, 6) NOT NULL,
          lng DECIMAL(10, 6) NOT NULL,
          priority INT DEFAULT 1,
          address TEXT NULL,
          cities TEXT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 10. Create Home Hero Table
      CREATE TABLE IF NOT EXISTS home_hero (
          id INT AUTO_INCREMENT PRIMARY KEY,
          subtitle VARCHAR(255) NOT NULL,
          title TEXT NOT NULL,
          video_src VARCHAR(255) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

      -- 11. Create SEO Metadata Table
      CREATE TABLE IF NOT EXISTS seo_metadata (
          id INT AUTO_INCREMENT PRIMARY KEY,
          page_key VARCHAR(50) UNIQUE NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          keywords TEXT NULL,
          robots VARCHAR(50) DEFAULT 'index, follow'
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `;

    console.log('Running table creation queries...');
    await connection.query(sql);
    console.log('Tables created successfully.');

    // Seed default admin user if table is empty
    const [users] = await connection.query('SELECT COUNT(*) as count FROM admin_users');
    if (users[0].count === 0) {
      console.log('Seeding default admin user...');
      // bcrypt password_hash of '1global@enterprises'
      const defaultPasswordHash = '$2y$10$n5gdKU6.Q91Lb.yJO5b0jOSxgheZPjPaom0AG7.Y3pbxGiuTXjHoW'; 
      await connection.query('INSERT INTO admin_users (username, password) VALUES (?, ?)', ['admin@1ge.com', defaultPasswordHash]);
    }

    // Seed default blogs if empty
    const [blogs] = await connection.query('SELECT COUNT(*) as count FROM blogs');
    if (blogs[0].count === 0) {
      console.log('Seeding default blogs...');
      await connection.query(
        'INSERT INTO blogs (img, title, date_day, month_short, author, tag, content) VALUES ?',
        [[
          ['/blog1.png', '1GE Expands Operations Across 16+ Countries', '15', 'Aug', 'Corporate Comms', 'Global Expansion', "1 Global Enterprises (1GE) has officially expanded its network footprint, setting up logistics hubs in over 16 countries globally. This strategic expansion is aimed at streamlining supply chain channels and reinforcing 1GE's commitment to reliable cross-border services."],
          ['/blog2.png', 'Driving Sustainable Logistics & Renewable Solutions', '02', 'Sep', 'Sustainability Team', 'Sustainability', "With climate concerns taking center stage, 1GE is incorporating green initiatives across shipping and distribution. Our investment in solar-powered warehouses and electric delivery fleets marks a major step towards reducing carbon footprints and promoting renewable energy solutions."],
          ['/blog3.png', 'Empowering Clients With Technology-Driven Solutions', '22', 'Oct', 'Innovation Desk', 'Technology', "1GE has rolled out its latest custom ERP tracking tool, enabling business clients to track freight in real-time, view sustainability metrics, and optimize dispatch schedules. This tech-first approach aims to minimize delays and enhance operational transparency."]
        ]]
      );
    }

    // Seed default about_details if empty
    const [about] = await connection.query('SELECT COUNT(*) as count FROM about_details');
    if (about[0].count === 0) {
      console.log('Seeding default about details...');
      await connection.query(
        'INSERT INTO about_details (main_title, who_we_are_title, who_we_are_desc, our_reach_title, our_reach_desc, expertise_title, expertise_desc, logo_src, banner_src) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          '1 Global Enterprises',
          'Who We Are',
          'A diversified group with interests in Shipping, Logistics, Distribution, IT, Clean Energy & Trading.',
          'Our Reach',
          'A global workforce of 700+ professionals.',
          'Expertise',
          'Each business unit is led by experts ensuring sustainability, execution & growth.',
          '/1global1.png',
          '/team1.jpg'
        ]
      );
    }

    // Seed default services_video_section if empty
    const [svs] = await connection.query('SELECT COUNT(*) as count FROM services_video_section');
    if (svs[0].count === 0) {
      console.log('Seeding services video section...');
      await connection.query(
        'INSERT INTO services_video_section (video_src, heading, subheading) VALUES (?, ?, ?)',
        ['/video.mp4', 'Business Verticals', 'Integrated solutions powered by people, technology, and purpose']
      );
    }

    // Seed default footer details if empty
    const [footer] = await connection.query('SELECT COUNT(*) as count FROM footer_details');
    if (footer[0].count === 0) {
      console.log('Seeding footer details...');
      await connection.query(
        'INSERT INTO footer_details (address, email, phone_1, phone_2, phone_3, copyright, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          "1 Global Enterprises Pte Ltd\n#03-01, Keppel Distripark,\n511 Kampong Bahru Road,\nSingapore 099447",
          "info@1ge.sg",
          "+65 69080838",
          "+65 69080849",
          "+65 98177292",
          "© 1 Global Enterprises, All Rights Reserved.",
          "https://www.linkedin.com/company/1-global-enterprises/"
        ]
      );
    }

    // Seed default leadership if empty
    const [lead] = await connection.query('SELECT COUNT(*) as count FROM about_leadership');
    if (lead[0].count === 0) {
      console.log('Seeding leadership...');
      await connection.query(
        'INSERT INTO about_leadership (block_1_title, block_1_desc, block_2_title, block_2_desc, block_3_title, block_3_desc, founder_img, founder_name, founder_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          'Our People, Our Strength',
          'At 1 Global Enterprises, our greatest strength is our people. Across every division and region, it is the passion, creativity, and commitment of our employees that turn ideas into real impact. Their dedication drives innovation, builds trust with our partners, and fuels the progress that defines who we are as a company.',
          'Leadership That Empowers',
          'JP, the Managing Director and Founder of 1 Global Enterprises, believes that true leadership begins with empowering others. He attributes the company’s growth and success to the collective effort of a talented and diverse team that shares a common purpose — creating meaningful progress for our people and our customers.',
          'Vision for Lasting Impact',
          'Under JP’s guidance, 1 Global Enterprises has evolved into a group of businesses spanning renewable energy, sustainable supply chain solutions, software innovation, and responsible product distribution. His vision proves that commercial excellence and social responsibility can coexist — empowering communities, advancing cleaner technologies, and creating lasting value for generations to come through collaboration and having a long term vision.',
          '/founder.jpg',
          'Mr. Jay Prakash',
          'Managing Director & Founder'
        ]
      );
    }

    // Seed default navbar verticals if empty or not equal to 3
    const [vert] = await connection.query('SELECT COUNT(*) as count FROM navbar_verticals');
    if (vert[0].count !== 3) {
      console.log('Seeding navbar verticals...');
      await connection.query('TRUNCATE TABLE navbar_verticals');
      await connection.query(
        'INSERT INTO navbar_verticals (title, url_path, is_active, image_src, content) VALUES ?',
        [[
          ['Supply Chain Solutions', '/supply-chain-solutions', 1, '/image1.png', '1 Global Enterprises invests in and builds high-performing logistics and technology businesses that power global trade. Our portfolio spans 16 countries, covering every major segment of the supply chain — including freight forwarding, warehousing, distribution, and digital logistics infrastructure. Through strategic ownership and operational expertise, we support our group companies in driving innovation, operational excellence, and sustainable growth. Our focus is on strengthening global connectivity and creating long-term value across the supply chain landscape.'],
          ['Renewable Energy', '/renewable-energy', 1, '/renew.jpeg', 'We drive sustainable growth through strategic investments across the renewable energy value chain — from feedstock origination to processing and technology enablement. Our portfolio supports the global shift toward renewable fuels and SAF by securing and optimising advanced feedstock supply. Operating across multiple regions, we build ethical, traceable sourcing networks and pre-treatment infrastructure, strengthening transparency, efficiency, and environmental integrity while accelerating the transition to cleaner energy.'],
          ['Product Distribution', '/product-distribution', 1, '/distribution.png', 'Through strategic partnerships, our group company Citygn manages the distribution of ENOC lubricants and other industrial products across key territories. Our focus is on building efficient, customer-centric networks supported by strong logistics capabilities and reliable after-sales service. By combining local market expertise with the strength of global brands, we ensure consistent quality, reach, and value delivery across every channel.']
        ]]
      );
    }

    // Seed default global presence if empty
    const [presence] = await connection.query('SELECT COUNT(*) as count FROM global_presence');
    if (presence[0].count === 0) {
      console.log('Seeding global presence locations...');
      const defaultCountries = [
        ['sg', 'Singapore (Headquarters)', 1.271214, 103.828454, 0, 'Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore - 099447', '[{"name":"Singapore \u2013 Headquarters","lat":1.3521,"lng":103.8198,"address":"Blk 511 Kampong Bahru Road, #03-01 Keppel Distripark, Singapore - 099447","contacts":["+65 6908 0838"]}]'],
        ['in', 'India', 19.1061, 72.883, 1, 'Town Center - 2, Office No. 607, 6th Floor, Marol, Andheri Kurla Road, Andheri East, Mumbai - 400059.', '[{"name":"Mumbai","lat":19.1061,"lng":72.883,"address":"Town Center - 2, Office No. 607, 6th Floor, Marol, Andheri Kurla Road, Andheri East, Mumbai - 400059.","contacts":["+91 8879756838","022-35131688","35113475","35082586"]},{"name":"Delhi","lat":28.5894,"lng":77.0318,"address":"Plot No. 15, 1st Floor, Block C, Pocket 8, Sector 17, Dwarka, New Delhi 110075","contacts":["+91 11 41088871"]},{"name":"Chennai Warehouse","lat":13.0231,"lng":79.9632,"address":"Survey No. 209/6A(Part) 209/6B(Part), Mannur & Valarpuram Village, Perambakkam Road, Sriperumbudur Taluk, Kanchipuram District - 602105","contacts":["+91 9994355523"]},{"name":"Chennai","lat":13.0068,"lng":80.2048,"address":"Roma Building, Door No. 10, 3rd Floor, G.S.T. Road, Alandur, Chennai - 600 016","contacts":["044 4689 4646"]},{"name":"Kerala","lat":9.9323,"lng":76.2996,"address":"CC 59/801A Elizabeth Memorial Building, Thevara Ferry Jn, Cochin 682013, Kerala","contacts":["+91 484 4019192","+91 484 4019193"]},{"name":"Hyderabad","lat":17.4425,"lng":78.4735,"address":"H.No. 1-8-450/1/A-7 Indian Airlines Colony, Opp Police Lines, Begumpet Hyderabad - 500016, Telangana","contacts":["040-49559704"]},{"name":"Bangalore","lat":13.0185,"lng":77.6419,"address":"3C-964 IIIrd Cross Street, HRBR Layout 1st Block, Kalyan Nagar Banaswadi, Bengaluru - 560043","contacts":["+91 9841676259"]},{"name":"Kolkata","lat":22.5745,"lng":88.4353,"address":"Imagine Techpark, Unit No. 10, 19th Floor, Block DN 6, Sector V Salt Lake City, Kolkata, West Bengal, India - 700091","contacts":["+91 33 4814 9162","+91 33 4814 9163"]}]'],
        ['my', 'Malaysia', 1.4842, 103.7629, 1, 'Unit 20-03A, Level 20 Menara Zurich, 15 Jalan Dato Abdullah Tahir, 80300 Johor Bahru', '[{"name":"Pasir Gudang","lat":1.4842,"lng":103.7629,"address":"Unit 20-03A, Level 20 Menara Zurich, 15 Jalan Dato Abdullah Tahir, 80300 Johor Bahru","contacts":["+603-3319 2778","+603-3319 2774","+603-3319 2775","+603-3319 2779"]},{"name":"Port Klang","lat":2.9982,"lng":101.3831,"address":"MTBBT 2, 3A-5, Jalan Batu Nilam 16, The Landmark (Behind AEON Mall), Bandar Bukit Tinggi 2, 41200 Klang, Selangor","contacts":["+603-3319 2778","+603-3319 2774","+603-3319 2775"]}]'],
        ['ae', 'United Arab Emirates', 25.2048, 55.2708, 1, 'Office # 509, Al Nazar Plaza, Oud Metha, Dubai, U.A.E', '[{"name":"Dubai","lat":25.2048,"lng":55.2708,"address":"Office # 509, Al Nazar Plaza, Oud Metha, Dubai, U.A.E","contacts":["+971 4 343 3388"]},{"name":"Jebel Ali","lat":24.9857,"lng":55.1436,"address":"Warehouse # ZG06, Near Roundabout 13, North Zone, P.O. Box 30821, Jebel Ali, Dubai, U.A.E","contacts":["+971 4 881 9787"]},{"name":"Abu Dhabi","lat":24.4539,"lng":54.3773,"address":"P.O. Box 30500, Office 3-1, Unit 101, 1st Floor, Al Jaber Jewellery Building, Al Khalidiya, Abu Dhabi, U.A.E","contacts":["+971 50 433 7214"]}]'],
        ['qa', 'Qatar', 25.276987, 51.520008, 1, 'Office No. 48, 2nd Floor, Al Matar Centre, Old Airport Road, Doha', '[{"name":"Doha","lat":25.276987,"lng":51.520008,"address":"Office No. 48, 2nd Floor, Al Matar Centre, Old Airport Road, Doha","contacts":["0974 33622555"]}]'],
        ['cn', 'China', 22.54262, 114.11696, 1, '13C02, Block A, Zhaoxin Huijin Plaza, 3085 Shennan East Road, Luohu, Shenzhen', '[{"name":"Shenzhen","lat":22.54262,"lng":114.11696,"address":"13C02, Block A, Zhaoxin Huijin Plaza, 3085 Shennan East Road, Luohu, Shenzhen","contacts":["+86 755 8222 2447"]}]'],
        ['sa', 'Saudi Arabia', 26.4207, 50.0888, 1, 'Building No. 2817, Secondary No. 9403, King Faisal Road, Al Tubebayshi Dist, Dammam, KSA 32233', '[{"name":"Dammam","lat":26.4207,"lng":50.0888,"address":"Building No. 2817, Secondary No. 9403, King Faisal Road, Al Tubebayshi Dist, Dammam, KSA 32233","contacts":["+966 13 343 0003"]},{"name":"Riyadh","lat":24.7136,"lng":46.6753,"address":"Room No. T18, Rail Business Centre, Bldg No. 3823, Omar Aimukhtar St, Thulaim, Riyadh 11332","contacts":["+966 11 295 0020"]},{"name":"Jeddah","lat":21.4858,"lng":39.1925,"address":"Al-Madinah Al-Munawarah Road, Al Sharafeyah, Jeddah 4542-22234, Kingdom of Saudi Arabia","contacts":["+966 12 578 0874"]}]'],
        ['id', 'Indonesia', -6.2088, 106.8456, 1, '408, Lina Building, JL. HR Rasuna Said Kav B7, Jakarta', '[{"name":"Jakarta","lat":-6.2088,"lng":106.8456,"address":"408, Lina Building, JL. HR Rasuna Said Kav B7, Jakarta","contacts":["+62 21 529 20292","+62 21 522 4887"]},{"name":"Surabaya","lat":-7.2575,"lng":112.7521,"address":"Japfa Indoland Center, Japfa Tower 1, Lantai 4/401-A JL Jend, Basuki Rahmat 129-137, Surabaya 60271","contacts":["+62 21 529 20292","+62 21 522 4887"]}]'],
        ['lk', 'Sri Lanka', 6.9271, 79.8612, 1, 'Ceylinco House, 9th Floor, No. 69, Janadhipathi Mawatha, Colombo 01, Sri Lanka', '[{"name":"Colombo","lat":6.9271,"lng":79.8612,"address":"Ceylinco House, 9th Floor, No. 69, Janadhipathi Mawatha, Colombo 01, Sri Lanka","contacts":["+94 114 477 499","+94 114 477 494","+94 114 477 498"]}]'],
        ['th', 'Thailand', 13.72957, 100.53095, 1, '109 CCT Building, 3rd Floor, Room 3, Surawong Road, Suriyawongse, Bangrak, Bangkok 10500', '[{"name":"Bangkok","lat":13.72957,"lng":100.53095,"address":"109 CCT Building, 3rd Floor, Room 3, Surawong Road, Suriyawongse, Bangrak, Bangkok 10500","contacts":["+662-634-3240","+662-634-3942"]}]'],
        ['pk', 'Pakistan', 24.8608, 67.0097, 1, 'Suite No. 301, 3rd Floor, Fortune Center, Shahrah-e-Faisal, Block 6, PECHS, Karachi, Pakistan', '[{"name":"Karachi","lat":24.8608,"lng":67.0097,"address":"Suite No. 301, 3rd Floor, Fortune Center, Shahrah-e-Faisal, Block 6, PECHS, Karachi, Pakistan","contacts":["+92-300-8282511","+92-21-34302281-5"]},{"name":"Lahore","lat":31.5204,"lng":74.3487,"address":"Office #301, 3rd Floor, Gulberg Arcade Main Market, Gulberg 2, Lahore, Pakistan","contacts":["+92 42-35782306","+92 42-35782307","+92 42-35782308"]}]'],
        ['us', 'United States', 41.8622, -87.7209, 1, '939 W. North Avenue, Suite 750, Chicago, IL 60642', '[{"name":"Chicago","lat":41.8622,"lng":-87.7209,"address":"939 W. North Avenue, Suite 750, Chicago, IL 60642","contacts":["+1 847 254 7320"]},{"name":"New York","lat":40.533,"lng":-74.3481,"address":"New Jersey Branch, 33 Wood Avenue South Suite 600, Iselin, NJ 08830","contacts":["+1 732 456 6780"]},{"name":"Los Angeles","lat":34.0522,"lng":-118.2437,"address":"2250 South Central Avenue, Compton, CA 90220","contacts":["+1 310 928 3903"]}]'],
        ['gb', 'United Kingdom', 51.5074, -0.1278, 1, '167-169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom', '[{"name":"London","lat":51.5074,"lng":-0.1278,"address":"167-169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom","contacts":["+44 (0) 203 393 9508"]}]'],
        ['au', 'Australia', -37.7064, 144.8503, 1, 'Suite 5, 7-9 Mallet Road, Tullamarine, Victoria, 3043', '[{"name":"Melbourne","lat":-37.7064,"lng":144.8503,"address":"Suite 5, 7-9 Mallet Road, Tullamarine, Victoria, 3043","contacts":["+61 432 254 969","+61 3 8820 5157"]}]']
      ];
      await connection.query(
        'INSERT INTO global_presence (code, name, lat, lng, priority, address, cities) VALUES ?',
        [defaultCountries]
      );
    }

    // Seed default home_hero if empty
    const [hero] = await connection.query('SELECT COUNT(*) as count FROM home_hero');
    if (hero[0].count === 0) {
      console.log('Seeding default home hero...');
      await connection.query(
        'INSERT INTO home_hero (subtitle, title, video_src) VALUES (?, ?, ?)',
        [
          'Sustainability Through Innovation',
          '“Strategic investments for a sustainable, connected future.”',
          '/video4.mp4'
        ]
      );
    }

    // Seed default SEO metadata if empty
    const [seoMetaCount] = await connection.query('SELECT COUNT(*) as count FROM seo_metadata');
    if (seoMetaCount[0].count === 0) {
      console.log('Seeding default SEO metadata...');
      const defaultSeo = [
        ['home', '1 Global Enterprises Pte Ltd - Sustainable Logistics & Energy', 'Providing strategic investments for a sustainable, connected future in logistics, renewable energy, and software development.', 'logistics, shipping, renewable energy, software development, sustainability', 'index, follow'],
        ['about', 'About Us | 1 Global Enterprises Pte Ltd', 'Learn about our reach, our business model, expertise, and leadership in global operations.', 'about us, corporate overview, logistics leadership', 'index, follow'],
        ['business_verticals', 'Our Business Verticals | 1 Global Enterprises Pte Ltd', 'Discover our core business operations including logistics, shipping, renewable energy, and software development.', 'business verticals, corporate portfolio, logistics services', 'index, follow'],
        ['global_presence', 'Global Presence | 1 Global Enterprises Pte Ltd', 'View our global offices, coordinates, and contact details across Singapore, India, and internationally.', 'global presence, offices, contact info, shipping coordinates', 'index, follow'],
        ['investors', 'Investor Relations | 1 Global Enterprises Pte Ltd', 'Corporate transparency, financial performance updates, governance, and annual reports for investors.', 'investor relations, corporate governance, financial reports', 'index, follow'],
        ['contact', 'Contact Us | 1 Global Enterprises Pte Ltd', 'Get in touch with our team for partnerships, ERP integrations, shipping, and custom solutions.', 'contact us, support email, office phone number', 'index, follow'],
        ['shipping', 'Shipping Services | 1 Global Enterprises Pte Ltd', 'Professional marine shipping and cargo transport solutions connecting global markets.', 'marine shipping, cargo transport, freight forwarding', 'index, follow'],
        ['logistics', 'Logistics Solutions | 1 Global Enterprises Pte Ltd', 'End-to-end supply chain logistics, warehousing, and tracking solutions for global enterprises.', 'logistics solutions, warehousing, cargo tracking', 'index, follow'],
        ['distribution', 'Product Distribution | 1 Global Enterprises Pte Ltd', 'Reliable commercial distribution services connecting suppliers with dynamic global markets.', 'product distribution, supplier network, commercial shipping', 'index, follow'],
        ['software', 'Software Development | 1 Global Enterprises Pte Ltd', 'Custom software, ERP, and API integration services for modern enterprise operations.', 'software development, ERP integration, API systems', 'index, follow'],
        ['renewable', 'Renewable Energy | 1 Global Enterprises Pte Ltd', 'Pioneering clean energy investments, solar power grids, and sustainable utility projects.', 'renewable energy, solar power, clean energy grids', 'index, follow'],
        ['sustainability', 'Corporate Sustainability | 1 Global Enterprises Pte Ltd', 'Our environmental, social, and governance (ESG) commitment to building a greener future.', 'corporate sustainability, ESG metrics, green energy goals', 'index, follow'],
        ['supply_chain', 'Supply Chain Solutions | 1 Global Enterprises Pte Ltd', 'Optimized and resilient supply chain consulting and implementation for international businesses.', 'supply chain solutions, business resilience, logistics consulting', 'index, follow'],
        ['blog', 'Corporate Blog & News | 1 Global Enterprises Pte Ltd', 'Stay updated with the latest corporate news, shipping trends, and sustainability insights.', 'corporate blog, industry news, shipping updates', 'index, follow']
      ];
      await connection.query(
        'INSERT INTO seo_metadata (page_key, title, description, keywords, robots) VALUES ?',
        [defaultSeo]
      );
    }

    console.log('Database import completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('Failed to import database:', error);
  }
}

main();
