import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText, DollarSign, Tag, Check, Loader2 } from 'lucide-react';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');

  const categories = [
    'Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science',
    'DevOps', 'Writing', 'Marketing', 'Video & Animation'
  ];

  const addSkill = (skill) => {
    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    navigate('/projects');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Create New Project</h1>
        <p className="text-gray-400 mb-8">Describe your project and find the perfect freelancer</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s ? 'bg-primary-400 text-white' : 'bg-dark-200 text-gray-500'}`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 rounded ${step > s ? 'bg-primary-400' : 'bg-dark-200'}`} />}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Build an E-commerce Platform" className="input-field text-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} placeholder="Describe your project in detail..." className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setForm({ ...form, category: cat })} className={`p-3 rounded-xl text-sm text-left transition-all ${form.category === cat ? 'bg-primary-400/20 text-primary-400 border border-primary-400/50' : 'bg-dark-200/50 text-gray-400 border border-transparent hover:border-white/10'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Budget ($)</label>
                  <input type="number" value={form.budgetMin} onChange={(e) => setForm({ ...form, budgetMin: e.target.value })} placeholder="1000" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Budget ($)</label>
                  <input type="number" value={form.budgetMax} onChange={(e) => setForm({ ...form, budgetMax: e.target.value })} placeholder="5000" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Required Skills</label>
                <div className="flex gap-2 mb-3">
                  <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput); } }} placeholder="Type a skill and press Enter" className="input-field flex-1" />
                  <button onClick={() => addSkill(skillInput)} className="btn-secondary px-4">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-primary-400/20 text-primary-400 rounded-lg text-sm flex items-center gap-2">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-white">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Review Your Project</h2>
              <div className="space-y-4">
                <div className="p-4 bg-dark-300/50 rounded-xl"><span className="text-gray-400 text-sm">Title</span><div className="text-white font-medium">{form.title || 'Not set'}</div></div>
                <div className="p-4 bg-dark-300/50 rounded-xl"><span className="text-gray-400 text-sm">Category</span><div className="text-white font-medium">{form.category || 'Not set'}</div></div>
                <div className="p-4 bg-dark-300/50 rounded-xl"><span className="text-gray-400 text-sm">Budget</span><div className="text-white font-medium">${form.budgetMin || '0'} - ${form.budgetMax || '0'}</div></div>
                <div className="p-4 bg-dark-300/50 rounded-xl"><span className="text-gray-400 text-sm">Skills</span><div className="flex flex-wrap gap-2 mt-2">{form.skills.map((s) => <span key={s} className="px-2 py-1 bg-primary-400/20 text-primary-400 text-xs rounded">{s}</span>)}</div></div>
              </div>
            </motion.div>
          )}
        </div>

{/* Navigation */}
<div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-6">
          {step > 1 ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />Back
            </motion.button>
          ) : <div />}
          {step < 3 ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(step + 1)} className="btn-primary flex items-center gap-2">
              Continue<ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={isSubmitting} className="btn-primary flex items-center gap-2">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Check className="w-4 h-4" />Publish Project</>}
            </motion.button>
          )}
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
