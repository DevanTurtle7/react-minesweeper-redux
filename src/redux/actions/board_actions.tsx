export const BOARD_CREATE_EMPTY = 'board/createEmpty';
export const BOARD_GENERATE = 'board/generateBoard';
export const BOARD_OPEN_TILE = 'board/openTile';
export const BOARD_OPEN_RECURSIVE = 'board/openTileRecursive';

export const createEmptyBoard = (payload: {height: number; width: number}) => ({
  type: BOARD_CREATE_EMPTY,
  payload,
});
