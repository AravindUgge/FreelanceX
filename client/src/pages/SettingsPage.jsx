import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Palette, CreditCard, Trash2, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="glass-card rounded-2xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-400/20 text-primary-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-6"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">First Name</label>
                      <input type="text" defaultValue={user?.full_name?.split(' ')[0]} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                      <input type="text" defaultValue={user?.full_name?.split(' ')[1]} className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email</label>
                    <input type="email" defaultValue={user?.email} className="input-field" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Bio</label>
                    <textarea rows={4} className="input-field resize-none" defaultValue="Full-stack developer passionate about building amazing products." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Location</label>
                      <input type="text" placeholder="San Francisco, CA" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hourly Rate ($)</label>
                      <input type="number" placeholder="85" className="input-field" />
                    </div>
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary">
                    Save Changes
                  </motion.button>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} className="input-field pr-12" placeholder="Enter current password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                    <input type="password" className="input-field" placeholder="Enter new password" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                    <input type="password" className="input-field" placeholder="Confirm new password" />
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary">
                    Update Password
                  </motion.button>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-dark-200/50 rounded-xl">
                      <div>
                        <div className="text-white font-medium">Authenticator App</div>
                        <div className="text-sm text-gray-400">Use an authenticator app to generate one-time codes</div>
                      </div>
                      <button className="btn-secondary text-sm py-2 px-4">Enable</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
                  
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                    { key: 'sms', label: 'SMS Notifications', desc: 'Receive text messages for urgent alerts' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-dark-200/50 rounded-xl">
                      <div>
                        <div className="text-white font-medium">{item.label}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-primary-400' : 'bg-dark-300'}`}
                      >
                        <motion.div
                          animate={{ x: notifications[item.key] ? 24 : 2 }}
                          className="w-5 h-5 bg-white rounded-full shadow"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Appearance</h2>
                  
                  <div className="flex items-center justify-between p-4 bg-dark-200/50 rounded-xl">
                    <div>
                      <div className="text-white font-medium">Dark Mode</div>
                      <div className="text-sm text-gray-400">Toggle between light and dark themes</div>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary-400' : 'bg-dark-300'}`}
                    >
                      <motion.div
                        animate={{ x: darkMode ? 24 : 2 }}
                        className="w-5 h-5 bg-white rounded-full shadow"
                      />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-3">Accent Color</h3>
                    <div className="flex gap-3">
                      {['#6C63FF', '#FF6584', '#00D2FF', '#00C853', '#FFD600'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-full border-2 border-transparent hover:border-white/50 transition-colors"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Billing & Payments</h2>
                  
                  <div className="p-4 bg-gradient-to-r from-primary-400/20 to-secondary-500/20 rounded-xl">
                    <div className="text-sm text-gray-400">Available Balance</div>
                    <div className="text-3xl font-bold text-white">$2,450.00</div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary flex-1">
                      Withdraw Funds
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary flex-1">
                      View History
                    </motion.button>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
                    <div className="p-4 bg-dark-200/50 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <div className="text-white font-medium">•••• 4242</div>
                          <div className="text-sm text-gray-400">Expires 12/28</div>
                        </div>
                      </div>
                      <button className="text-primary-400 text-sm hover:underline">Edit</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Danger Zone */}
            {activeTab === 'profile' && (
              <div className="mt-6 glass-card rounded-2xl p-6 border border-red-500/20">
                <h3 className="text-lg font-medium text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
