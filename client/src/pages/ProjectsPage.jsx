import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Clock, Star, Grid, List } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { TiltCard } from '../components/ui/TiltCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const categories = ['All', 'Web Development', 'Mobile', 'Design', 'Writing', 'Marketing', 'AI/ML'];

const allProjects = [
  { id: 1, title: 'E-commerce Platform with React & Node.js', description: 'Build a modern e-commerce platform with cart, checkout, and admin panel.', category: 'Web Development', budget: '$2,000 - $5,000', deadline: '2 weeks', skills: ['React', 'Node.js', 'PostgreSQL'], client: { name: 'Michael Torres', role: 'client', rating: 4.8 }, proposals: 12, posted: '2 hours ago' },
  { id: 2, title: 'Mobile App UI/UX Design', description: 'Design a fitness tracking mobile app with modern aesthetics.', category: 'Design', budget: '$1,500 - $3,000', deadline: '1 week', skills: ['Figma', 'UI/UX', 'Prototyping'], client: { name: 'Sarah Wilson', role: 'client', rating: 4.9 }, proposals: 8, posted: '5 hours ago' },
  { id: 3, title: 'AI Chatbot Integration', description: 'Integrate an AI-powered chatbot into existing SaaS platform.', category: 'AI/ML', budget: '$3,000 - $7,000', deadline: '3 weeks', skills: ['Python', 'OpenAI', 'FastAPI'], client: { name: 'David Chen', role: 'client', rating: 4.7 }, proposals: 5, posted: '1 day ago' },
  { id: 4, title: 'WordPress Blog Redesign', description: 'Redesign an existing WordPress blog with modern theme and SEO.', category: 'Web Development', budget: '$500 - $1,000', deadline: '1 week', skills: ['WordPress', 'PHP', 'SEO'], client: { name: 'Emma Johnson', role: 'client', rating: 4.6 }, proposals: 15, posted: '3 hours ago' },
  { id: 5, title: 'Content Writing for SaaS Blog', description: 'Write 10 SEO-optimized blog posts about cloud computing.', category: 'Writing', budget: '$400 - $800', deadline: '2 weeks', skills: ['SEO Writing', 'Technical Writing', 'SaaS'], client: { name: 'Lisa Park', role: 'client', rating: 4.8 }, proposals: 20, posted: '6 hours ago' },
  { id: 6, title: 'Social Media Marketing Campaign', description: 'Create and manage Instagram & TikTok ads for product launch.', category: 'Marketing', budget: '$1,000 - $2,500', deadline: '1 month', skills: ['Instagram', 'TikTok', 'Ad Campaigns'], client: { name: 'James Miller', role: 'client', rating: 4.5 }, proposals: 7, posted: '12 hours ago' },
  { id: 7, title: 'React Native Food Delivery App', description: 'Build a cross-platform food delivery app with real-time tracking.', category: 'Mobile', budget: '$4,000 - $8,000', deadline: '6 weeks', skills: ['React Native', 'Firebase', 'Maps API'], client: { name: 'Anna Lee', role: 'client', rating: 4.9 }, proposals: 10, posted: '4 hours ago' },
  { id: 8, title: 'Brand Identity & Logo Design', description: 'Create complete brand identity for a tech startup.', category: 'Design', budget: '$800 - $1,500', deadline: '10 days', skills: ['Illustrator', 'Branding', 'Logo Design'], client: { name: 'Tom Harris', role: 'client', rating: 4.7 }, proposals: 18, posted: '8 hours ago' },
  { id: 9, title: 'Email Marketing Automation', description: 'Set up automated email sequences for e-commerce platform.', category: 'Marketing', budget: '$600 - $1,200', deadline: '1 week', skills: ['Mailchimp', 'Automation', 'Copywriting'], client: { name: 'Rachel Green', role: 'client', rating: 4.6 }, proposals: 9, posted: '1 day ago' },
  { id: 10, title: 'Python Data Pipeline', description: 'Build an ETL pipeline for processing large datasets.', category: 'AI/ML', budget: '$2,500 - $5,000', deadline: '3 weeks', skills: ['Python', 'Apache Spark', 'AWS'], client: { name: 'Kevin Brown', role: 'client', rating: 4.8 }, proposals: 6, posted: '10 hours ago' },
  { id: 11, title: 'Flutter E-commerce App', description: 'Develop a beautiful e-commerce app with Flutter.', category: 'Mobile', budget: '$3,500 - $7,000', deadline: '5 weeks', skills: ['Flutter', 'Dart', 'Firebase'], client: { name: 'Sophie Martin', role: 'client', rating: 4.7 }, proposals: 11, posted: '2 hours ago' },
  { id: 12, title: 'SEO Content Strategy', description: 'Develop a comprehensive SEO content strategy for SaaS.', category: 'Writing', budget: '$800 - $1,500', deadline: '2 weeks', skills: ['SEO', 'Content Strategy', 'Analytics'], client: { name: 'Mark Davis', role: 'client', rating: 4.9 }, proposals: 14, posted: '5 hours ago' },
];

const budgetRanges = ['Any', 'Under $500', '$500 - $1,000', '$1,000 - $5,000', '$5,000+'];
const deadlineOptions = ['Any', 'Under 1 week', '1-2 weeks', '2-4 weeks', '1+ month'];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState('Any');
  const [deadlineFilter, setDeadlineFilter] = useState('Any');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProjects = useMemo(() => {
    let result = allProjects;

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (budgetFilter !== 'Any') {
      result = result.filter((p) => {
        const maxBudget = parseInt(p.budget.split('-').pop().replace(/[^0-9]/g, ''));
        switch (budgetFilter) {
          case 'Under $500': return maxBudget < 500;
          case '$500 - $1,000': return maxBudget >= 500 && maxBudget <= 1000;
          case '$1,000 - $5,000': return maxBudget >= 1000 && maxBudget <= 5000;
          case '$5,000+': return maxBudget >= 5000;
          default: return true;
        }
      });
    }

    return result;
  }, [selectedCategory, searchQuery, budgetFilter]);

  const activeFilters = [budgetFilter !== 'Any' ? budgetFilter : null, deadlineFilter !== 'Any' ? deadlineFilter : null].filter(Boolean);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Browse Projects</h1>
        <p className="text-gray-400">Find the perfect project for your skills</p>
      </motion.div>

      {/* Search and View Toggle */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-12" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(true)} className="btn-secondary flex items-center gap-2 text-sm whitespace-nowrap">
              <Filter className="w-4 h-4" /> Filters
              {activeFilters.length > 0 && <span className="w-5 h-5 rounded-full bg-primary-400 text-white text-xs flex items-center justify-center">{activeFilters.length}</span>}
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-dark-200 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary-400">
              <option value="newest">Newest</option>
              <option value="budget-high">Budget: High</option>
              <option value="budget-low">Budget: Low</option>
              <option value="proposals">Most Proposals</option>
            </select>
            <div className="flex items-center gap-1 bg-dark-200 rounded-xl p-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-400 text-white' : 'text-gray-400 hover:text-white'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-400 text-white' : 'text-gray-400 hover:text-white'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary-400 text-white shadow-lg shadow-primary-400/30' : 'bg-dark-200 text-gray-400 hover:text-white hover:bg-dark-100'}`}>
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">{filteredProjects.length} projects found</p>
        {activeFilters.length > 0 && (
          <button onClick={() => { setBudgetFilter('Any'); setDeadlineFilter('Any'); }} className="text-sm text-primary-400 hover:text-primary-300">Clear filters</button>
        )}
      </div>

      {/* Projects */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" key={`${selectedCategory}-${searchQuery}-${budgetFilter}`} className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {filteredProjects.map((project) => (
          <TiltCard key={project.id} intensity={10} className="h-full">
            <motion.div variants={itemVariants} className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-400/20 text-primary-400">{project.category}</span>
                  <span className="text-xs text-gray-500">{project.posted}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs bg-dark-200 text-gray-300 rounded">{skill}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <Avatar user={project.client} size={32} />
                    <div>
                      <div className="text-sm font-medium text-white">{project.client.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{project.client.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-400">{project.budget}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{project.deadline}</div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-dark-300/50 flex items-center justify-between">
                <span className="text-xs text-gray-400">{project.proposals} proposals</span>
                <Link to={`/projects/${project.id}`} className="px-4 py-2 text-sm font-medium bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors">View Details</Link>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
          <p className="text-gray-400">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md glass-card rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => (
                      <button key={range} onClick={() => setBudgetFilter(range)} className={`px-3 py-2 rounded-lg text-sm transition-all ${budgetFilter === range ? 'bg-primary-400 text-white' : 'bg-dark-200 text-gray-400 hover:text-white'}`}>{range}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Deadline</label>
                  <div className="flex flex-wrap gap-2">
                    {deadlineOptions.map((opt) => (
                      <button key={opt} onClick={() => setDeadlineFilter(opt)} className={`px-3 py-2 rounded-lg text-sm transition-all ${deadlineFilter === opt ? 'bg-primary-400 text-white' : 'bg-dark-200 text-gray-400 hover:text-white'}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => { setBudgetFilter('Any'); setDeadlineFilter('Any'); }} className="flex-1 btn-secondary text-sm py-3">Reset All</button>
                <button onClick={() => setShowFilters(false)} className="flex-1 btn-primary text-sm py-3">Apply Filters</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
