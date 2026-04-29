import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from './assets/rtc-brand-identity-v1.png';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [stats, setStats] = useState({ customers: 0, services: 0, rating: 0, availability: 0 });
  const statsTriggered = useRef(false);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats Trigger with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats-section') && !statsTriggered.current) {
          statsTriggered.current = true;
          animateStats();
        }
      });
    }, { threshold: 0.1 });

    const statsEl = document.querySelector('.stats-section');
    if (statsEl) observer.observe(statsEl);
    return () => observer.disconnect();
  }, []);

  // Stats Counter Animation
  const animateStats = () => {
    const duration = 2000;
    const start = performance.now();
    const targets = { customers: 1000, services: 30, rating: 4.9, availability: 24 };

    const frame = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setStats({
        customers: Math.floor(easeOut * targets.customers),
        services: Math.floor(easeOut * targets.services),
        rating: parseFloat((easeOut * targets.rating).toFixed(1)),
        availability: Math.floor(easeOut * targets.availability)
      });
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  // Carousel auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setCarouselIndex(prev => (prev + 1) % 5);
  const prevTestimonial = () => setCarouselIndex(prev => (prev - 1 + 5) % 5);

  const categories = [
    {
      title: 'Repair & Maintenance', emoji: '🔧',
      list: ['⚡ Electrician Services', '🚿 Plumbing Services', '❄️ AC Installation/Repair/Service', '💧 RO Installation/Repair/Service', '🧊 Fridge & Washing Machine Repair', '🔋 Inverter & Battery Services']
    },
    {
      title: 'Cleaning Services', emoji: '🧹',
      list: ['🏠 Home / Office Cleaning', '🚽 Bathroom Cleaning', '💧 Water Tank Cleaning']
    },
    {
      title: 'Car Services', emoji: '🚗',
      list: ['🚘 Car Pickup & Drop', '🧽 Car Cleaning at Your Location', '👨‍✈️ On-Demand Male & Female Driver']
    },
    {
      title: 'Garden Services', emoji: '🌿',
      list: ['🌾 Lawn Mowing & Maintenance', '🏡 Landscaping', '🪴 Terrace Garden Setup', '⛲ Water Fountain Installation', '🎨 Garden Design & Maintenance']
    },
    {
      title: 'Pet Services', emoji: '🐾',
      list: ['✂️ Dog Grooming', '🛁 Pet Bathing & Cleaning', '🦮 Pet Walking at Your Location', '🏠 Pet Day Care & Feeding', '🎓 Pet Training at Your Location']
    },
    {
      title: 'Support Services', emoji: '🏗️',
      list: ['👷 Daily Labour / Helper', '🛡️ Security Services / Watchman', '👩‍⚕️ Home Nurse']
    }
  ];

  const improvements = [
    { name: 'Painting', icon: '🖌️', desc: 'Interior & Exterior' },
    { name: 'Wall Putty', icon: '🪣', desc: 'Smoothing & Polishing' },
    { name: 'False Ceiling', icon: '🏗️', desc: 'POP & Gypsum' },
    { name: 'Tile Fixing', icon: '🟫', desc: 'Flooring & Wall Tiling' }
  ];

  const reviews = [
    { n: 'Murugan R.', l: 'Madurai', r: 'AC Repair', t: 'Fast, professional, and affordable. Fixed my AC same day!', i: 'MR' },
    { n: 'Priya S.', l: 'Madurai', r: 'Home Cleaning', t: 'My house sparkled! The team was thorough and respectful.', i: 'PS' },
    { n: 'Karthik M.', l: 'Madurai', r: 'Car Wash', t: 'They came to my apartment and cleaned my car perfectly.', i: 'KM' },
    { n: 'Lakshmi D.', l: 'Madurai', r: 'Pet Grooming', t: 'My dog looked amazing. Very gentle and caring staff.', i: 'LD' },
    { n: 'Selvam P.', l: 'Madurai', r: 'Plumbing', t: 'Fixed the leaking pipe within an hour. Great service!', i: 'SP' }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="site-wrapper">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <a href="#hero">
              <img src={logo} alt="Round The Clock Logo" className="logo-img" />
            </a>
          </div>
          <div className="nav-links">
            <a href="#hero">Home</a>
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
            <a href="tel:+919600344322" className="btn-book">📞 Book Now</a>
          </div>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mobile-menu active"
              >
                <a href="#hero" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</a>
                <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Reviews</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                <a href="tel:+919600344322" className="btn-book" style={{marginTop: '10px'}}>📞 Book Now</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="container">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="hero-content"
          >
            <h1>Home Services You Can Trust</h1>
            <p className="hero-subheading">Install • Service • Maintenance</p>
            <div className="hero-btns">
              <a href="#services" className="btn-hero-primary">Explore Services</a>
              <a href="tel:+919600344322" className="btn-hero-outline">📞 +91 96003 44322</a>
            </div>
            <motion.div variants={stagger} className="emoji-row">
              {['⚡','🔧','🧹','🚗','🐕','🌿','💇','🏠'].map((e, i) => (
                <motion.span 
                  key={i} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1), type: 'spring' }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{textAlign:'center', marginBottom:'50px'}}
          >
            <h2>Our Services</h2>
            <p style={{color:'var(--text-light)'}}>Everything your home needs, anytime</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="services-grid"
          >
            {categories.map((cat, i) => (
              <motion.div key={i} variants={fadeUp} className="cat-card">
                <div className="cat-header">
                  <span style={{fontSize:'1.5rem'}}>{cat.emoji}</span>
                  <span style={{fontWeight:'700'}}>{cat.title}</span>
                </div>
                <div className="cat-body">
                  <ul>{cat.list.map((li, k) => <li key={k}>{li}</li>)}</ul>
                </div>
                <div className="cat-footer">
                  <a href="#contact" className="btn-card-book">Book Now →</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Home Improvement */}
      <section className="section" style={{background:'var(--bg-light-blue)'}}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{textAlign:'center', marginBottom:'50px'}}
          >
            <h2>🏠 Home Improvement</h2>
            <p style={{color:'var(--text-light)'}}>Transform your space with expert hands</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="imp-grid"
          >
            {improvements.map((imp, i) => (
              <motion.div key={i} variants={fadeUp} className="imp-card hover-lift">
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="imp-icon"
                >
                  {imp.icon}
                </motion.div>
                <h4 style={{marginBottom:'10px'}}>{imp.name}</h4>
                <p style={{fontSize:'0.9rem', color:'var(--text-light)', marginBottom:'15px'}}>{imp.desc}</p>
                <a href="#contact" className="btn-card-book" style={{fontSize: '0.8rem', padding: '6px 12px', marginTop: 'auto'}}>Book Now</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Monthly Packages */}
      <motion.section 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="packages-banner"
      >
        <div className="container">
          <h2>📅 Monthly / Annual Maintenance Contract</h2>
          <p>Save More on Regular Services — Affordable & Quality</p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="btn-quote"
          >
            Get a Quote →
          </motion.a>
        </div>
      </motion.section>

      {/* How it Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{textAlign:'center', marginBottom:'60px'}}
          >
            <h2>How It Works</h2>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="how-grid"
          >
            <motion.div variants={fadeUp} className="step-card">
              <div className="step-num">1</div>
              <div style={{fontSize:'3rem', marginBottom:'15px'}}>📱</div>
              <h4 style={{marginBottom:'10px'}}>Call or WhatsApp Us</h4>
              <p style={{color:'var(--text-light)', fontSize:'0.9rem'}}>Tell us what service you need and your location.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="step-card">
              <div className="step-num">2</div>
              <div style={{fontSize:'3rem', marginBottom:'15px'}}>📅</div>
              <h4 style={{marginBottom:'10px'}}>Choose a Time Slot</h4>
              <p style={{color:'var(--text-light)', fontSize:'0.9rem'}}>We schedule at your convenience, same day available.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="step-card">
              <div className="step-num">3</div>
              <div style={{fontSize:'3rem', marginBottom:'15px'}}>✅</div>
              <h4 style={{marginBottom:'10px'}}>Expert at Your Door</h4>
              <p style={{color:'var(--text-light)', fontSize:'0.9rem'}}>Vetted professionals arrive and get the job done right.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section stats stats-section">
        <div className="container">
          <div className="stats-grid">
            <div><span className="stat-num">{stats.customers.toLocaleString()}+</span><p>Happy Customers</p></div>
            <div><span className="stat-num">{stats.services}+</span><p>Services Offered</p></div>
            <div><span className="stat-num">{stats.rating}</span><p>Average Rating</p></div>
            <div><span className="stat-num">{stats.availability}/7</span><p>Availability</p></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="section" style={{background:'var(--bg-light-blue)'}}>
        <div className="container">
          <div style={{textAlign:'center', marginBottom:'50px'}}>
            <h2>What Our Customers Say</h2>
          </div>
          <div className="carousel-wrapper">
            <motion.div 
              animate={{ x: `calc(-${carouselIndex * 100}% - ${carouselIndex * 20}px)` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="carousel-track"
            >
              {reviews.map((rev, i) => (
                <div key={i} className="test-card">
                  <div className="avatar-row">
                    <div className="avatar">{rev.i}</div>
                    <div>
                      <div style={{fontWeight:'700'}}>{rev.n}</div>
                      <div style={{fontSize:'0.8rem', color:'var(--text-light)'}}>{rev.l}</div>
                    </div>
                  </div>
                  <div style={{color:'var(--accent-gold)', marginBottom:'10px'}}>★★★★★</div>
                  <div style={{fontWeight:'700', marginBottom:'10px', fontSize:'0.9rem'}}>{rev.r}</div>
                  <p style={{fontStyle:'italic', color:'var(--text-light)'}}>"{rev.t}"</p>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="carousel-controls">
            <button className="btn-ctrl" onClick={prevTestimonial}>←</button>
            <button className="btn-ctrl" onClick={nextTestimonial}>→</button>
          </div>
        </div>
      </section>

      {/* Contact & Booking */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{textAlign:'center', marginBottom:'50px'}}
          >
            <h2>Ready to Book? Get in Touch!</h2>
          </motion.div>
          <div className="contact-centered-wrapper">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="contact-info-centered"
            >
              <div className="contact-item-centered">
                <div className="contact-icon">📍</div>
                <div>
                  <p style={{fontWeight:'700'}}>Address</p>
                  <p style={{color:'var(--text-light)', fontSize:'0.95rem'}}>Plot No.197, 1st Floor, N.M.S. Nagar, Madurai – 625014</p>
                  <a 
                    href="https://www.google.com/maps/dir//Round+The+Clock,+N+M+Sivanathan+Nagar,+Madurai,+Tamil+Nadu+625014/@13.041664,80.1308672,14z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3b00c7e5ea1a61fb:0x4f9a19233821770!2m2!1d78.1573929!2d9.9817731?entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block', 
                      marginTop: '8px', 
                      color: 'var(--primary-blue)', 
                      fontSize: '0.9rem', 
                      fontWeight: '600'
                    }}
                  >
                    🗺️ Get Directions
                  </a>
                </div>
              </div>
              <div className="contact-item-centered">
                <div className="contact-icon">📞</div>
                <div>
                  <p style={{fontWeight:'700'}}>Call Us</p>
                  <a href="tel:+919600344322" style={{color:'var(--primary-blue)', fontWeight:'600'}}>+91 96003 44322</a>
                </div>
              </div>
              <div className="contact-item-centered">
                <div className="contact-icon">💬</div>
                <div>
                  <p style={{fontWeight:'700'}}>WhatsApp</p>
                  <a href="https://wa.me/919600344322" target="_blank" style={{color:'var(--primary-blue)', fontWeight:'600'}}>+91 96003 44322</a>
                </div>
              </div>
              <div className="contact-item-centered">
                <div className="contact-icon">📧</div>
                <div>
                  <p style={{fontWeight:'700'}}>Email</p>
                  <a href="mailto:rtccorporatellp@gmail.com" style={{color:'var(--primary-blue)', fontWeight:'600'}}>rtccorporatellp@gmail.com</a>
                </div>
              </div>
              <div style={{marginTop:'30px', display:'flex', gap:'20px', justifyContent: 'center'}}>
                <a href="#" className="social-link" style={{fontSize:'1.5rem'}}>📘</a>
                <a href="#" className="social-link" style={{fontSize:'1.5rem'}}>📸</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="foot-grid">
            <div>
              <img src={logo} alt="Round The Clock Logo" className="logo-img footer-logo-img" style={{ marginBottom: '15px' }} />
              <p style={{opacity:0.8, fontSize:'0.9rem', marginBottom:'20px'}}>
                Madurai's premium all-in-one home & lifestyle services. Your trusted partner for maintenance, repairs, and care.
              </p>
            </div>
            <div>
              <h4 style={{marginBottom:'20px', color:'var(--accent-gold)'}}>Quick Links</h4>
              <ul style={{fontSize:'0.9rem'}}>
                <li style={{marginBottom:'10px'}}><a href="#hero" style={{color:'white'}}>Home</a></li>
                <li style={{marginBottom:'10px'}}><a href="#services" style={{color:'white'}}>Services</a></li>
                <li style={{marginBottom:'10px'}}><a href="#how-it-works" style={{color:'white'}}>How It Works</a></li>
                <li style={{marginBottom:'10px'}}><a href="#contact" style={{color:'white'}}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{marginBottom:'20px', color:'var(--accent-gold)'}}>Contact Details</h4>
              <p style={{fontSize:'0.85rem', opacity:0.8, marginBottom:'10px'}}>Plot No.197, 1st Floor, N.M.S. Nagar, Madurai – 625014</p>
              <p style={{fontSize:'0.85rem', opacity:0.8, marginBottom:'10px'}}>+91 96003 44322</p>
              <p style={{fontSize:'0.85rem', opacity:0.8}}>rtccorporatellp@gmail.com</p>
            </div>
          </div>
          <div className="foot-bottom">
            © 2025 Round The Clock. All Rights Reserved. | Madurai, Tamil Nadu
          </div>
        </div>
      </footer>
    </div>
  );
}
