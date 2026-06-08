import { Router } from 'express';
import sql from '../config/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category, search, status = 'open' } = req.query;
    let projects = await sql`
      SELECT p.*, u.full_name as client_name, u.avatar_url as client_avatar
      FROM projects p
      JOIN users u ON p.client_id = u.id
      WHERE p.status = ${status}
      ORDER BY p.created_at DESC
      LIMIT 20
    `;
    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [project] = await sql`
      SELECT p.*, u.full_name as client_name, u.avatar_url as client_avatar, u.rating as client_rating
      FROM projects p
      JOIN users u ON p.client_id = u.id
      WHERE p.id = ${req.params.id}
    `;
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const proposals = await sql`
      SELECT pr.*, u.full_name as freelancer_name, u.avatar_url as freelancer_avatar, u.rating as freelancer_rating
      FROM proposals pr
      JOIN users u ON pr.freelancer_id = u.id
      WHERE pr.project_id = ${req.params.id}
      ORDER BY pr.created_at DESC
    `;

    res.json({ project, proposals });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, category, budgetMin, budgetMax, deadline, skills } = req.body;
    const [project] = await sql`
      INSERT INTO projects (client_id, title, description, category, budget_min, budget_max, deadline, skills_required, status)
      VALUES (${req.user.id}, ${title}, ${description}, ${category}, ${budgetMin}, ${budgetMax}, ${deadline || null}, ${skills || []}, 'open')
      RETURNING *
    `;
    res.status(201).json({ project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/proposals', authenticateToken, async (req, res) => {
  try {
    const { coverLetter, bidAmount, deliveryDays } = req.body;
    const [proposal] = await sql`
      INSERT INTO proposals (project_id, freelancer_id, cover_letter, bid_amount, delivery_days)
      VALUES (${req.params.id}, ${req.user.id}, ${coverLetter}, ${bidAmount}, ${deliveryDays})
      RETURNING *
    `;
    res.status(201).json({ proposal });
  } catch (error) {
    console.error('Create proposal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
