import bcrypt from 'bcryptjs';
import sql from '../config/db.js';
import { generateTokens } from '../middleware/auth.js';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  role: z.enum(['client', 'freelancer'])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const register = async (req, res) => {
  try {
    const { email, password, fullName, role } = registerSchema.parse(req.body);

    const [existingUser] = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    
    const avatarStyles = {
      freelancer: {
        background: '#6C63FF',
        hair: '#1a1a2e',
        skin: '#fdbcb4',
        shirt: '#FF6584',
        accessory: 'glasses'
      },
      client: {
        background: '#00D2FF',
        hair: '#4a3728',
        skin: '#f5d0a9',
        shirt: '#00C853',
        accessory: 'none'
      }
    };

    const [user] = await sql`
      INSERT INTO users (email, password_hash, full_name, role, avatar_style)
      VALUES (${email}, ${passwordHash}, ${fullName}, ${role}, ${JSON.stringify(avatarStyles[role])})
      RETURNING id, email, full_name, role, avatar_url, avatar_style
    `;

    const { token, refreshToken } = generateTokens(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const [user] = await sql`
      SELECT id, email, password_hash, full_name, role, avatar_url, avatar_style, bio, skills, hourly_rate, rating, is_verified
      FROM users WHERE email = ${email}
    `;

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const { token, refreshToken } = generateTokens(user.id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const googleCallback = async (req, res) => {
  try {
    const { id: googleId, displayName, emails, photos } = req.user;
    const email = emails[0].value;
    const avatarUrl = photos?.[0]?.value;

    let [existingUser] = await sql`SELECT * FROM users WHERE google_id = ${googleId} OR email = ${email}`;

    if (existingUser) {
      if (!existingUser.google_id) {
        [existingUser] = await sql`
          UPDATE users SET google_id = ${googleId}, avatar_url = COALESCE(${avatarUrl}, avatar_url)
          WHERE email = ${email}
          RETURNING *
        `;
      }
    } else {
      const role = Math.random() > 0.5 ? 'freelancer' : 'client';
      const avatarStyles = {
        freelancer: {
          background: '#6C63FF',
          hair: '#1a1a2e',
          skin: '#fdbcb4',
          shirt: '#FF6584',
          accessory: 'glasses'
        },
        client: {
          background: '#00D2FF',
          hair: '#4a3728',
          skin: '#f5d0a9',
          shirt: '#00C853',
          accessory: 'none'
        }
      };

      [existingUser] = await sql`
        INSERT INTO users (email, full_name, google_id, avatar_url, role, is_verified, avatar_style)
        VALUES (${email}, ${displayName}, ${googleId}, ${avatarUrl}, ${role}, true, ${JSON.stringify(avatarStyles[role])})
        RETURNING *
      `;
    }

    const { token, refreshToken } = generateTokens(existingUser.id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
  try {
    const [user] = await sql`
      SELECT id, email, full_name, role, avatar_url, avatar_style, bio, skills, hourly_rate, rating, total_earnings, total_spent, is_verified, is_online, created_at
      FROM users WHERE id = ${req.user.id}
    `;
    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, skills, hourlyRate, location } = req.body;

    const [user] = await sql`
      UPDATE users SET
        full_name = COALESCE(${fullName}, full_name),
        bio = COALESCE(${bio}, bio),
        skills = COALESCE(${skills}, skills),
        hourly_rate = COALESCE(${hourlyRate}, hourly_rate),
        location = COALESCE(${location}, location),
        updated_at = NOW()
      WHERE id = ${req.user.id}
      RETURNING id, email, full_name, role, avatar_url, avatar_style, bio, skills, hourly_rate, rating, is_verified
    `;

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
