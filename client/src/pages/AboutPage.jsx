import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Shield, Globe, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { TiltCard } from '../components/ui/TiltCard';

const stats = [
  { icon: Users, value: '50,000+', label: 'Freelancers', color: 'from-primary-400 to-primary-500' },
  { icon: Target, value: '100,000+', label: 'Projects Completed', color: 'from-secondary-500 to-secondary-600' },
  { icon: Heart, value: '98%', label: 'Satisfaction Rate', color: 'from-accent-400 to-accent-500' },
  { icon: Shield, value: '$50M+', label: 'Paid to Freelancers', color: 'from-green-400 to-green-500' },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Every freelancer is verified. Every payment is secured. Your projects are protected.',
  },
  {
    icon: Globe,
    title: 'Global Talent',
    description: 'Access top talent from around the world. Work with the best, regardless of location.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Our rating system ensures you work with proven professionals who deliver results.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'We built FreelanceX for freelancers, by freelancers. Your success is our mission.',
  },
];

const team = [
  { name: 'Sarah Chen', role: 'CEO & Co-Founder', bio: 'Former freelancer who built a 7-figure agency.' },
  { name: 'Marcus Johnson', role: 'CTO & Co-Founder', bio: '15+ years building scalable platforms.' },
  { name: 'Elena Rodriguez', role: 'Head of Design', bio: 'Award-winning designer, passionate about UX.' },
  { name: 'David Kim', role: 'Head of Community', bio: 'Built communities of 100K+ members.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">About FreelanceX</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Future of <span className="gradient-text">Freelancing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to connect the world's best freelancers with amazing opportunities. 
            Built by freelancers, for freelancers.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <TiltCard key={stat.label} intensity={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-6 text-lg">
                FreelanceX was born from a simple frustration: freelancing platforms were broken. 
                High fees, unreliable talent, and poor experiences for everyone.
              </p>
              <p className="text-gray-400 mb-6">
                We built something different. A platform where freelancers earn what they deserve, 
                where clients find verified talent they can trust, and where every project is a success.
              </p>
              <div className="space-y-3">
                {['Zero fees for freelancers', 'Verified talent pool', 'Secure milestone payments', '24/7 support'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-500/20 rounded-3xl blur-xl" />
              <div className="relative glass-card rounded-3xl p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-2">Join the Revolution</h3>
                <p className="text-gray-400 mb-6">Start your journey with FreelanceX today</p>
                <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Our Values</span>
            <h2 className="text-3xl font-bold text-white">What We Stand For</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <TiltCard key={value.title} intensity={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Our Team</span>
            <h2 className="text-3xl font-bold text-white">Meet the Founders</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TiltCard key={member.name} intensity={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-primary-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Us?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you're a freelancer looking for opportunities or a client seeking talent, 
            FreelanceX is the platform for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
              Sign Up Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/projects" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
              Browse Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
