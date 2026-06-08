import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Briefcase, ArrowRight, X, Send, CheckCircle } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { TiltCard, FloatingCard } from '../components/ui/TiltCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const skillFilters = ['All', 'React', 'Node.js', 'Python', 'UI/UX', 'TypeScript', 'Vue.js', 'DevOps'];

const sampleFreelancers = [
  { id: 1, name: 'Sarah Chen', role: 'freelancer', title: 'Full-Stack Developer', bio: 'Passionate about building scalable web applications with modern technologies.', skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'], hourlyRate: 85, rating: 4.9, reviews: 47, completedProjects: 32, location: 'San Francisco, CA', is_online: true },
  { id: 2, name: 'Alex Rivera', role: 'freelancer', title: 'UI/UX Designer', bio: 'Creating beautiful, intuitive interfaces that users love.', skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'], hourlyRate: 95, rating: 4.8, reviews: 38, completedProjects: 28, location: 'New York, NY', is_online: true },
  { id: 3, name: 'Jordan Kim', role: 'freelancer', title: 'ML Engineer', bio: 'Building intelligent systems with machine learning and AI.', skills: ['Python', 'TensorFlow', 'PyTorch', 'ML Ops'], hourlyRate: 120, rating: 4.9, reviews: 25, completedProjects: 18, location: 'Seoul, South Korea', is_online: false },
  { id: 4, name: 'Maya Patel', role: 'freelancer', title: 'Vue.js Specialist', bio: 'Expert in building fast, reactive web applications with Vue.js ecosystem.', skills: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind'], hourlyRate: 75, rating: 4.7, reviews: 52, completedProjects: 41, location: 'Mumbai, India', is_online: true },
  { id: 5, name: 'Chris Anderson', role: 'freelancer', title: 'DevOps Engineer', bio: 'Streamlining development workflows and infrastructure automation.', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'], hourlyRate: 110, rating: 4.8, reviews: 31, completedProjects: 24, location: 'Austin, TX', is_online: true },
  { id: 6, name: 'Emma Larsson', role: 'freelancer', title: 'Mobile Developer', bio: 'Crafting beautiful cross-platform mobile experiences.', skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'], hourlyRate: 90, rating: 4.9, reviews: 44, completedProjects: 35, location: 'Stockholm, Sweden', is_online: false },
  { id: 7, name: 'David Park', role: 'freelancer', title: 'Backend Engineer', bio: 'Building robust APIs and microservices architecture.', skills: ['Go', 'Rust', 'PostgreSQL', 'Redis'], hourlyRate: 130, rating: 5.0, reviews: 28, completedProjects: 19, location: 'Seattle, WA', is_online: true },
  { id: 8, name: 'Lisa Wang', role: 'freelancer', title: 'Data Scientist', bio: 'Turning data into actionable insights and predictions.', skills: ['Python', 'R', 'TensorFlow', 'SQL'], hourlyRate: 140, rating: 4.8, reviews: 33, completedProjects: 22, location: 'Boston, MA', is_online: true },
  { id: 9, name: 'Omar Hassan', role: 'freelancer', title: 'Blockchain Developer', bio: 'Building decentralized applications and smart contracts.', skills: ['Solidity', 'Ethereum', 'Web3', 'Rust'], hourlyRate: 150, rating: 4.9, reviews: 18, completedProjects: 12, location: 'Dubai, UAE', is_online: false },
];

const FreelancersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [showHireModal, setShowHireModal] = useState(null);
  const [hireMessage, setHireMessage] = useState('');
  const [hireSent, setHireSent] = useState(false);

  const filteredFreelancers = sampleFreelancers.filter((f) => {
    if (selectedSkill !== 'All' && !f.skills.includes(selectedSkill)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.title.toLowerCase().includes(q) || f.skills.some((s) => s.toLowerCase().includes(q));
    }
    return true;
  });

  const handleHire = () => {
    setHireSent(true);
    setTimeout(() => {
      setHireSent(false);
      setShowHireModal(null);
      setHireMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Find Freelancers</h1>
        <p className="text-gray-400 text-lg">Connect with top talent from around the world</p>
      </motion.div>

      {/* Stats Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[{ label: 'Total Freelancers', value: '10,247', icon: '👥' }, { label: 'Online Now', value: '1,892', icon: '🟢' }, { label: 'Avg. Rating', value: '4.8/5', icon: '⭐' }, { label: 'Countries', value: '52', icon: '🌍' }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Search by name or skill..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-12" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {skillFilters.map((skill) => (
            <button key={skill} onClick={() => setSelectedSkill(skill)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSkill === skill ? 'bg-primary-400 text-white shadow-lg shadow-primary-400/30' : 'bg-dark-200 text-gray-400 hover:text-white hover:bg-dark-100'}`}>
              {skill}
            </button>
          ))}
        </div>
      </motion.div>

      <p className="text-sm text-gray-400 mb-4">{filteredFreelancers.length} freelancers found</p>

      {/* Freelancers Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" key={`${selectedSkill}-${searchQuery}`} className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFreelancers.map((freelancer, index) => (
          <TiltCard key={freelancer.id} intensity={12} className="h-full">
            <motion.div variants={itemVariants} className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="h-24 bg-gradient-to-r from-primary-400/20 to-secondary-500/20 relative">
                {freelancer.is_online && <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />Online</div>}
              </div>
              <div className="px-6 pb-6 flex-1 flex flex-col">
                <div className="-mt-10 mb-4"><Avatar user={freelancer} size={80} className="ring-4 ring-dark-200" /></div>
                <h3 className="text-lg font-semibold text-white mb-1">{freelancer.name}</h3>
                <p className="text-sm text-primary-400 mb-2">{freelancer.title}</p>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{freelancer.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill) => <span key={skill} className="px-2 py-1 text-xs bg-dark-200 text-gray-300 rounded">{skill}</span>)}
                  {freelancer.skills.length > 3 && <span className="px-2 py-1 text-xs bg-dark-200 text-gray-400 rounded">+{freelancer.skills.length - 3}</span>}
                </div>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1 text-gray-400"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white font-medium">{freelancer.rating}</span><span>({freelancer.reviews})</span></div>
                  <div className="flex items-center gap-1 text-gray-400"><Briefcase className="w-4 h-4" /><span>{freelancer.completedProjects} projects</span></div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-1 text-sm text-gray-400"><MapPin className="w-4 h-4" />{freelancer.location}</div>
                  <div className="text-lg font-bold text-primary-400">${freelancer.hourlyRate}<span className="text-xs text-gray-500 font-normal">/hr</span></div>
                </div>
                <button onClick={() => setShowHireModal(freelancer)} className="w-full mt-4 btn-primary flex items-center justify-center gap-2 text-sm py-3">
                  Hire {freelancer.name.split(' ')[0]} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </motion.div>

      {filteredFreelancers.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No freelancers found</h3>
          <p className="text-gray-400">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Hire Modal */}
      <AnimatePresence>
        {showHireModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowHireModal(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md glass-card rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Hire {showHireModal.name}</h2>
                <button onClick={() => setShowHireModal(null)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              {hireSent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Request Sent!</h3>
                  <p className="text-gray-400">{showHireModal.name} will be notified of your interest.</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6 p-4 bg-dark-300/50 rounded-xl">
                    <Avatar user={showHireModal} size={56} />
                    <div>
                      <div className="font-medium text-white">{showHireModal.name}</div>
                      <div className="text-sm text-primary-400">{showHireModal.title}</div>
                      <div className="text-sm text-gray-400">${showHireModal.hourlyRate}/hr</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Message (optional)</label>
                    <textarea value={hireMessage} onChange={(e) => setHireMessage(e.target.value)} rows={4} placeholder="Tell them about your project..." className="input-field resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowHireModal(null)} className="flex-1 btn-secondary py-3">Cancel</button>
                    <button onClick={handleHire} className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"><Send className="w-4 h-4" /> Send Request</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default FreelancersPage;
