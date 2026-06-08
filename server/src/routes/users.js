import { Router } from 'express';
import sql from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/freelancers', async (req, res) => {
  try {
    const freelancers = await sql`
      SELECT id, full_name, avatar_url, bio, skills, hourly_rate, rating, location, is_online
      FROM users WHERE role = 'freelancer' AND is_verified = true
      ORDER BY rating DESC
      LIMIT 20
    `;
    res.json({ freelancers });
  } catch (error) {
    console.error('Get freelancers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [user] = await sql`
      SELECT id, full_name, avatar_url, role, bio, skills, hourly_rate, rating, location, is_verified, is_online, created_at
      FROM users WHERE id = ${req.params.id}
    `;
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
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
      RETURNING id, full_name, avatar_url, role, bio, skills, hourly_rate, rating, location, is_verified
    `;
    res.json({ user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
