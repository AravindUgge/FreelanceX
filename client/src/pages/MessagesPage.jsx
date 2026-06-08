import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Smile, Paperclip, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';

const conversations = [
  {
    id: 1,
    name: 'Michael Torres',
    role: 'client',
    lastMessage: 'Great progress on the dashboard! Can you also add the analytics charts?',
    time: '2m ago',
    unread: 2,
    is_online: true,
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    role: 'client',
    lastMessage: 'The design mockups look amazing. Let\'s proceed!',
    time: '1h ago',
    unread: 0,
    is_online: true,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'client',
    lastMessage: 'Invoice has been sent. Please review.',
    time: '3h ago',
    unread: 1,
    is_online: false,
  },
  {
    id: 4,
    name: 'Emma Johnson',
    role: 'client',
    lastMessage: 'Thanks for the quick turnaround!',
    time: '1d ago',
    unread: 0,
    is_online: false,
  },
];

const sampleMessages = [
  { id: 1, sender: 'them', content: 'Hey! How\'s the project going?', time: '10:30 AM' },
  { id: 2, sender: 'me', content: 'Going great! I\'ve finished the main dashboard components.', time: '10:32 AM' },
  { id: 3, sender: 'them', content: 'Awesome! Can you send me a preview?', time: '10:33 AM' },
  { id: 4, sender: 'me', content: 'Sure! I\'ll push the changes and send you a link in a few minutes.', time: '10:35 AM' },
  { id: 5, sender: 'them', content: 'Perfect. Also, could you add the analytics charts we discussed?', time: '10:40 AM' },
  { id: 6, sender: 'me', content: 'Absolutely! I\'ll include the revenue chart, user growth, and the conversion funnel.', time: '10:42 AM' },
  { id: 7, sender: 'them', content: 'Great progress on the dashboard! Can you also add the analytics charts?', time: '10:45 AM' },
];

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(sampleMessages);
  const [isMobileShowChat, setIsMobileShowChat] = useState(false);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'me', content: newMessage, time: 'Now' },
    ]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen pt-20 pb-4 px-4 sm:px-6 lg:px-8 w-full max-w-full">
      <div className="h-[calc(100vh-6rem)] glass-card rounded-2xl overflow-hidden flex max-w-7xl mx-auto">
        {/* Conversations List */}
        <div className={`${isMobileShowChat ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 border-r border-white/5`}>
          <div className="p-4 border-b border-white/5">
            <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-dark-200/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <motion.button
                key={conv.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                onClick={() => {
                  setSelectedConversation(conv);
                  setIsMobileShowChat(true);
                }}
                className={`w-full p-4 flex items-center gap-3 text-left transition-colors ${
                  selectedConversation?.id === conv.id ? 'bg-primary-400/10' : ''
                }`}
              >
                <Avatar user={conv} size={48} showStatus />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{conv.name}</span>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary-400 flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{conv.unread}</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${isMobileShowChat ? 'flex' : 'hidden md:flex'} flex-col flex-1`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMobileShowChat(false)}
                    className="md:hidden p-2 rounded-lg hover:bg-white/10"
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                  <Avatar user={selectedConversation} size={40} showStatus />
                  <div>
                    <div className="font-medium text-white">{selectedConversation.name}</div>
                    <div className="text-xs text-gray-400">
                      {selectedConversation.is_online ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'me'
                        ? 'bg-primary-400 text-white rounded-br-md'
                        : 'bg-dark-200 text-gray-200 rounded-bl-md'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/60' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-dark-200/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    className="p-3 rounded-xl bg-primary-400 text-white hover:bg-primary-500 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
