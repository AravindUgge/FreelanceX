import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, ChevronDown, LogOut, User, Settings, MessageSquare, LayoutDashboard, Plus, CreditCard } from 'lucide-react';
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 sm:py-3 shadow-lg shadow-black/20' : 'bg-transparent py-3 sm:py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-400/30"
            >
              <span className="text-white font-bold text-sm sm:text-base md:text-lg">FX</span>
            </motion.div>
            <span className="text-lg sm:text-xl font-bold gradient-text hidden sm:block">FreelanceX</span>
          </Link>

          {/* Desktop Nav — only visible md+ */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                  isActive(link.path) ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Right — only visible md+ */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
            {isAuthenticated && (
              <>
                <Link to="/messages" className="p-1.5 lg:p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                  <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 hover:text-white" />
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-secondary-500 rounded-full" />
                </Link>
                <button className="p-1.5 lg:p-2 rounded-lg hover:bg-white/10 transition-colors relative">
                  <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-secondary-500 rounded-full" />
                </button>
                {isFreelancer ? (
                  <Link to="/projects" className="btn-primary text-xs lg:text-sm py-1.5 px-3 lg:px-4">Find Work</Link>
                ) : (
                  <Link to="/projects/create" className="btn-primary text-xs lg:text-sm py-1.5 px-3 lg:px-4 gap-1.5 items-center flex">
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4" /> Post Project
                  </Link>
                )}
                <div className="relative" ref={profileRef}>
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-1 lg:gap-2 p-0.5 lg:p-1 rounded-xl hover:bg-white/10 transition-colors">
                    <Avatar user={user} size={30} showStatus />
                    <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 text-gray-400 transition-transform hidden lg:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-xl shadow-black/30 py-2 overflow-hidden border border-white/10"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="font-medium text-white text-sm">{user?.full_name}</p>
                          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary-400/20 text-primary-400 capitalize">{user?.role}</span>
                        </div>
                        {[
                          { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                          { to: '/profile', icon: User, label: 'Profile' },
                          { to: '/messages', icon: MessageSquare, label: 'Messages' },
                          { to: '/settings', icon: Settings, label: 'Settings' },
                          { to: '/settings', icon: CreditCard, label: 'Billing' },
                        ].map((item, i) => (
                          <Link key={i} to={item.to} onClick={() => setIsProfileMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors">
                            <item.icon className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-300">{item.label}</span>
                          </Link>
                        ))}
                        <div className="border-t border-white/10 mt-1">
                          <button onClick={() => { setIsProfileMenuOpen(false); logout(); }} className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-white/5 transition-colors text-red-400">
                            <LogOut className="w-4 h-4" />
                            <span className="text-xs">Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger — only visible below md */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full screen overlay, only below md */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark-400/98 backdrop-blur-xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 250 }}
              className="pt-20 pb-8 px-5 h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive(link.path) ? 'bg-primary-400/20 text-primary-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {isAuthenticated && (
                  <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-0.5">
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white">Dashboard</Link>
                    <Link to="/messages" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white">Messages</Link>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white">Profile</Link>
                    <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white">Settings</Link>
                    <button onClick={() => { setIsMobileMenuOpen(false); logout(); }} className="px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-white/5 text-left">Sign Out</button>
                  </div>
                )}
              </nav>

              {/* Auth buttons at bottom — only for unauthenticated */}
              {!isAuthenticated && (
                <div className="mt-auto flex flex-col gap-2.5">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary w-full text-center text-sm py-2.5">Sign In</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center text-sm py-2.5">Get Started</Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
