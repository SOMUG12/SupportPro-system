import { createContext, useState, useContext, useEffect } from 'react';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem('supportProTickets');
    return savedTickets ? JSON.parse(savedTickets) : [
      {
        id: "T001",
        customer: "Anil Kumar",
        email: "anil.kumar@techcorp.com",
        title: "Login Authentication Failed",
        description: "Users are unable to login despite entering correct credentials. Error code 403 appears.",
        category: "Authentication",
        priority: "HIGH",
        status: "Closed",
        agent: "Sarah Chen",
        createdAt: "2024-03-15",
        timeAgo: "2 hours ago"
      },
      {
        id: "T002",
        customer: "Sneha Patel",
        email: "sneha.patel@enterprise.com",
        title: "Password Reset Link Not Working",
        description: "Password reset link expires immediately after generation.",
        category: "Security",
        priority: "CRITICAL",
        status: "In Progress",
        agent: "Mike Johnson",
        createdAt: "2024-03-15",
        timeAgo: "4 hours ago"
      },
      {
        id: "T003",
        customer: "Rahul Sharma",
        email: "rahul.sharma@business.com",
        title: "Dashboard Performance Issues",
        description: "Analytics dashboard takes over 15 seconds to load.",
        category: "Performance",
        priority: "MEDIUM",
        status: "Open",
        agent: "Alex Rivera",
        createdAt: "2024-03-14",
        timeAgo: "1 day ago"
      },
      {
        id: "T004",
        customer: "Priya Nair",
        email: "priya.nair@finance.com",
        title: "Payment Gateway Integration Error",
        description: "International transactions failing with error 500.",
        category: "Billing",
        priority: "HIGH",
        status: "Open",
        agent: "David Kim",
        createdAt: "2024-03-14",
        timeAgo: "1 day ago"
      }
    ];
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('supportProUser')) || null;
  });

  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('supportProTickets', JSON.stringify(tickets));
  }, [tickets]);

  const login = (email, password) => {
    const userData = {
      name: email.split('@')[0] || 'User',
      email: email,
      role: 'Support Agent',
      avatar: email.charAt(0).toUpperCase()
    };
    
    setUser(userData);
    localStorage.setItem('supportProUser', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('supportProUser');
  };

  const addTicket = (ticketData) => {
    const newTicket = {
      id: `T${(tickets.length + 1).toString().padStart(3, '0')}`,
      createdAt: new Date().toLocaleDateString('en-US'),
      timeAgo: "Just now",
      status: "Open",
      ...ticketData
    };
    
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    return newTicket;
  };

  const updateTicket = (id, updates) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === id ? { ...ticket, ...updates } : ticket
    );
    setTickets(updatedTickets);
  };

  const deleteTicket = (id) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(updatedTickets);
  };

  const closeTicket = (id) => {
    updateTicket(id, { status: 'Closed' });
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
    highPriority: tickets.filter(t => t.priority === 'HIGH' || t.priority === 'CRITICAL').length
  };

  const filteredTickets = tickets.filter(ticket => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ticket.title.toLowerCase().includes(searchLower) ||
      ticket.customer.toLowerCase().includes(searchLower) ||
      ticket.description.toLowerCase().includes(searchLower) ||
      ticket.id.toLowerCase().includes(searchLower)
    );
  });

  const value = {
    tickets: filteredTickets,
    allTickets: tickets,
    user,
    notifications,
    stats,
    searchTerm,
    setSearchTerm,
    login,
    logout,
    addTicket,
    updateTicket,
    deleteTicket,
    closeTicket
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within TicketProvider');
  }
  return context;
};
