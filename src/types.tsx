export interface Tile {
  open: boolean;
  isMine: boolean;
  flagged: boolean;
  x: number;
  y: number;
}

export type Row = Array<Tile>;

export type Board = Array<Row>;

export const GAME_STATE_NEW_GAME = 'NEW_GAME';
export const GAME_STATE_IN_PROGRESS = 'IN_PROGRESS';
export const GAME_STATE_WIN = 'WIN';
export const GAME_STATE_LOSS = 'LOSS';
export type GameState = 'NEW_GAME' | 'IN_PROGRESS' | 'WIN' | 'LOSS';
