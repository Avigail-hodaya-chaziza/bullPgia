import mongoose, { Schema, Document } from 'mongoose';

interface IAttempt {
  guess: number[];
  bulls: number;
  pgias: number;
  createdAt: Date;
}

export interface IGame extends Document {
  playerId: mongoose.Types.ObjectId;
  secretCode: number[];
  attempts: IAttempt[];
  status: 'in-progress' | 'won' | 'lost' | 'ended';
  maxAttempts: number;
  winner: boolean;
  createdAt: Date;
}

const AttemptSchema = new Schema<IAttempt>({
  guess: { type: [Number], required: true },
  bulls: { type: Number, required: true },
  pgias: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const GameSchema = new Schema<IGame>({
  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  secretCode: { type: [Number], required: true },
  attempts: [AttemptSchema],
  status: { type: String, enum: ['in-progress', 'won', 'lost', 'ended'], default: 'in-progress' },
  maxAttempts: { type: Number, default: 10 },
  winner: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Game = mongoose.model<IGame>('Game', GameSchema);
const GameModel = mongoose.model('Game', GameSchema);
export default GameModel;
