export interface Tile {
  open: boolean;
  isMine: boolean;
  flagged: boolean;
  x: number;
  y: number;
}

export type Row = Array<Tile>;

export type Board = Array<Row>;

export type GameState = 'NEW_GAME' | 'IN_PROGRESS' | 'WIN' | 'LOSS';
