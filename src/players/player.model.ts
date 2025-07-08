import mongoose from 'mongoose';
export interface IPlayer {
    ts:mongoose.Types.ObjectId; 
    name: string;
    password: string;
    email: string;
    id: string; 
    totalGames: number;
    wins: number;
  }
  const playerSchema = new mongoose.Schema<IPlayer>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true, unique: true }, 
    totalGames: { type: Number, default: 0 },
    wins: { type: Number, default: 0 }
  });

  export const Player = mongoose.model<IPlayer>('Player', playerSchema);

  