import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Zap, Crown, Rocket } from 'lucide-react';
import { TiltCard } from '../components/ui/TiltCard';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for getting started',
    color: 'from-gray-400 to-gray-500',
    features: [
      { text: 'Up to 5 active projects', included: true },
      { text: 'Basic profile', included: true },
      { text: 'Standard support', included: true },
      { text: '5% platform fee', included: true },
      { text: 'Priority listing', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Professional',
    icon: Crown,
    price: { monthly: 29, yearly: 290 },
    description: 'For serious freelancers',
    color: 'from-primary-400 to-primary-500',
    popular: true,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Enhanced profile', included: true },
      { text: 'Priority support', included: true },
      { text: '3% platform fee', included: true },
      { text: 'Priority listing', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Enterprise',
    icon: Rocket,
    price: { monthly: 99, yearly: 990 },
    description: 'For teams and agencies',
    color: 'from-secondary-500 to-secondary-600',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team management', included: true },
      { text: '24/7 phone support', included: true },
      { text: '1% platform fee', included: true },
      { text: 'Featured profile', included: true },
      { text: 'Custom analytics', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
  },
];

const faqs = [
  {
    question: 'How do fees work?',
    answer: 'Freelancers pay a small platform fee only when they get paid. Clients pay nothing extra. Our fees are among the lowest in the industry.',
  },
  {
    question: 'Can I switch plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any payments.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. No long-term contracts. Cancel anytime and you\'ll keep access until the end of your billing period.',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-primary-400' : 'bg-dark-200'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${annual ? 'left-8' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${annual ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-green-400 text-xs">Save 17%</span>
            </span>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <TiltCard key={plan.name} intensity={10}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card rounded-2xl p-8 relative ${plan.popular ? 'ring-2 ring-primary-400' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-400 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${annual ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-gray-500">/{annual ? 'year' : 'month'}</span>
                </div>
                
                <Link
                  to="/register"
                  className={`w-full py-3 rounded-xl font-semibold text-center block mb-6 transition-colors ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Get Started
                </Link>
                
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">FAQ</span>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
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
          <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-8">
            Our team is here to help. Reach out anytime.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
