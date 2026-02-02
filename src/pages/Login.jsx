import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginForm.email) errors.email = 'Email is required';
    if (!loginForm.password) errors.password = 'Password is required';
    return errors;
  };

  const validateRegister = () => {
    const errors = {};
    if (!registerForm.name) errors.name = 'Full name is required';
    if (!registerForm.email) errors.email = 'Email is required';
    if (!registerForm.password) errors.password = 'Password is required';
    if (registerForm.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!registerForm.company) errors.company = 'Company name is required';
    if (!registerForm.agreeTerms) errors.agreeTerms = 'You must agree to the terms';
    return errors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Instant login
    setTimeout(() => {
      localStorage.setItem('supportProUser', JSON.stringify({
        name: loginForm.email.split('@')[0] || 'User',
        email: loginForm.email,
        role: 'Support Agent'
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = validateRegister();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Instant registration
    setTimeout(() => {
      localStorage.setItem('supportProUser', JSON.stringify({
        name: registerForm.name,
        email: registerForm.email,
        company: registerForm.company,
        role: 'Support Agent'
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 300);
  };

  const handleDemoLogin = () => {
    setLoginForm({
      email: 'demo@supportpro.com',
      password: 'demo123',
      remember: true
    });
    
    // Auto login with demo credentials
    localStorage.setItem('supportProUser', JSON.stringify({
      name: 'Demo User',
      email: 'demo@supportpro.com',
      role: 'Support Agent'
    }));
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="logo">
            <span>🎫</span>
            <h1>Support<span>Pro</span></h1>
          </div>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
        </div>

        <div className="login-content">
          <h2>{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="subtitle">
            {activeTab === 'login' 
              ? 'Sign in to your support dashboard' 
              : 'Join thousands of support teams using SupportPro'}
          </p>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="agent@company.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={loginForm.remember}
                    onChange={handleLoginChange}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="register-name">Full Name</label>
                  <input
                    type="text"
                    id="register-name"
                    name="name"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    placeholder="John Doe"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Work Email</label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="john.doe@company.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="register-company">Company</label>
                <input
                  type="text"
                  id="register-company"
                  name="company"
                  value={registerForm.company}
                  onChange={handleRegisterChange}
                  placeholder="Your Company Name"
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <span className="error-message">{errors.company}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    placeholder="••••••••"
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="register-confirm">Confirm Password</label>
                  <input
                    type="password"
                    id="register-confirm"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-group terms">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={registerForm.agreeTerms}
                    onChange={handleRegisterChange}
                  />
                  <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                </label>
                {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
              </div>

              <button 
                type="submit" 
                className="register-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Demo Section - Only show on login tab */}
          {activeTab === 'login' && (
            <div className="demo-section">
              <button 
                type="button" 
                className="demo-btn"
                onClick={handleDemoLogin}
              >
                Use Demo Credentials
              </button>
              <div className="demo-credentials">
                <p><strong>Email:</strong> demo@supportpro.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>
          )}

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn google">
              <span className="social-icon">G</span>
              Google
            </button>
            <button type="button" className="social-btn microsoft">
              <span className="social-icon">M</span>
              Microsoft
            </button>
          </div>

          <div className="login-footer">
            {activeTab === 'login' ? (
              <>
                <p className="switch-text">
                  Don't have an account?{' '}
                  <button type="button" className="switch-link" onClick={() => setActiveTab('register')}>
                    Sign up here
                  </button>
                </p>
                <Link to="/" className="back-link">
                  ← Back to Homepage
                </Link>
              </>
            ) : (
              <>
                <p className="switch-text">
                  Already have an account?{' '}
                  <button type="button" className="switch-link" onClick={() => setActiveTab('login')}>
                    Sign in here
                  </button>
                </p>
              </>
            )}
            <p className="security-note">
              🔒 Your data is securely encrypted
            </p>
          </div>
        </div>
      </div>

      <Styles />
    </div>
  );
};

const Styles = () => {
  return (
    <style>{`
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
      }

      .login-box {
        background: white;
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        width: 100%;
        max-width: 450px;
        padding: 2.5rem;
        animation: slideUp 0.5s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .login-header {
        margin-bottom: 2rem;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.5rem;
        color: #4f46e5;
        margin-bottom: 1.5rem;
      }

      .logo span {
        font-size: 2rem;
      }

      .logo h1 {
        margin: 0;
        font-weight: 700;
      }

      .logo span {
        color: #8b5cf6;
      }

      .tabs {
        display: flex;
        gap: 0.5rem;
        border-bottom: 2px solid #e5e7eb;
      }

      .tab {
        padding: 0.75rem 1.5rem;
        background: none;
        border: none;
        font-size: 1rem;
        font-weight: 500;
        color: #6b7280;
        cursor: pointer;
        position: relative;
        transition: all 0.3s;
      }

      .tab.active {
        color: #4f46e5;
      }

      .tab.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: #4f46e5;
      }

      .login-content h2 {
        font-size: 1.75rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
      }

      .subtitle {
        color: #6b7280;
        margin-bottom: 2rem;
      }

      /* Form Styles */
      .login-form, .register-form {
        margin-bottom: 1.5rem;
      }

      .form-group {
        margin-bottom: 1.25rem;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
        font-size: 0.875rem;
      }

      .form-group input {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s;
      }

      .form-group input:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }

      .form-group input.error {
        border-color: #ef4444;
      }

      .error-message {
        display: block;
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }

      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: 0.875rem;
        color: #374151;
      }

      .checkbox input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
        accent-color: #4f46e5;
      }

      .terms .checkbox span {
        font-size: 0.875rem;
        color: #6b7280;
      }

      .terms .checkbox a {
        color: #4f46e5;
        text-decoration: none;
      }

      .terms .checkbox a:hover {
        text-decoration: underline;
      }

      .forgot-link {
        font-size: 0.875rem;
        color: #4f46e5;
        text-decoration: none;
        font-weight: 500;
      }

      .forgot-link:hover {
        text-decoration: underline;
      }

      .login-btn, .register-btn {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 1.5rem;
      }

      .login-btn:hover, .register-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
      }

      .login-btn:disabled, .register-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      /* Demo Section */
      .demo-section {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .demo-btn {
        width: 100%;
        padding: 0.875rem;
        background: white;
        color: #4f46e5;
        border: 2px solid #4f46e5;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 0.75rem;
      }

      .demo-btn:hover {
        background: #4f46e5;
        color: white;
      }

      .demo-credentials {
        font-size: 0.75rem;
        color: #6b7280;
        text-align: center;
      }

      .demo-credentials p {
        margin: 0.25rem 0;
      }

      .demo-credentials strong {
        color: #374151;
      }

      /* Divider */
      .divider {
        display: flex;
        align-items: center;
        margin: 1.5rem 0;
        color: #6b7280;
        font-size: 0.875rem;
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #e5e7eb;
      }

      .divider span {
        padding: 0 1rem;
      }

      /* Social Login */
      .social-login {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .social-btn {
        flex: 1;
        padding: 0.875rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
      }

      .social-btn:hover {
        border-color: #d1d5db;
        background: #f9fafb;
      }

      .social-icon {
        font-weight: bold;
        font-size: 1rem;
      }

      /* Login Footer */
      .login-footer {
        text-align: center;
      }

      .switch-text {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 0.75rem;
      }

      .switch-link {
        background: none;
        border: none;
        color: #4f46e5;
        font-weight: 600;
        cursor: pointer;
        padding: 0;
      }

      .switch-link:hover {
        text-decoration: underline;
      }

      .back-link {
        display: inline-block;
        color: #4f46e5;
        text-decoration: none;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      .back-link:hover {
        text-decoration: underline;
      }

      .security-note {
        font-size: 0.75rem;
        color: #6b7280;
        margin: 0;
      }

      /* Responsive */
      @media (max-width: 480px) {
        .login-box {
          padding: 1.5rem;
        }
        
        .form-row {
          grid-template-columns: 1fr;
          gap: 0;
        }
        
        .social-login {
          flex-direction: column;
        }
        
        .tabs {
          flex-direction: column;
          border-bottom: none;
        }
        
        .tab {
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .tab.active::after {
          display: none;
        }
        
        .tab.active {
          background: #f3f4f6;
        }
      }
    `}</style>
  );
};

export default Login;