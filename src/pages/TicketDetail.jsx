import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tickets, addTicket, updateTicket, user } = useTickets();
  
  const [isCreateMode, setIsCreateMode] = useState(!id || id === 'new');
  const [ticket, setTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    email: '',
    description: '',
    priority: 'MEDIUM',
    category: 'General',
    status: 'Open'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isCreateMode) {
      // Initialize with empty form for new ticket
      setFormData({
        title: '',
        customer: '',
        email: '',
        description: '',
        priority: 'MEDIUM',
        category: 'General',
        status: 'Open'
      });
      setIsLoading(false);
    } else {
      // Load existing ticket
      setIsLoading(true);
      const foundTicket = tickets.find(t => t.id === id);
      if (foundTicket) {
        setTicket(foundTicket);
        setFormData({
          title: foundTicket.title,
          customer: foundTicket.customer,
          email: foundTicket.email,
          description: foundTicket.description,
          priority: foundTicket.priority,
          category: foundTicket.category,
          status: foundTicket.status
        });
      } else {
        navigate('/tickets');
      }
      setIsLoading(false);
    }
  }, [id, tickets, isCreateMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isCreateMode) {
      // Create new ticket
      const newTicket = {
        ...formData,
        agent: user?.name || 'Unassigned',
        createdAt: new Date().toLocaleDateString('en-US'),
        timeAgo: 'Just now'
      };
      
      const createdTicket = addTicket(newTicket);
      setIsLoading(false);
      navigate(`/tickets/${createdTicket.id}`);
    } else {
      // Update existing ticket
      updateTicket(id, formData);
      setIsLoading(false);
      navigate('/tickets');
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'CRITICAL': '#ef4444',
      'HIGH': '#dc2626',
      'MEDIUM': '#d97706',
      'LOW': '#059669'
    };
    return colors[priority] || '#6b7280';
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="ticket-detail-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span>🎫</span>
            <h2>Support<span>Pro</span></h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item" onClick={() => navigate('/dashboard')}>
            <span>📊</span>
            Dashboard
          </button>
          <button className="nav-item active" onClick={() => navigate('/tickets')}>
            <span>🎫</span>
            Tickets
          </button>
          <button className="nav-item">
            <span>👥</span>
            Customers
          </button>
          <button className="nav-item">
            <span>📈</span>
            Analytics
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate('/dashboard')}>
            <span>←</span>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="ticket-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/tickets')}>
              ← Back to Tickets
            </button>
            <h1>{isCreateMode ? 'Create New Ticket' : `Ticket #${ticket?.id}`}</h1>
            {!isCreateMode && (
              <p className="ticket-subtitle">{ticket?.title}</p>
            )}
          </div>
        </div>

        <div className="ticket-form-container">
          <form onSubmit={handleSubmit} className="ticket-form">
            <div className="form-section">
              <h2>Ticket Information</h2>
              
              <div className="form-group">
                <label htmlFor="title">Ticket Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter ticket title"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customer">Customer Name *</label>
                  <input
                    type="text"
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleChange}
                    placeholder="Customer name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Customer Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="customer@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail..."
                  rows="6"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Ticket Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                  <div 
                    className="priority-preview"
                    style={{ backgroundColor: getPriorityColor(formData.priority) }}
                  >
                    {formData.priority}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="General">General</option>
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="Account">Account</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug Report">Bug Report</option>
                  </select>
                </div>
              </div>

              {!isCreateMode && (
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Assigned Agent</label>
                <div className="agent-display">
                  <span className="agent-avatar">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                  <span className="agent-name">{user?.name || 'Unassigned'}</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => navigate('/tickets')}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (isCreateMode ? 'Create Ticket' : 'Save Changes')}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Styles />
    </div>
  );
};

const Styles = () => {
  return (
    <style>{`
      .ticket-detail-container {
        display: flex;
        min-height: 100vh;
        background: #f8fafc;
      }

      /* Sidebar */
      .sidebar {
        width: 250px;
        background: white;
        border-right: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
      }

      .sidebar-header {
        margin-bottom: 2rem;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #4f46e5;
        font-size: 1.25rem;
      }

      .logo span {
        font-size: 1.5rem;
      }

      .logo h2 {
        margin: 0;
        font-weight: 700;
      }

      .logo span {
        color: #8b5cf6;
      }

      .sidebar-nav {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        color: #6b7280;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
      }

      .nav-item:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .nav-item.active {
        background: #4f46e5;
        color: white;
      }

      .sidebar-footer {
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
      }

      .logout-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.875rem;
        background: #f3f4f6;
        color: #374151;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
      }

      .logout-btn:hover {
        background: #e5e7eb;
      }

      /* Main Content */
      .main-content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
      }

      .ticket-header {
        margin-bottom: 2rem;
      }

      .back-btn {
        background: none;
        border: none;
        color: #6b7280;
        font-size: 0.875rem;
        cursor: pointer;
        padding: 0.5rem 0;
        margin-bottom: 0.5rem;
      }

      .back-btn:hover {
        color: #4f46e5;
      }

      .ticket-header h1 {
        font-size: 2rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
      }

      .ticket-subtitle {
        color: #6b7280;
        margin: 0;
      }

      /* Ticket Form */
      .ticket-form-container {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .ticket-form {
        max-width: 800px;
      }

      .form-section {
        margin-bottom: 2.5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #e5e7eb;
      }

      .form-section:last-child {
        border-bottom: none;
      }

      .form-section h2 {
        font-size: 1.25rem;
        color: #1f2937;
        margin: 0 0 1.5rem 0;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
        font-size: 0.875rem;
      }

      .form-group input,
      .form-group select,
      .form-group textarea {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s;
      }

      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      }

      .form-group textarea {
        resize: vertical;
        min-height: 120px;
      }

      .priority-preview {
        display: inline-block;
        margin-top: 0.5rem;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        color: white;
      }

      .agent-display {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem;
        background: #f8fafc;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }

      .agent-avatar {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #4f46e5, #8b5cf6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
      }

      .agent-name {
        font-weight: 500;
        color: #374151;
      }

      /* Form Actions */
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #e5e7eb;
      }

      .btn-cancel {
        padding: 0.875rem 1.5rem;
        background: white;
        color: #374151;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-cancel:hover {
        background: #f3f4f6;
      }

      .btn-submit {
        padding: 0.875rem 1.5rem;
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
      }

      .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      /* Loading */
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        gap: 1rem;
      }

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top-color: #4f46e5;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .loading-container p {
        color: #6b7280;
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .ticket-detail-container {
          flex-direction: column;
        }
        
        .sidebar {
          width: 100%;
          flex-direction: row;
          padding: 1rem;
        }
        
        .sidebar-nav {
          flex-direction: row;
          flex: 0;
        }
        
        .nav-item span:first-child {
          font-size: 1.25rem;
        }
        
        .nav-item span:last-child {
          display: none;
        }
      }

      @media (max-width: 768px) {
        .main-content {
          padding: 1rem;
        }
        
        .ticket-form-container {
          padding: 1.5rem;
        }
        
        .form-row {
          grid-template-columns: 1fr;
          gap: 0;
        }
        
        .form-actions {
          flex-direction: column;
        }
        
        .btn-cancel,
        .btn-submit {
          width: 100%;
        }
      }
    `}</style>
  );
};

export default TicketDetail;