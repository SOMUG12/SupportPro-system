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
      {/* Header */}
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

      {/* Stats */}
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

      {/* Controls */}
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

      {/* Tickets Table */}
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

      /* Header */
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

      /* Stats Bar */
      .stats-bar {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }

      .stat {
        flex: 1;
        min-width: 120px;
        background: white;
        padding: 1rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #4f46e5;
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.875rem;
        color: #6b7280;
      }

      /* Controls */
      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .search-box {
        flex: 1;
        min-width: 300px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: white;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
      }

      .search-box input {
        border: none;
        outline: none;
        font-size: 1rem;
        width: 100%;
      }

      .filters {
        display: flex;
        gap: 1rem;
      }

      .filter-select, .sort-select {
        padding: 0.75rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
        color: #374151;
        font-size: 0.875rem;
        cursor: pointer;
      }

      /* Tickets Table */
      .tickets-table {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .empty-state {
        padding: 4rem 2rem;
        text-align: center;
      }

      .empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      .empty-state h3 {
        font-size: 1.5rem;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
      }

      .empty-state p {
        color: #6b7280;
        margin-bottom: 1.5rem;
      }

      .table-container {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      thead {
        background: #f8fafc;
        border-bottom: 2px solid #e5e7eb;
      }

      th {
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        color: #374151;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .ticket-row {
        border-bottom: 1px solid #e5e7eb;
        cursor: pointer;
        transition: background 0.2s;
      }

      .ticket-row:hover {
        background: #f9fafb;
      }

      .ticket-row td {
        padding: 1rem;
      }

      .ticket-id {
        font-family: 'Courier New', monospace;
        font-weight: 600;
        color: #6b7280;
      }

      .ticket-title-cell strong {
        display: block;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .ticket-description {
        font-size: 0.875rem;
        color: #6b7280;
        margin: 0;
        line-height: 1.4;
      }

      .customer-cell {
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

      .customer-email {
        font-size: 0.75rem;
        color: #6b7280;
        margin: 0;
      }

      .priority-tag, .status-tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        color: white;
      }

      .actions-cell {
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
        transform: translateY(-2px);
      }

      .action-btn.view:hover {
        border-color: #3b82f6;
        color: #3b82f6;
      }

      .action-btn.close:hover {
        border-color: #10b981;
        color: #10b981;
      }

      .action-btn.delete:hover {
        border-color: #ef4444;
        color: #ef4444;
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .controls {
          flex-direction: column;
          align-items: stretch;
        }
        
        .search-box {
          min-width: 100%;
        }
        
        .filters {
          width: 100%;
        }
        
        .filter-select, .sort-select {
          flex: 1;
        }
      }

      @media (max-width: 768px) {
        .ticket-list-container {
          padding: 1rem;
        }
        
        .header {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .stats-bar {
          flex-direction: column;
        }
        
        .stat {
          min-width: 100%;
        }
        
        table {
          display: block;
        }
        
        thead {
          display: none;
        }
        
        .ticket-row {
          display: block;
          margin-bottom: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }
        
        .ticket-row td {
          display: block;
          padding: 0.75rem 1rem;
          border: none;
        }
        
        .ticket-row td:before {
          content: attr(data-label);
          font-weight: 600;
          color: #374151;
          display: block;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
        }
      }
    `}</style>
  );
};

export default TicketList;