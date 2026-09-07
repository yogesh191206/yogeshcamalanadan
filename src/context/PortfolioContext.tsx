import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { InternshipItem, Course, Certificate, ContactMessage } from '../types';
import { INITIAL_INTERNSHIPS, INITIAL_COURSES, CERTIFICATES } from '../data/portfolioData';

interface PortfolioContextType {
  internships: InternshipItem[];
  courses: Course[];
  certificates: Certificate[];
  isAdmin: boolean;
  token: string | null;
  loading: boolean;
  loginAdmin: (passcode: string) => Promise<{ success: boolean; message: string }>;
  logoutAdmin: () => void;
  addInternship: (item: Omit<InternshipItem, 'id'>) => Promise<{ success: boolean; message: string }>;
  addCourse: (item: Omit<Course, 'id'>) => Promise<{ success: boolean; message: string }>;
  addCertificate: (item: Omit<Certificate, 'id'>) => Promise<{ success: boolean; message: string }>;
  deleteItem: (type: 'internships' | 'courses' | 'certificates', id: string) => Promise<{ success: boolean; message: string }>;
  isAdminLoginOpen: boolean;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;
  isAddModalOpen: boolean;
  addModalType: 'internship' | 'course' | 'certificate' | null;
  openAddModal: (type: 'internship' | 'course' | 'certificate') => void;
  closeAddModal: () => void;
  messages: ContactMessage[];
  fetchMessages: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'yogesh_portfolio_store_v1';
const ADMIN_TOKEN_KEY = 'yogesh_admin_token';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [internships, setInternships] = useState<InternshipItem[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.internships) && parsed.internships.length > 0) {
          // Merge custom with initial, avoiding duplicates
          const customIds = new Set(parsed.internships.map((i: InternshipItem) => i.id));
          const initials = INITIAL_INTERNSHIPS.filter(i => !customIds.has(i.id));
          return [...parsed.internships, ...initials];
        }
      }
    } catch (e) {
      console.warn('Local cache read error', e);
    }
    return INITIAL_INTERNSHIPS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.courses) && parsed.courses.length > 0) {
          const customIds = new Set(parsed.courses.map((c: Course) => c.id));
          const initials = INITIAL_COURSES.filter(c => !customIds.has(c.id));
          return [...parsed.courses, ...initials];
        }
      }
    } catch (e) {
      console.warn('Local cache read error', e);
    }
    return INITIAL_COURSES;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.certificates) && parsed.certificates.length > 0) {
          const customIds = new Set(parsed.certificates.map((c: Certificate) => c.id));
          const initials = CERTIFICATES.filter(c => !customIds.has(c.id));
          return [...parsed.certificates, ...initials];
        }
      }
    } catch (e) {
      console.warn('Local cache read error', e);
    }
    return CERTIFICATES;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || null;
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [addModalType, setAddModalType] = useState<'internship' | 'course' | 'certificate' | null>(null);

  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Fetch data from server
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/portfolio-data');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const serverInternships: InternshipItem[] = json.data.internships || [];
          const serverCourses: Course[] = json.data.courses || [];
          const serverCertificates: Certificate[] = json.data.certificates || [];

          // Save custom data locally as backup
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
            internships: serverInternships,
            courses: serverCourses,
            certificates: serverCertificates
          }));

          // Merge server custom items with static defaults
          const customIntIds = new Set(serverInternships.map(i => i.id));
          setInternships([...serverInternships, ...INITIAL_INTERNSHIPS.filter(i => !customIntIds.has(i.id))]);

          const customCourseIds = new Set(serverCourses.map(c => c.id));
          setCourses([...serverCourses, ...INITIAL_COURSES.filter(c => !customCourseIds.has(c.id))]);

          const customCertIds = new Set(serverCertificates.map(c => c.id));
          setCertificates([...serverCertificates, ...CERTIFICATES.filter(c => !customCertIds.has(c.id))]);
        }
      }
    } catch (err) {
      console.warn('Could not fetch remote portfolio data, using local state/cache', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify Admin session
  const verifyAdminSession = useCallback(async (authToken: string) => {
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsAdmin(true);
          return true;
        }
      }
    } catch (err) {
      console.warn('Verify session error', err);
    }
    // Fallback: if token matches default offline fallback or saved token
    if (authToken && authToken.startsWith('admin_')) {
      setIsAdmin(true);
      return true;
    }
    setIsAdmin(false);
    return false;
  }, []);

  useEffect(() => {
    refreshData();
    if (token) {
      verifyAdminSession(token);
    }
  }, [refreshData, token, verifyAdminSession]);

  // Global keyboard shortcut to open Admin Modal: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminLoginOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Admin login action
  const loginAdmin = async (passcode: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setToken(data.token);
        setIsAdmin(true);
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        setIsAdminLoginOpen(false);
        return { success: true, message: 'Welcome back, Yogesh! Admin mode enabled.' };
      } else {
        return { success: false, message: data.message || 'Incorrect passcode' };
      }
    } catch (err) {
      // Offline fallback check for testing / container cold starts
      if (passcode.trim() === 'yogesh@2026') {
        const mockToken = `admin_${Date.now()}`;
        setToken(mockToken);
        setIsAdmin(true);
        localStorage.setItem(ADMIN_TOKEN_KEY, mockToken);
        setIsAdminLoginOpen(false);
        return { success: true, message: 'Admin mode authenticated (local fallback).' };
      }
      return { success: false, message: 'Server connection error. Please retry.' };
    }
  };

  const logoutAdmin = async () => {
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (err) {
        // ignore
      }
    }
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  // Add Internship
  const addInternship = async (item: Omit<InternshipItem, 'id'>) => {
    if (!token) return { success: false, message: 'Unauthorized' };

    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      if (res.ok && data.success && data.item) {
        setInternships(prev => [data.item, ...prev]);
        closeAddModal();
        return { success: true, message: 'Internship added successfully!' };
      }
      return { success: false, message: data.message || 'Failed to add internship' };
    } catch (err) {
      // Local fallback
      const newItem: InternshipItem = {
        ...item,
        id: `internship-${Date.now()}`,
        isCustom: true,
        createdAt: new Date().toISOString()
      };
      setInternships(prev => [newItem, ...prev]);
      closeAddModal();
      return { success: true, message: 'Internship saved locally!' };
    }
  };

  // Add Course
  const addCourse = async (item: Omit<Course, 'id'>) => {
    if (!token) return { success: false, message: 'Unauthorized' };

    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      if (res.ok && data.success && data.item) {
        setCourses(prev => [data.item, ...prev]);
        closeAddModal();
        return { success: true, message: 'Course added successfully!' };
      }
      return { success: false, message: data.message || 'Failed to add course' };
    } catch (err) {
      const newItem: Course = {
        ...item,
        id: `course-${Date.now()}`,
        isCustom: true,
        createdAt: new Date().toISOString()
      };
      setCourses(prev => [newItem, ...prev]);
      closeAddModal();
      return { success: true, message: 'Course saved locally!' };
    }
  };

  // Add Certificate
  const addCertificate = async (item: Omit<Certificate, 'id'>) => {
    if (!token) return { success: false, message: 'Unauthorized' };

    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      if (res.ok && data.success && data.item) {
        setCertificates(prev => [data.item, ...prev]);
        closeAddModal();
        return { success: true, message: 'Certificate added successfully!' };
      }
      return { success: false, message: data.message || 'Failed to add certificate' };
    } catch (err) {
      const newItem: Certificate = {
        ...item,
        id: `cert-${Date.now()}`,
        isCustom: true,
        createdAt: new Date().toISOString()
      };
      setCertificates(prev => [newItem, ...prev]);
      closeAddModal();
      return { success: true, message: 'Certificate saved locally!' };
    }
  };

  // Delete Item
  const deleteItem = async (type: 'internships' | 'courses' | 'certificates', id: string) => {
    if (!token) return { success: false, message: 'Unauthorized' };

    try {
      const res = await fetch(`/api/items/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (type === 'internships') {
          setInternships(prev => prev.filter(i => i.id !== id));
        } else if (type === 'courses') {
          setCourses(prev => prev.filter(c => c.id !== id));
        } else if (type === 'certificates') {
          setCertificates(prev => prev.filter(c => c.id !== id));
        }
        return { success: true, message: 'Item deleted successfully' };
      }
      return { success: false, message: data.message || 'Failed to delete' };
    } catch (err) {
      if (type === 'internships') {
        setInternships(prev => prev.filter(i => i.id !== id));
      } else if (type === 'courses') {
        setCourses(prev => prev.filter(c => c.id !== id));
      } else if (type === 'certificates') {
        setCertificates(prev => prev.filter(c => c.id !== id));
      }
      return { success: true, message: 'Item removed locally' };
    }
  };

  // Fetch admin messages
  const fetchMessages = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.messages) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.warn('Fetch messages error', err);
    }
  };

  const openAddModal = (type: 'internship' | 'course' | 'certificate') => {
    setAddModalType(type);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddModalType(null);
  };

  const openAdminLogin = () => setIsAdminLoginOpen(true);
  const closeAdminLogin = () => setIsAdminLoginOpen(false);

  return (
    <PortfolioContext.Provider
      value={{
        internships,
        courses,
        certificates,
        isAdmin,
        token,
        loading,
        loginAdmin,
        logoutAdmin,
        addInternship,
        addCourse,
        addCertificate,
        deleteItem,
        isAdminLoginOpen,
        openAdminLogin,
        closeAdminLogin,
        isAddModalOpen,
        addModalType,
        openAddModal,
        closeAddModal,
        messages,
        fetchMessages,
        refreshData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
