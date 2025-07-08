export class BullPgia {
    static generateSecretCode(length = 4): number[] {
        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const secretCode: number[] = [];
        while (secretCode.length < length) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            const digit = digits[randomIndex];
            if (!secretCode.includes(digit)) {
                secretCode.push(digit);
            }
        }
        return secretCode;
    }

    static calculateBullsAndPgias(secretCode: number[], guess: number[]): { bulls: number; pgias: number } {
        let bulls = 0;
        let pgias = 0;
        const secretCodeCopy = [...secretCode];
        const guessCopy = [...guess];

        // שלב 1: סופרים בולים (אותו ערך ואותו מיקום)
        for (let i = 0; i < secretCodeCopy.length; i++) {
            if (guessCopy[i] === secretCodeCopy[i]) {
                bulls++;
                secretCodeCopy[i] = 0; // מסמנים שכבר נספר
                guessCopy[i] = 0;
            }
        }

        // שלב 2: סופרים פגיעות (אותו ערך, מיקום שונה)
        for (let i = 0; i < guessCopy.length; i++) {
            if (guessCopy[i] !== 0) {
                const idx = secretCodeCopy.indexOf(guessCopy[i]);
                if (idx !== -1) {
                    pgias++;
                    secretCodeCopy[idx] = 0; // מסמנים שכבר נספר
                }
            }
        }

        return { bulls, pgias };
    }
}