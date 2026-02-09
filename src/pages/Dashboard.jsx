import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { tickets, stats, user, logout, searchTerm, setSearchTerm } = useTickets();
  
  const recentTickets = tickets.slice(0, 4);

  const getPriorityColor = (priority) => {
    const colors = {
      'CRITICAL': '#ef4444',
      'HIGH': '#dc2626',
      'MEDIUM': '#d97706',
      'LOW': '#059669'
    };
    return colors[priority] || '#6b7280';
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Only - No top navigation */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span>🎫</span>
            <h2>Support<span>Pro</span></h2>
          </div>
          <p className="user-welcome">Welcome, {user?.name || 'User'}</p>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <span>📊</span>
            Dashboard
          </Link>
          <Link to="/tickets" className="nav-item">
            <span>🎫</span>
            All Tickets
          </Link>
          <button className="nav-item">
            <span>👥</span>
            Customers
          </button>
          <button className="nav-item">
            <span>📈</span>
            Analytics
          </button>
          <button className="nav-item">
            <span>⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header without top navigation */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="welcome-text">Welcome to your support dashboard</p>
          </div>
          
          <div className="header-right">
            <div className="search-bar">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              className="create-ticket-btn"
              onClick={() => navigate('/tickets/new')}
            >
              <span>+</span>
              Create Ticket
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon total">📊</div>
            <div className="stat-content">
              <h3>{stats.total}</h3>
              <p>Total Tickets</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon open">🟡</div>
            <div className="stat-content">
              <h3>{stats.open}</h3>
              <p>Open</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon progress">🔄</div>
            <div className="stat-content">
              <h3>{stats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon closed">✅</div>
            <div className="stat-content">
              <h3>{stats.closed}</h3>
              <p>Closed</p>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="recent-tickets-section">
          <div className="section-header">
            <h2>Recent Tickets</h2>
            <button 
              className="view-all-btn"
              onClick={() => navigate('/tickets')}
            >
              View All →
            </button>
          </div>

          <div className="tickets-grid">
            {recentTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <span className="ticket-id">#{ticket.id}</span>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                  >
                    {ticket.priority}
                  </span>
                </div>
                
                <h3 className="ticket-title">{ticket.title}</h3>
                <p className="ticket-description">
                  {ticket.description.substring(0, 80)}...
                </p>
                
                <div className="ticket-footer">
                  <div className="customer-info">
                    <span className="customer-avatar">
                      {ticket.customer.charAt(0)}
                    </span>
                    <div>
                      <p className="customer-name">{ticket.customer}</p>
                      <p className="ticket-time">{ticket.timeAgo}</p>
                    </div>
                  </div>
                  
                  <div className="ticket-actions">
                    <button 
                      className="action-btn view"
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                      title="View Ticket"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn close"
                      onClick={() => {
                        if (window.confirm('Close this ticket?')) {
                          // Close functionality will be added
                        }
                      }}
                      title="Close Ticket"
                    >
                      ✅
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button 
              className="action-card"
              onClick={() => navigate('/tickets/new')}
            >
              <span className="action-icon">➕</span>
              <span className="action-label">Create Ticket</span>
            </button>
            
            <button className="action-card">
              <span className="action-icon">📧</span>
              <span className="action-label">Send Email</span>
            </button>
            
            <button className="action-card">
              <span className="action-icon">📊</span>
              <span className="action-label">Generate Report</span>
            </button>
            
            <button className="action-card">
              <span className="action-icon">👥</span>
              <span className="action-label">Assign Agent</span>
            </button>
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
      .dashboard-container {
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
        margin-bottom: 1rem;
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

      .user-welcome {
        color: #6b7280;
        font-size: 0.875rem;
        margin: 0;
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

      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .header-left h1 {
        font-size: 2rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
      }

      .welcome-text {
        color: #6b7280;
        margin: 0;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .search-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: white;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        width: 300px;
      }

      .search-bar input {
        border: none;
        outline: none;
        font-size: 1rem;
        width: 100%;
      }

      .create-ticket-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.875rem 1.5rem;
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .create-ticket-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
      }

      /* Stats Cards */
      .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .stat-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
      }

      .stat-card:hover {
        transform: translateY(-2px);
      }

      .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
      }

      .stat-icon.total { background: #dbeafe; color: #1e40af; }
      .stat-icon.open { background: #fef3c7; color: #92400e; }
      .stat-icon.progress { background: #fce7f3; color: #9d174d; }
      .stat-icon.closed { background: #d1fae5; color: #065f46; }

      .stat-content h3 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 0.25rem 0;
        color: #1f2937;
      }

      .stat-content p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
      }

      /* Recent Tickets */
      .recent-tickets-section {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .section-header h2 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0;
      }

      .view-all-btn {
        background: none;
        border: none;
        color: #4f46e5;
        font-weight: 600;
        cursor: pointer;
        font-size: 0.875rem;
      }

      .view-all-btn:hover {
        text-decoration: underline;
      }

      .tickets-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }

      .ticket-card {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s;
        cursor: pointer;
      }

      .ticket-card:hover {
        border-color: #c7d2fe;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .ticket-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .ticket-id {
        font-family: 'Courier New', monospace;
        font-weight: 600;
        color: #6b7280;
      }

      .priority-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        color: white;
      }

      .ticket-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 0.75rem 0;
        line-height: 1.4;
      }

      .ticket-description {
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0 0 1.5rem 0;
      }

      .ticket-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .customer-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .customer-avatar {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #4f46e5, #8b5cf6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 0.875rem;
      }

      .customer-name {
        font-size: 0.875rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 0.25rem 0;
      }

      .ticket-time {
        font-size: 0.75rem;
        color: #6b7280;
        margin: 0;
      }

      .ticket-actions {
        display: flex;
        gap: 0.5rem;
      }

      .action-btn {
        width: 36px;
        height: 36px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
      }

      .action-btn:hover {
        background: #f3f4f6;
      }

      .action-btn.view:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }

      .action-btn.close:hover {
        border-color: #10b981;
        color: #10b981;
      }

      /* Quick Actions */
      .quick-actions {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .quick-actions h2 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0 0 1.5rem 0;
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .action-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 1.5rem;
        background: #f8fafc;
        border: 2px dashed #e5e7eb;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
      }

      .action-card:hover {
        border-color: #4f46e5;
        background: #f1f5f9;
        transform: translateY(-2px);
      }

      .action-icon {
        font-size: 2rem;
      }

      .action-label {
        font-weight: 500;
        color: #374151;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .dashboard-container {
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
        
        .stats-cards {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        .dashboard-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .header-right {
          width: 100%;
        }
        
        .search-bar {
          width: 100%;
        }
        
        .stats-cards {
          grid-template-columns: 1fr;
        }
        
        .tickets-grid {
          grid-template-columns: 1fr;
        }
        
        .actions-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `}</style>
  );
};

export default Dashboard;
