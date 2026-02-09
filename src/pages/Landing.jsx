import { Link } from 'react-router-dom';
import '../index.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-brand">
          <div className="logo">
            <span className="logo-icon">🎫</span>
            <h1>Support<span>Pro</span></h1>
          </div>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
          <Link to="/login" className="btn-login">Login</Link>
        </div>
      </nav>

      {/* Hero Section - Updated without ticket preview */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge">🚀 Trusted by 500+ support teams</span>
          </div>
          
          <h1 className="hero-title">
            Enterprise-Grade
            <span className="gradient-text"> Customer Support</span>
            Platform
          </h1>
          
          <p className="hero-subtitle">
            Streamline your support operations with AI-powered ticketing, 
            real-time analytics, and seamless team collaboration.
          </p>
          
          <div className="hero-buttons">
            <Link to="/login" className="btn-primary">
              <span>Start Free Trial</span>
            </Link>
            <Link to="/login" className="btn-secondary">
              <span>Request Demo</span>
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">98.7%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support Coverage</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-value">15min</div>
              <div className="stat-label">Avg Response Time</div>
            </div>
          </div>
        </div>
        
        {/* Visual element without ticket details */}
        <div className="hero-visual">
          <div className="visual-placeholder">
            <div className="visual-icon">💬</div>
            <h3>Support Dashboard</h3>
            <p>See all your tickets in one place</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Powerful Features for Modern Support Teams</h2>
          <p className="section-subtitle">
            Everything you need to deliver exceptional customer support
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon ai">🤖</div>
            <h3>AI-Powered Analytics</h3>
            <p>Smart insights and predictive analytics for ticket resolution</p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Enterprise Security</h3>
            <p>SOC2 compliant with end-to-end encryption</p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>Live notifications and instant ticket updates</p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Seamless agent collaboration and knowledge sharing</p>
            <a href="#" className="feature-link">Learn more →</a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="performance-section">
        <div className="performance-grid">
          <div className="performance-card">
            <div className="performance-icon">🚀</div>
            <div className="performance-number">65%</div>
            <div className="performance-label">Faster Resolution</div>
          </div>
          
          <div className="performance-card">
            <div className="performance-icon">✅</div>
            <div className="performance-number">94%</div>
            <div className="performance-label">SLA Compliance</div>
          </div>
          
          <div className="performance-card">
            <div className="performance-icon">📈</div>
            <div className="performance-number">40%</div>
            <div className="performance-label">Productivity Increase</div>
          </div>
          
          <div className="performance-card">
            <div className="performance-icon">💰</div>
            <div className="performance-number">$2.5M</div>
            <div className="performance-label">Cost Savings</div>
          </div>
        </div>
      </section>

      <Styles />
    </div>
  );
};

const Styles = () => {
  return (
    <style>{`
      :root {
        --primary: #6366f1;
        --primary-dark: #4f46e5;
        --secondary: #8b5cf6;
        --accent: #06b6d4;
        --success: #10b981;
        --warning: #f59e0b;
        --danger: #ef4444;
        --dark: #1f2937;
        --light: #f8fafc;
        --gray: #6b7280;
      }

      .landing-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .landing-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .nav-brand .logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .logo-icon {
        font-size: 2rem;
      }

      .logo h1 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
      }

      .logo span {
        color: #c7d2fe;
      }

      .nav-links {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .nav-links a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
      }

      .nav-links a:hover {
        color: white;
      }

      .btn-login {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.3s;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .btn-login:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* Hero Section - Updated */
      .hero-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        padding: 4rem 2rem;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
      }

      @media (max-width: 1024px) {
        .hero-section {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }

      .hero-badge .badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        margin-bottom: 2rem;
      }

      .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 1.5rem;
      }

      .gradient-text {
        background: linear-gradient(to right, #c7d2fe, #a5b4fc);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: block;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 2.5rem;
        max-width: 600px;
      }

      .hero-buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 3rem;
      }

      .btn-primary {
        background: white;
        color: #4f46e5;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s;
        border: none;
        cursor: pointer;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }

      .btn-secondary {
        background: transparent;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s;
        cursor: pointer;
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
      }

      .hero-stats {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
      }

      .stat-card {
        text-align: center;
        flex: 1;
        min-width: 120px;
      }

      .stat-value {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .stat-divider {
        width: 1px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
      }

      /* Hero Visual - Updated */
      .hero-visual {
        perspective: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .visual-placeholder {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 3rem;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: float 6s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .visual-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      .visual-placeholder h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .visual-placeholder p {
        color: rgba(255, 255, 255, 0.8);
      }

      /* Features Section */
      .features-section {
        padding: 6rem 2rem;
        background: white;
        border-radius: 40px 40px 0 0;
        margin-top: 4rem;
      }

      .section-header {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 4rem;
      }

      .section-header h2 {
        font-size: 2.5rem;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      .section-subtitle {
        font-size: 1.125rem;
        color: #6b7280;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .feature-card {
        background: #f8fafc;
        padding: 2rem;
        border-radius: 16px;
        text-align: center;
        transition: all 0.3s;
        border: 1px solid #e5e7eb;
      }

      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border-color: #c7d2fe;
      }

      .feature-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin: 0 auto 1.5rem;
        color: white;
      }

      .feature-icon.ai {
        background: linear-gradient(135deg, #10b981, #6366f1);
      }

      .feature-card h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      .feature-card p {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .feature-link {
        color: #6366f1;
        text-decoration: none;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      /* Performance Section */
      .performance-section {
        padding: 6rem 2rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
      }

      .performance-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .performance-card {
        text-align: center;
        padding: 2rem;
      }

      .performance-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .performance-number {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .performance-label {
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .hero-title {
          font-size: 2.5rem;
        }
        
        .hero-buttons {
          flex-direction: column;
        }
        
        .features-grid {
          grid-template-columns: 1fr;
        }
        
        .performance-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `}</style>
  );
};

export default Landing;
