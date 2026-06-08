import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, DollarSign, MapPin, Star, Send, Users, Calendar, CheckCircle } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const project = {
    id: 1,
    title: 'E-commerce Platform with React & Node.js',
    description: 'We are looking for an experienced full-stack developer to build a modern e-commerce platform. The platform should include product listings, shopping cart, checkout with Stripe integration, user authentication, and an admin dashboard for managing products and orders.\n\nKey features needed:\n- Responsive design with mobile-first approach\n- Product search and filtering\n- User authentication (Google + Email)\n- Shopping cart with persistent storage\n- Stripe payment integration\n- Admin dashboard with analytics\n- Order tracking system',
    category: 'Web Development',
    budget: '$2,000 - $5,000',
    deadline: '2 weeks',
    status: 'open',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    client: {
      name: 'Michael Torres',
      role: 'client',
      rating: 4.8,
      projectsPosted: 12,
      hireRate: 85,
      memberSince: 'Jan 2024',
    },
    proposals: 12,
    posted: '2 hours ago',
  };

  const proposals = [
    { id: 1, freelancer: { name: 'Sarah Chen', role: 'freelancer', rating: 4.9 }, bid: '$3,500', days: 14, cover: 'I have 8+ years of experience building e-commerce platforms...' },
    { id: 2, freelancer: { name: 'Alex Rivera', role: 'freelancer', rating: 4.8 }, bid: '$4,000', days: 12, cover: 'As a full-stack specialist, I can deliver this project...' },
    { id: 3, freelancer: { name: 'Jordan Kim', role: 'freelancer', rating: 4.7 }, bid: '$3,200', days: 16, cover: 'I recently built a similar platform for a client...' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-400/20 text-primary-400">{project.category}</span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 capitalize">{project.status}</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Posted {project.posted}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{project.proposals} proposals</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-dark-200 rounded-xl">
              {['overview', 'proposals', 'updates'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`relative flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors capitalize ${activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
                  {activeTab === tab && <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary-400/20 rounded-lg" />}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="glass-card rounded-2xl p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">Project Description</h2>
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">{project.description}</div>
                </div>
              )}
              {activeTab === 'proposals' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white mb-4">Proposals ({proposals.length})</h2>
                  {proposals.map((p) => (
                    <div key={p.id} className="p-4 bg-dark-300/50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar user={p.freelancer} size={40} />
                          <div>
                            <div className="font-medium text-white">{p.freelancer.name}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{p.freelancer.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-primary-400 font-semibold">{p.bid}</div>
                          <div className="text-xs text-gray-400">{p.days} days</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{p.cover}</p>
                      <button className="text-sm text-primary-400 hover:text-primary-300 font-medium">View Full Proposal</button>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'updates' && (
                <div className="text-center py-12 text-gray-400">No updates yet.</div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Card */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Project Budget</h3>
              <div className="text-3xl font-bold gradient-text mb-4">{project.budget}</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400"><Clock className="w-4 h-4" />Duration: {project.deadline}</div>
                <div className="flex items-center gap-2 text-gray-400"><Users className="w-4 h-4" />{project.proposals} proposals</div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-primary mt-6 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />Submit Proposal
              </motion.button>
            </div>

            {/* Skills */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 text-sm bg-dark-300 text-gray-300 rounded-lg">{s}</span>
                ))}
              </div>
            </div>

            {/* Client Info */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">About Client</h3>
              <div className="flex items-center gap-3 mb-4">
                <Avatar user={project.client} size={48} />
                <div>
                  <div className="font-medium text-white">{project.client.name}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{project.client.rating}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400"><span>Projects Posted</span><span className="text-white">{project.client.projectsPosted}</span></div>
                <div className="flex justify-between text-gray-400"><span>Hire Rate</span><span className="text-white">{project.client.hireRate}%</span></div>
                <div className="flex justify-between text-gray-400"><span>Member Since</span><span className="text-white">{project.client.memberSince}</span></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
