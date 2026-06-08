import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

const testUsers = [
  {
    email: 'freelancer@demo.com',
    password: 'demo123',
    full_name: 'Sarah Chen',
    role: 'freelancer',
    bio: 'Full-stack developer specializing in React & Node.js. 8+ years building scalable web apps.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    hourly_rate: 85,
    location: 'San Francisco, CA',
    is_verified: true,
    avatar_style: { background: '#6C63FF', hair: '#1a1a2e', skin: '#fdbcb4', shirt: '#6C63FF', accessory: 'glasses' },
  },
  {
    email: 'client@demo.com',
    password: 'demo123',
    full_name: 'Michael Torres',
    role: 'client',
    bio: 'Tech startup founder looking for talented developers to build the future.',
    skills: [],
    hourly_rate: null,
    location: 'New York, NY',
    is_verified: true,
    avatar_style: { background: '#00D2FF', hair: '#4a3728', skin: '#f5d0a9', shirt: '#00D2FF', accessory: 'none' },
  },
  {
    email: 'designer@demo.com',
    password: 'demo123',
    full_name: 'Aria Nakamura',
    role: 'freelancer',
    bio: 'UI/UX Designer with 8+ years of experience creating beautiful, intuitive interfaces.',
    skills: ['Figma', 'UI/UX', 'Brand Design', 'Motion Graphics'],
    hourly_rate: 95,
    location: 'Tokyo, Japan',
    is_verified: true,
    avatar_style: { background: '#FF6584', hair: '#2d1810', skin: '#ffe0bd', shirt: '#FF6584', accessory: 'none' },
  },
];

async function seed() {
  console.log('Seeding test users...');

  for (const user of testUsers) {
    try {
      const passwordHash = await bcrypt.hash(user.password, 12);

      const existing = await sql`SELECT id FROM users WHERE email = ${user.email}`;

      if (existing.length === 0) {
        await sql`
          INSERT INTO users (email, password_hash, full_name, role, bio, skills, hourly_rate, location, is_verified, avatar_style)
          VALUES (${user.email}, ${passwordHash}, ${user.full_name}, ${user.role}, ${user.bio}, ${user.skills}, ${user.hourly_rate}, ${user.location}, ${user.is_verified}, ${JSON.stringify(user.avatar_style)}::jsonb)
        `;
        console.log(`Created user: ${user.full_name} (${user.role})`);
      } else {
        console.log(`User already exists: ${user.email}`);
      }
    } catch (error) {
      console.error(`Error creating ${user.full_name}:`, error.message);
    }
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seed();
