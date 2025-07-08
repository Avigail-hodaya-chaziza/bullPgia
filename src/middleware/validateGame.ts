import { Request, Response, NextFunction } from 'express';

export function validateGuess(req: Request, res: Response, next: NextFunction) {
  const guess = req.body.guess;
  
  if (!Array.isArray(guess)) {
    return res.status(400).json({ message: 'Guess must be an array' });
  }

  if (guess.length !== 4) {
    return res.status(400).json({ message: 'Guess must have 4 numbers' });
  }

  // בדיקה שאין כפילויות
  const uniqueNumbers = new Set(guess);
  if (uniqueNumbers.size !== guess.length) {
    return res.status(400).json({ message: 'Guess cannot contain duplicate numbers' });
  }

  // בדיקת טווח המספרים (1-9)
  if (guess.some(num => typeof num !== 'number' || num < 1 || num > 9)) {
    return res.status(400).json({ message: 'Numbers must be between 1 and 9' });
  }

  next();
}
