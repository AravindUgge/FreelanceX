import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const avatarColors = [
  ['#6C63FF', '#8B5CF6'],
  ['#FF6584', '#F43F5E'],
  ['#00D2FF', '#06B6D4'],
  ['#00C853', '#10B981'],
  ['#FFD600', '#F59E0B'],
  ['#FF5252', '#EF4444'],
  ['#9C27B0', '#A855F7'],
  ['#3F51B5', '#6366F1'],
  ['#E91E63', '#EC4899'],
  ['#00BCD4', '#22D3EE'],
  ['#FF9800', '#F97316'],
  ['#795548', '#92400E'],
];

const maleNames = [
  'james','john','robert','michael','william','david','richard','joseph','thomas','christopher',
  'charles','daniel','matthew','anthony','mark','donald','steven','paul','andrew','joshua',
  'kenneth','kevin','brian','george','timothy','ronald','edward','jason','jeffrey','ryan',
  'jacob','gary','nicholas','eric','jonathan','stephen','larry','justin','scott','brandon',
  'benjamin','samuel','raymond','gregory','frank','alexander','patrick','jack','dennis','jerry',
  'tyler','aaron','jose','adam','nathan','henry','peter','zachary','harold','douglas',
  'aravind','rahul','vikram','arjun','vikash','suresh','ramesh','ganesh','mukesh','rakesh',
  'amit','sumit','rohit','mohit','ankit','deepak','manish','ashish','rajesh','dinesh',
  'priyank','kishan','gaurav','sachin','vinod','manoj','sanjay','ashok','raj','kumar',
];

const femaleNames = [
  'mary','patricia','jennifer','linda','barbara','elizabeth','susan','jessica','sarah','karen',
  'lisa','nancy','betty','margaret','sandra','ashley','dorothy','kimberly','emily','donna',
  'michelle','carol','amanda','melissa','deborah','stephanie','rebecca','sharon','laura','cynthia',
  'kathleen','amy','angela','shirley','anna','brenda','pamela','emma','nicole','helen',
  'samantha','katherine','christine','debra','rachel','carolyn','janet','catherine','maria','heather',
  'diane','ruth','julie','olivia','joyce','virginia','victoria','kelly','lauren','christina',
  'priya','pooja','neha','anjali','sunita','sita','rita','gita','nita','meena',
  'rekha','sushma','sudha','geeta','veena','divya','sapna','pallavi','deepa',
];

const detectGender = (name) => {
  const firstName = name.split(' ')[0].toLowerCase();
  if (maleNames.includes(firstName)) return 'male';
  if (femaleNames.includes(firstName)) return 'female';
  if (firstName.endsWith('a') || firstName.endsWith('i') || firstName.endsWith('eeta') ||
      firstName.endsWith('ita') || firstName.endsWith('ini') || firstName.endsWith('ya')) {
    return 'female';
  }
  return 'male';
};

const maleImages = [3,5,7,8,11,12,14,15,16,17,18,19,20,22,23,24,25,26,27,28,29,30,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];
const femaleImages = [1,2,4,6,9,10,13,21,31,61,62,63,64,65,66,67,68,69,70];

const getAvatarUrl = (name, size = 200) => {
  const h = hashString(name);
  const gender = detectGender(name);
  const images = gender === 'female' ? femaleImages : maleImages;
  const id = images[h % images.length];
  return `https://i.pravatar.cc/${size}?img=${id}`;
};

const FallbackAvatar = ({ name, size, colors }) => {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <linearGradient id={`grad-${name.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill={`url(#grad-${name.replace(/\s/g, '')})`} />
      <text x="50" y="50" textAnchor="middle" dy="0.35em" fill="white" fontSize="32" fontWeight="bold">
        {initials}
      </text>
    </svg>
  );
};

export const Avatar = ({ user, size = 80, smSize, lgSize, showStatus = false, className = '' }) => {
  const name = user?.full_name || user?.name || 'User';
  const role = user?.role || 'freelancer';
  const isOnline = user?.is_online;
  const [imgError, setImgError] = useState(false);
  const resolvedSize = lgSize || smSize || size;

  const colors = useMemo(() => {
    const h = hashString(name);
    return avatarColors[h % avatarColors.length];
  }, [name]);

  const avatarUrl = useMemo(() => getAvatarUrl(name, resolvedSize * 3), [name, resolvedSize]);
  const gender = useMemo(() => detectGender(name), [name]);
  const effectiveSize = lgSize || size;

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: effectiveSize, height: effectiveSize }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {imgError ? (
        <FallbackAvatar name={name} size={effectiveSize} colors={colors} />
      ) : (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}

      {/* Role badge */}
      <div className="absolute bottom-0 right-0 rounded-full bg-dark-400 p-0.5">
        {role === 'freelancer' ? (
          <div className="w-5 h-5 rounded-full bg-primary-400 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold font-mono">&lt;/&gt;</span>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full bg-secondary-500 flex items-center justify-center">
            <span className="text-white text-[10px]">💼</span>
          </div>
        )}
      </div>

      {/* Online status */}
      {showStatus && (
        <div className={`absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-dark-400 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}>
          {isOnline && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />}
        </div>
      )}
    </motion.div>
  );
};

export const AvatarGroup = ({ users = [], size = 40, max = 3 }) => {
  const visibleUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex -space-x-3">
      {visibleUsers.map((user, index) => (
        <motion.div
          key={user.id || index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{ zIndex: max - index }}
        >
          <Avatar user={user} size={size} className="ring-2 ring-dark-400" />
        </motion.div>
      ))}
      {remaining > 0 && (
        <div
          className="flex items-center justify-center rounded-full bg-primary-400 text-white font-semibold"
          style={{ width: size, height: size, fontSize: size * 0.35 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default Avatar;
