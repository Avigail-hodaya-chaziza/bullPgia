
import express, { Request, Response } from 'express';
import { addPlayer, updatePlayer, deletePlayer, searchPlayerById } from './player.service';
import GameModel from '../games/game.model';

const router = express.Router();

// POST /api/players/addPlayer
router.post('/addPlayer', async (req: Request, res: Response) => {
  try {
    const player = await addPlayer(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add player' });
  }
});
// PUT /api/players/updatePlayer/:id
router.put('/updatePlayer/:id', async (req: Request, res: Response) => {
  try {
    const player = await updatePlayer(req.params.id, req.body);
    res.status(200).json(player);
  } catch (error: any) {
    console.error(error); // הוספת לוג
    res.status(500).json({ message: error.message || 'Failed to update player' });
  }
});

// DELETE /api/players/deletePlayer/:id/:password
router.delete('/deletePlayer/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const player = await deletePlayer(id, password);

    res.status(200).json(player);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/players/searchPlayer/:id
router.get('/searchPlayer/:id', async (req: Request, res: Response) => {
  try {
    const player = await searchPlayerById(req.params.id);
    res.status(200).json(player.name);
  } catch (error: any) {
              console.error(error); 
    res.status(405).json({ message: error.message });
  }
});
// ייבוא מודל המשחק

// GET /api/players/:playerid/recent
router.get('/:playerid/recent', async (req: Request, res: Response) => {
  try {
    const { playerid } = req.params;
    const games = await GameModel.find({ playerId: playerid }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
// GET /api/players/leaderboard
router.get('/leaderboard', async (req: Request, res: Response) => {
  try {
    const games = await GameModel.find({ winner: true })
      .sort({ createdAt: 1 }) // מיון לפי זמן יצירת המשחק
      .limit(10); // הגבלת התוצאות ל-10
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
export default router;

