import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, ChevronDown, LogOut, User, Settings, Briefcase, MessageSquare, LayoutDashboard, Plus, CreditCard, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';

const Navbar = () => {
  const { user, isAuthenticated, isFreelancer, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Freelancers', path: '/freelancers' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path.includes('#')) return false;
    return location.pathname === path;
  };

  return (
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-400/30">
              <span className="text-white font-bold text-lg">FX</span>
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:block">FreelanceX</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.path) ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {link.name}
                {isActive(link.path) && <motion.div layoutId="activeTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/messages" className="hidden sm:flex p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                  <MessageSquare className="w-5 h-5 text-gray-400 hover:text-white" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full" />
                </Link>

                <button className="hidden sm:flex p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full" />
                </button>

                {isFreelancer ? (
                  <Link to="/projects" className="hidden sm:flex btn-primary text-sm py-2 px-4">Find Work</Link>
                ) : (
                  <Link to="/projects/create" className="hidden sm:flex btn-primary text-sm py-2 px-4 gap-2 items-center"><Plus className="w-4 h-4" /> Post Project</Link>
                )}

                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10 transition-colors">
                    <Avatar user={user} size={36} showStatus />
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform hidden md:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-64 glass-card rounded-xl shadow-xl shadow-black/30 py-2 overflow-hidden border border-white/10">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="font-medium text-white">{user?.full_name}</p>
                          <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary-400/20 text-primary-400 capitalize">{user?.role}</span>
                        </div>
                        <Link to="/dashboard" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"><LayoutDashboard className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-300">Dashboard</span></Link>
                        <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"><User className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-300">Profile</span></Link>
                        <Link to="/messages" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"><MessageSquare className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-300">Messages</span></Link>
                        <Link to="/settings" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"><Settings className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-300">Settings</span></Link>
                        <Link to="/settings" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"><CreditCard className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-300">Billing</span></Link>
                        <div className="border-t border-white/10 mt-1">
                          <button onClick={() => { setIsProfileMenuOpen(false); logout(); }} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 transition-colors text-red-400"><LogOut className="w-4 h-4" /><span className="text-sm">Sign Out</span></button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-secondary text-sm py-2 px-5">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5">Get Started</Link>
              </div>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col gap-1 pt-4">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.path) ? 'bg-primary-400/20 text-primary-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>{link.name}</Link>
                ))}
                {isAuthenticated && (
                  <>
                    <Link to="/dashboard" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">Dashboard</Link>
                    <Link to="/messages" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">Messages</Link>
                    <Link to="/profile" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">Profile</Link>
                    <Link to="/settings" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">Settings</Link>
                    <Link to="/settings" className="px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white">Billing</Link>
                  </>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
