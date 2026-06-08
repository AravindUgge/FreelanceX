import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, DollarSign, TrendingUp, Clock, ArrowRight, Star, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const DashboardPage = () => {
  const { user, isFreelancer, isClient } = useAuth();

  const freelancerStats = [
    { icon: DollarSign, label: 'Total Earnings', value: '$12,450', change: '+12%', color: 'from-green-400 to-emerald-500' },
    { icon: Briefcase, label: 'Active Projects', value: '3', change: '+1', color: 'from-primary-400 to-primary-500' },
    { icon: Star, label: 'Avg. Rating', value: '4.9', change: '+0.1', color: 'from-yellow-400 to-orange-500' },
    { icon: Clock, label: 'Hours Logged', value: '156', change: '+24', color: 'from-accent-400 to-accent-500' },
  ];

  const clientStats = [
    { icon: DollarSign, label: 'Total Spent', value: '$8,320', change: '+8%', color: 'from-red-400 to-pink-500' },
    { icon: Briefcase, label: 'Active Projects', value: '5', change: '+2', color: 'from-primary-400 to-primary-500' },
    { icon: Users, label: 'Hired Freelancers', value: '12', change: '+3', color: 'from-accent-400 to-accent-500' },
    { icon: MessageSquare, label: 'Messages', value: '24', change: '+8', color: 'from-yellow-400 to-orange-500' },
  ];

  const stats = isFreelancer ? freelancerStats : clientStats;

  const recentProjects = [
    {
      id: 1,
      title: 'E-commerce Platform Redesign',
      status: 'in_progress',
      deadline: '2 days',
      budget: '$2,500',
      progress: 65,
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      status: 'review',
      deadline: '5 days',
      budget: '$1,800',
      progress: 90,
    },
    {
      id: 3,
      title: 'API Integration',
      status: 'completed',
      deadline: 'Completed',
      budget: '$3,200',
      progress: 100,
    },
  ];

  const statusColors = {
    in_progress: 'bg-blue-500/20 text-blue-400',
    review: 'bg-yellow-500/20 text-yellow-400',
    completed: 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Welcome header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Avatar user={user} size={64} showStatus />
            <div>
              <h1 className="text-3xl font-bold text-white">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.full_name?.split(' ')[0]}!
              </h1>
              <p className="text-gray-400">
                {isFreelancer ? "Here's your freelancing overview" : "Here's your project dashboard"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-xs text-green-400 font-medium">{stat.change} this month</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent projects */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
                <Link to="/projects" className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl bg-dark-200/50 hover:bg-dark-200 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-white mb-1">{project.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>Deadline: {project.deadline}</span>
                          <span>•</span>
                          <span>{project.budget}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="relative h-2 bg-dark-300 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full"
                      />
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">{project.progress}% complete</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={itemVariants}>
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {isFreelancer ? (
                  <>
                    <Link to="/projects" className="flex items-center gap-3 p-3 rounded-xl bg-primary-400/10 hover:bg-primary-400/20 transition-colors">
                      <Briefcase className="w-5 h-5 text-primary-400" />
                      <span className="text-white">Browse Projects</span>
                    </Link>
                    <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl bg-secondary-500/10 hover:bg-secondary-500/20 transition-colors">
                      <Star className="w-5 h-5 text-secondary-500" />
                      <span className="text-white">Update Portfolio</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/projects/create" className="flex items-center gap-3 p-3 rounded-xl bg-primary-400/10 hover:bg-primary-400/20 transition-colors">
                      <Briefcase className="w-5 h-5 text-primary-400" />
                      <span className="text-white">Post a Project</span>
                    </Link>
                    <Link to="/freelancers" className="flex items-center gap-3 p-3 rounded-xl bg-secondary-500/10 hover:bg-secondary-500/20 transition-colors">
                      <Users className="w-5 h-5 text-secondary-500" />
                      <span className="text-white">Find Freelancers</span>
                    </Link>
                  </>
                )}
                <Link to="/messages" className="flex items-center gap-3 p-3 rounded-xl bg-accent-500/10 hover:bg-accent-500/20 transition-colors">
                  <MessageSquare className="w-5 h-5 text-accent-500" />
                  <span className="text-white">Messages</span>
                </Link>
              </div>
            </div>

            {/* Earnings chart placeholder */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {isFreelancer ? 'Earnings Overview' : 'Spending Overview'}
              </h2>
              <div className="h-48 flex items-end justify-between gap-2">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-primary-400 to-secondary-500 rounded-t-lg"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
