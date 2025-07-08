import { Game, IGame } from './game.model';
import { BullPgia } from './game.logic';

export const startGame = async (playerId: string): Promise<IGame> => {
  const secretCode = BullPgia.generateSecretCode();
  const newGame = new Game({ playerId, secretCode, attempts: [], status: 'in-progress', maxAttempts: 10 });
  return await newGame.save();
};

export const makeGuess = async (gameId: string, guess: number[]) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');
  if (game.status !== 'in-progress') throw new Error('Game already ended');

  const { bulls, pgias } = BullPgia.calculateBullsAndPgias(game.secretCode, guess);
  
  game.attempts.push({ guess, bulls, pgias, createdAt: new Date() });
  
  if (bulls ===  game.secretCode.length) {
    game.status = 'won';
    console.log('Congratulations! You won the game!');
    game.winner = true;
  } else if (game.attempts.length >= game.maxAttempts) {
    game.status = 'lost';
  }

  await game.save();

  return {
    bulls,
    pgias,
    remainingAttempts: game.maxAttempts - game.attempts.length,
    status: game.status,
  };
};

export const getGameStatus = async (gameId: string) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');
  return game;
};

export const endGame = async (gameId: string) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');
  game.status = 'ended';
  await game.save();
  return 'Game ended successfully';
};
