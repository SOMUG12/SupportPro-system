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

      <div className="main-content">
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
    `}</style>
  );
};

export default Dashboard;
