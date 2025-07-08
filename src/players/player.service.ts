import { Player, IPlayer } from './player.model';
import { validatePlayerData } from '../middleware/validateParameters';
// יצירת שחקן חדש במסד
export const addPlayer = async (data: IPlayer) => {
    const existingPlayer = await Player.findOne({ id: data.id, name: data.name, email: data.email, password: data.password });
    if (existingPlayer) {
        throw new Error('Player already exists with this name');
    }
    validatePlayerData(data);
    const player = new Player(data);
    return await player.save();
};

// עדכון שחקן לפי מזהה
export const updatePlayer = async (id: string, data: Partial<IPlayer>) => {
    const player = await Player.findOne({ id });
    if (!player) {
        throw new Error('Player not found');
    }
    const updatedData = { ...player.toObject(), ...data };
    validatePlayerData(updatedData);
    return await Player.findOneAndUpdate({ id }, data, { new: true });
};

export const deletePlayer = async (id: string, password: string) => {
    const player = await Player.findOne({ id });
    if (!player || player.password !== password) {
        throw new Error('Invalid password or player not found');
    }
    return await Player.findOneAndDelete({ id });
};

// חיפוש שחקן לפי מזהה
export const searchPlayerById = async (id: string) => {
    const player = await Player.findOne({ id });
    if (!player) {
        throw new Error('Player not found');
    }
    return player;
};
