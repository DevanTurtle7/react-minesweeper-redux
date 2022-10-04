import {State} from 'redux/slices/board_slice';

export const getTileFromPosition =
  ({x, y}: {x: number; y: number}) =>
  (store: State) => ({
    open: store.board[y][x].open,
    isMine: store.board[y][x].isMine,
  });
