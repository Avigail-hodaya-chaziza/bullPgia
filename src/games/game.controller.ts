import { validateGuess } from '../middleware/validateGame';
import express from 'express';
import { Request, Response } from 'express';
import { startGame, makeGuess, getGameStatus, endGame } from './game.service';
import { addPlayer } from '../players/player.service';
import { Player } from '../players/player.model';



const router = express.Router();
router.post('/start', async (req: Request, res: Response) => {
    try {
        let player = await Player.findOne({ id: req.body.id });
        if (!player) {
            player = await addPlayer(req.body);
        }
        const game = await startGame(player._id.toString());
        res.status(201).json({ gameId: game._id });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

router.post('/:gameId/guess', async (req: Request, res: Response) => {
    validateGuess(req, res, () => { });
    try {
        const { gameId } = req.params;
        const { guess } = req.body;
        const result = await makeGuess(gameId, guess);
        res.json(result);
        return;
    } catch (error: any) {
        res.status(400).json({ message: error.message });
        return;
    }
});



router.get('/:gameId', async (req: Request, res: Response) => {
    try {
        const { gameId } = req.params;
        const game = await getGameStatus(gameId);
        res.json(game);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:gameId/end', async (req: Request, res: Response) => {
    try {
        const { gameId } = req.params;
        const message = await endGame(gameId);
        res.json({ message });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;




