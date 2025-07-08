import express from 'express';
import playerRouter from './players/player.controller';

const app = express();
app.use(express.json());

// זה התקין:
app.use('/api/players', playerRouter);

export { app };
