import { IPlayer } from "../players/player.model";

export function validatePlayerData(data: IPlayer) {
    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
        throw new Error('Invalid email format');
    }
    if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }
}