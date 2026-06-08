import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Briefcase, Clock, Edit3, ExternalLink, Github, Linkedin, Globe, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Avatar';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'activity', label: 'Activity' },
  ];

  const portfolioItems = [
    { id: 1, title: 'E-commerce Platform', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', category: 'Web Dev' },
    { id: 2, title: 'Mobile Banking App', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400', category: 'Mobile' },
    { id: 3, title: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', category: 'UI/UX' },
    { id: 4, title: 'AI Analytics Tool', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', category: 'AI/ML' },
  ];

  const reviews = [
    { id: 1, client: 'Michael Torres', rating: 5, comment: 'Exceptional work! Delivered ahead of schedule with outstanding quality.', date: '2 days ago' },
    { id: 2, client: 'Sarah Wilson', rating: 5, comment: 'Highly professional and skilled. Would definitely hire again.', date: '1 week ago' },
    { id: 3, client: 'David Chen', rating: 4, comment: 'Great communication and solid technical skills.', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-6xl mx-auto">
      {/* Cover Photo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400/40 via-secondary-500/40 to-accent-500/40" />
        <div className="absolute inset-0 bg-dark-400/30" />
        <button className="absolute top-4 right-4 p-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors">
          <Edit3 className="w-5 h-5 text-white" />
        </button>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative -mt-24 mb-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
          <div className="relative">
            <Avatar user={user} size={150} className="ring-4 ring-dark-400" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-dark-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{user?.full_name}</h1>
              {user?.is_verified && (
                <div className="px-2 py-1 bg-primary-400/20 text-primary-400 text-xs font-medium rounded-full">
                  Verified
                </div>
              )}
            </div>
            <p className="text-primary-400 text-lg mb-2">
              {user?.role === 'freelancer' ? 'Full-Stack Developer' : 'Tech Entrepreneur'}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />San Francisco, CA</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />4.9 (47 reviews)</span>
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />32 projects completed</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            <Edit3 className="w-4 h-4 mr-2 inline" />
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-dark-200 rounded-xl mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary-400/20 rounded-lg"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Bio */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">
                  Passionate full-stack developer with 8+ years of experience building scalable web applications.
                  I specialize in React, Node.js, and cloud architecture. I love turning complex problems into
                  simple, beautiful, and intuitive solutions.
                </p>
              </div>

              {/* Skills */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
                <div className="space-y-4">
                  {[
                    { name: 'React / Next.js', level: 95 },
                    { name: 'Node.js / Express', level: 90 },
                    { name: 'TypeScript', level: 88 },
                    { name: 'PostgreSQL / MongoDB', level: 85 },
                    { name: 'AWS / Docker', level: 80 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-primary-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Earnings</span>
                    <span className="text-white font-semibold">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-white font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">On-Time Delivery</span>
                    <span className="text-white font-semibold">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hourly Rate</span>
                    <span className="text-primary-400 font-semibold">$85/hr</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Links</h2>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Github className="w-5 h-5" /> GitHub
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Globe className="w-5 h-5" /> Portfolio
                  </a>
                  <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="h-48 bg-dark-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white/20">
                    {item.title.charAt(0)}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary-400 font-medium">{item.category}</span>
                  <h3 className="text-white font-medium mt-1">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold">
                      {review.client.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{review.client}</div>
                      <div className="text-xs text-gray-400">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="glass-card rounded-2xl p-6">
            <p className="text-gray-400 text-center py-12">Activity feed coming soon...</p>
          </div>
        )}
      </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
