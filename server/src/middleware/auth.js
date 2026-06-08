import jwt from 'jsonwebtoken';
import sql from '../config/db.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const [user] = await sql`
      SELECT id, email, full_name, role, avatar_url, avatar_style, bio, skills, hourly_rate, rating, is_verified, is_online
      FROM users WHERE id = ${decoded.userId}
    `;

    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [user] = await sql`
        SELECT id, email, full_name, role, avatar_url, avatar_style, bio, skills, hourly_rate, rating, is_verified, is_online
        FROM users WHERE id = ${decoded.userId}
      `;
      req.user = user;
    }
  } catch (error) {
    // Continue without auth
  }
  next();
};

export const generateTokens = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return { token, refreshToken };
};
