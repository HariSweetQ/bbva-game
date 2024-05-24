import { GameParams, Levels } from '../types/game';
import { SelectOption } from '../types/select';
declare class GameService {
	defaultLevel: string;
	matrix: number[];
	levels: Levels;
	levelOptions: SelectOption[];
	defaultParams: GameParams;
	/**
	 * Get shuffle matrix
	 */
	getShuffledMatrix(): number[];
	getGridData(): {
		valid: number;
		options: number[];
	};
	getLevelTimer(level?: string): number;
	getLevelPoints(level?: string): number;
}
export declare const gameSvc: GameService;
export {};
