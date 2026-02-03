import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';

const TicketList = () => {
  const navigate = useNavigate();
  const { tickets, stats, searchTerm, setSearchTerm, closeTicket, deleteTicket } = useTickets();
  
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    if (filter === 'open') return ticket.status === 'Open';
    if (filter === 'closed') return ticket.status === 'Closed';
    if (filter === 'high') return ticket.priority === 'HIGH' || ticket.priority === 'CRITICAL';
    return true;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'priority') {
      const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      'CRITICAL': '#ef4444',
      'HIGH': '#dc2626',
      'MEDIUM': '#d97706',
      'LOW': '#059669'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open': '#3b82f6',
      'In Progress': '#f59e0b',
      'Closed': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const handleCloseTicket = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to close this ticket?')) {
      closeTicket(id);
    }
  };

  const handleDeleteTicket = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      deleteTicket(id);
    }
  };

  return (
    <div className="ticket-list-container">
      <div className="header">
        <div className="header-left">
          <h1>All Tickets</h1>
          <p className="subtitle">Manage all customer support requests</p>
        </div>
        <div className="header-right">
          <button 
            className="create-btn"
            onClick={() => navigate('/tickets/new')}
          >
            + Create New Ticket
          </button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.open}</span>
          <span className="stat-label">Open</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.closed}</span>
          <span className="stat-label">Closed</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.highPriority}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>

      <div className="controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tickets by title, customer, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select 
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="high">High Priority</option>
          </select>
          
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <div className="tickets-table">
        {sortedTickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No tickets found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="create-btn"
              onClick={() => navigate('/tickets/new')}
            >
              Create Your First Ticket
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTickets.map(ticket => (
                  <tr 
                    key={ticket.id}
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                    className="ticket-row"
                  >
                    <td className="ticket-id">#{ticket.id}</td>
                    <td>
                      <div className="ticket-title-cell">
                        <strong>{ticket.title}</strong>
                        <p className="ticket-description">{ticket.description.substring(0, 60)}...</p>
                      </div>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <span className="customer-avatar">
                          {ticket.customer.charAt(0)}
                        </span>
                        <div>
                          <p className="customer-name">{ticket.customer}</p>
                          <p className="customer-email">{ticket.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span 
                        className="priority-tag"
                        style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="status-tag"
                        style={{ backgroundColor: getStatusColor(ticket.status) }}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.createdAt}</td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn view"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                        title="View"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn close"
                        onClick={(e) => handleCloseTicket(ticket.id, e)}
                        title="Close"
                      >
                        ✅
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={(e) => handleDeleteTicket(ticket.id, e)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Styles />
    </div>
  );
};

const Styles = () => {
  return (
    <style>{`
      .ticket-list-container {
        padding: 2rem;
        max-width: 1400px;
        margin: 0 auto;
        background: #f8fafc;
        min-height: 100vh;
      }

      .header {
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

      .subtitle {
        color: #6b7280;
        margin: 0;
      }

      .create-btn {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: white;
        border: none;
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .create-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
      }
    `}</style>
  );
};

export default TicketList;
