import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, Briefcase, Zap, Shield, Globe, Code, Palette, PenTool, TrendingUp, ChevronLeft, ChevronRight, Play, CheckCircle, Sparkles, Rocket, Heart } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { TiltCard, FloatingCard, ParallaxLayer } from '../components/ui/TiltCard';

const typingTexts = ['Designers', 'Developers', 'Writers', 'Marketers'];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Particle = ({ delay }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
    initial={{ x: Math.random() * 1200, y: Math.random() * 800, opacity: 0 }}
    animate={{
      y: [0, -300],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 4 + Math.random() * 4,
      delay: delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

const HomePage = () => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const currentText = typingTexts[typingIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  const featuredFreelancers = [
    { id: 1, name: 'Sarah Chen', role: 'freelancer', skills: ['React', 'Node.js'], rating: 4.9, is_online: true },
    { id: 2, name: 'Alex Rivera', role: 'freelancer', skills: ['UI/UX', 'Figma'], rating: 4.8, is_online: true },
    { id: 3, name: 'Jordan Kim', role: 'freelancer', skills: ['Python', 'ML'], rating: 4.7, is_online: false },
    { id: 4, name: 'Maya Patel', role: 'freelancer', skills: ['Vue.js', 'TypeScript'], rating: 4.9, is_online: true },
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Freelancers', color: 'from-blue-400 to-cyan-400' },
    { icon: Briefcase, value: '5,000+', label: 'Projects Completed', color: 'from-primary-400 to-secondary-500' },
    { icon: Star, value: '4.8/5', label: 'Average Rating', color: 'from-yellow-400 to-orange-500' },
    { icon: Globe, value: '50+', label: 'Countries', color: 'from-green-400 to-emerald-500' },
  ];

  const categories = [
    { icon: Code, name: 'Web Development', count: '2,500+', color: 'from-blue-500 to-indigo-500' },
    { icon: Palette, name: 'UI/UX Design', count: '1,200+', color: 'from-pink-500 to-rose-500' },
    { icon: PenTool, name: 'Content Writing', count: '800+', color: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp, name: 'Digital Marketing', count: '600+', color: 'from-green-500 to-emerald-500' },
    { icon: Sparkles, name: 'AI & Machine Learning', count: '400+', color: 'from-purple-500 to-violet-500' },
    { icon: Rocket, name: 'Mobile Development', count: '900+', color: 'from-cyan-500 to-blue-500' },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Connect with freelancers in minutes, not days. AI-powered matching finds the perfect fit.', color: 'from-yellow-400 to-orange-500' },
    { icon: Shield, title: 'Secure Payments', description: 'Escrow system protects both clients and freelancers. Release funds when satisfied.', color: 'from-green-400 to-emerald-500' },
    { icon: Star, title: 'Quality Guaranteed', description: 'Work with vetted, top-rated professionals. Review system ensures accountability.', color: 'from-primary-400 to-secondary-500' },
    { icon: Heart, title: '24/7 Support', description: 'Our team is always here to help. Get assistance whenever you need it.', color: 'from-pink-400 to-rose-500' },
  ];

  const testimonials = [
    { id: 1, name: 'David Park', role: 'CEO, TechStart', avatar: 'client', rating: 5, text: 'FreelanceX transformed how we build products. We found an amazing React developer in just 2 days. The quality exceeded our expectations!' },
    { id: 2, name: 'Lisa Wang', role: 'Freelance Designer', avatar: 'freelancer', rating: 5, text: 'As a freelancer, FreelanceX gave me access to high-quality clients. The payment system is reliable and I love the escrow feature.' },
    { id: 3, name: 'James Miller', role: 'CTO, InnovateCo', avatar: 'client', rating: 5, text: 'The best platform for hiring talent. The vetting process ensures you only work with top professionals. Highly recommended!' },
    { id: 4, name: 'Sarah Johnson', role: 'Full-Stack Developer', avatar: 'freelancer', rating: 5, text: 'I doubled my income after joining FreelanceX. The platform is intuitive and the support team is incredible.' },
  ];

  const howItWorks = [
    { step: '01', title: 'Create Account', description: 'Sign up for free in seconds. Choose your role as client or freelancer.' },
    { step: '02', title: 'Post or Find Work', description: 'Clients post projects, freelancers browse and submit proposals.' },
    { step: '03', title: 'Collaborate', description: 'Work together with built-in messaging and project management tools.' },
    { step: '04', title: 'Get Paid', description: 'Secure payments through escrow. Release funds when work is approved.' },
  ];

  const nextTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section style={{ y: heroY, opacity: heroOpacity }} className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} delay={i * 0.3} />
          ))}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float-slower" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Trusted by 10,000+ freelancers worldwide</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Find Top{' '}
              <span className="gradient-text">{displayText}</span>
              <span className="typing-cursor">|</span>
              <br />
              Build Amazing Things
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
              Connect with world-class talent. Get projects done on time, within budget, and beyond expectations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register" className="btn-primary text-lg px-10 py-4 inline-flex items-center justify-center gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/projects" className="btn-secondary text-lg px-10 py-4 inline-flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Browse Projects
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Free forever</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Cancel anytime</div>
            </div>
          </motion.div>

          {/* Floating avatars */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-16 flex justify-center gap-6 md:gap-8">
            {featuredFreelancers.map((freelancer, index) => (
              <motion.div key={freelancer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 + index * 0.15 }} whileHover={{ y: -10, scale: 1.1 }} className="relative">
                <Avatar user={freelancer} size={80} showStatus />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass-card px-3 py-1 rounded-full whitespace-nowrap">
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /><span className="text-xs text-white">{freelancer.rating}</span></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} className="glass-card rounded-2xl p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Explore Categories</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Talent by Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Browse through our wide range of professional categories</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <TiltCard key={cat.name} intensity={8} className="h-full">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card rounded-2xl p-6 cursor-pointer group h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-400">{cat.count} freelancers</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/projects" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium">
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Built for Success</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to succeed in the freelancing world</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <TiltCard key={feature.title} intensity={10} className="h-full">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card rounded-2xl p-6 text-center group h-full">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Get started in four easy steps</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="text-center relative">
                {index < 3 && <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-400/50 to-transparent" />}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-2xl font-bold text-white relative z-10">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Loved by Thousands</h2>
          </motion.div>

          <div className="relative">
            <FloatingCard intensity={5}>
              <motion.div key={testimonialIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="glass-card rounded-3xl p-8 md:p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 italic leading-relaxed">"{testimonials[testimonialIndex].text}"</p>
                <div className="flex items-center justify-center gap-4">
                  <Avatar user={{ role: testimonials[testimonialIndex].avatar }} size={56} />
                  <div className="text-left">
                    <div className="text-white font-semibold">{testimonials[testimonialIndex].name}</div>
                    <div className="text-gray-400 text-sm">{testimonials[testimonialIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </FloatingCard>

            <div className="flex justify-center gap-4 mt-8">
              <button onClick={prevTestimonial} className="p-3 rounded-full glass hover:bg-white/10 transition-colors"><ChevronLeft className="w-5 h-5 text-white" /></button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === testimonialIndex ? 'w-8 bg-primary-400' : 'bg-gray-600'}`} />
                ))}
              </div>
              <button onClick={nextTestimonial} className="p-3 rounded-full glass hover:bg-white/10 transition-colors"><ChevronRight className="w-5 h-5 text-white" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard intensity={6}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative glass-card rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-500/20 pointer-events-none" />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #6C63FF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative z-10">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">🚀</motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">Join thousands of freelancers and clients already using FreelanceX to build amazing things together.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register" className="btn-primary text-lg px-10 py-4 inline-flex items-center justify-center gap-2">Start Free Today <ArrowRight className="w-5 h-5" /></Link>
                  <Link to="/projects" className="btn-secondary text-lg px-10 py-4 inline-flex items-center justify-center gap-2">Explore Projects</Link>
                </div>
                <p className="text-sm text-gray-500 mt-8">No credit card required • Free forever for basic features</p>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
