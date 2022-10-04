import {Board} from '@root/types';

interface Store {
  board: Board;
}

export const getTileFromPosition =
  ({x, y}: {x: number; y: number}) =>
  (store: Store) => ({
    open: store.board[y][x].open,
    isMine: store.board[y][x].isMine,
  });
