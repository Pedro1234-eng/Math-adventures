
import { ClassLevel, Operation, GameMode } from './types';

export const CLASS_LEVELS = [
    { id: ClassLevel.P1, title: 'Primary 1' },
    { id: ClassLevel.P2, title: 'Primary 2' },
    { id: ClassLevel.P3, title: 'Primary 3' },
    { id: ClassLevel.P4, title: 'Primary 4' },
    { id: ClassLevel.P5, title: 'Primary 5' },
    { id: ClassLevel.P6, title: 'Primary 6' },
];

export const OPERATIONS = [
    { id: Operation.Addition, title: 'Addition (+)' },
    { id: Operation.Subtraction, title: 'Subtraction (-)' },
    { id: Operation.Multiplication, title: 'Multiplication (×)' },
    { id: Operation.Division, title: 'Division (÷)' },
    { id: Operation.Mixed, title: 'Mixed' },
];

export const GAME_MODES = [
    { id: GameMode.TreasureHunt, title: 'Treasure Hunt', description: "Solve problems to find the treasure." },
    { id: GameMode.BalloonPop, title: 'Balloon Pop', description: "Pop the balloon with the correct answer." },
    { id: GameMode.MathRace, title: 'Math Race', description: "Answer quickly to win the race. (Coming Soon!)" },
    { id: GameMode.MathNinja, title: 'Math Ninja', description: "Slice the correct number answers. (Coming Soon!)" },
];

export const ROUNDS = [5, 10, 15];
