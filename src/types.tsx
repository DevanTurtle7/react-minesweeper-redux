export interface Tile {
  open: boolean;
  isMine: boolean;
}

export type Row = Array<Tile>;

export type Board = Array<Row>;

export type GameState = 'NEW_GAME' | 'IN_PROGRESS' | 'WIN' | 'LOSS';
