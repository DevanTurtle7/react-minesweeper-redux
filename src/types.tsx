export interface Tile {
  open: boolean;
  isMine: boolean;
}

export type Row = Array<Tile>;

export type Board = Array<Row>;
