export const getTileFromPosition =
  ({x, y}) =>
  (store) => ({
    open: store.board[y][x].open,
    isMine: store.board[y][x].isMine,
  });
