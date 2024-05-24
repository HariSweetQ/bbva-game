export type Levels = {
	[key: string]: Level;
};
export type Level = {
	value: string;
	label: string;
	seconds: number;
	points: number;
};

export type GameParams = {
	points: number;
};
