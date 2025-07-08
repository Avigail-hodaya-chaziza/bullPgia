import express from 'express';
import connectToDatabase from './db/connection';
import playerRouter from './players/player.controller';
import gameRouter from './games/game.controller';

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase(); // התחברות ל-MongoDB

app.use(express.json()); // תמיכה ב-JSON בבקשות
app.use('/api/players', playerRouter); // חיבור הראוטר של השחקנים
app.use('/api/games', gameRouter); // חיבור הראוטר של המשחקים

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});