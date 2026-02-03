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
    `}</style>
  );
};

export default TicketDetail;
