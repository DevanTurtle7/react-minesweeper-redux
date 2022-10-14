import {createSlice} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {BOARD_CREATE_EMPTY, GAME_STATE_SET_LOSS} from 'redux/actions';
import {getSurroundingTiles} from 'redux/selectors/tile_selectors';
import {Board} from '../../types';

export interface BoardState {
  board: BoardSlice;
}

export interface BoardSlice {
  board: Board;
  height: number;
  width: number;
  mineCount: number;
}

const initialState: BoardSlice = {
  board: [],
  height: 0,
  width: 0,
  mineCount: 0,
};

const openTileRec = ({
  board,
  height,
  width,
  x,
  y,
}: {
  board: Board;
  height: number;
  width: number;
  x: number;
  y: number;
}) => {
  board[y][x].open = true;

  const neighbors = getSurroundingTiles({board, height, width, x, y});
  const mineCount = neighbors.reduce(
    (count, tile) => (tile.isMine ? count + 1 : count),
    0
  );
  const flagCount = neighbors.reduce(
    (count, tile) => (tile.flagged ? count + 1 : count),
    0
  );
  const satisfied = flagCount === mineCount;

  if (satisfied) {
    neighbors.forEach((tile) => {
      if (!tile.open && !tile.flagged) {
        openTileRec({board, height, width, x: tile.x, y: tile.y});
      }
    });
  }
};

const createBoard = ({
  height,
  width,
  mineCount,
}: {
  height: number;
  width: number;
  mineCount: number;
}) => {
  let minesPlaced = 0;
  const mineLocations = new Set();
  const board: Board = [];

  while (minesPlaced < mineCount) {
    const y = Math.floor(Math.random() * height);
    const x = Math.floor(Math.random() * width);
    const key = y * width + x;

    if (!mineLocations.has(key)) {
      mineLocations.add(key);
      minesPlaced++;
    }
  }

  for (let y = 0; y < height; y++) {
    board.push([]);
    for (let x = 0; x < width; x++) {
      const key = y * width + x;

      board[y].push({
        open: false,
        isMine: mineLocations.has(key),
        flagged: false,
        x,
        y,
      });
    }
  }

  return {
    board: board,
    height,
    width,
    mineCount,
  };
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    generateBoard: (state, {payload}) => {
      // TODO: Add another generate board reducer for first move. Add ignore tiles
      return createBoard(payload);
    },
    openTile: ({board}, {payload: {x, y}}) => {
      board[y][x].open = true;
    },
    openTileRecursive: ({board, height, width}, {payload: {x, y}}) => {
      openTileRec({board, height, width, x, y});
    },
    setTileFlag: ({board}, {payload: {flagged, x, y}}) => {
      board[y][x].flagged = flagged;
    },
  },
  extraReducers: {
    [BOARD_CREATE_EMPTY]: (state, {payload: {height, width}}) => {
      return createBoard({height, width, mineCount: 0});
    },
    [GAME_STATE_SET_LOSS]: (state) => {
      state.board.forEach((row) =>
        row.forEach((tile) => {
          tile.flagged = false;
          tile.open = true;
        })
      );
      return state;
    },
  },
});

const {actions, reducer: board_reducers} = boardSlice;
export const {generateBoard, openTile, openTileRecursive, setTileFlag} =
  actions;
export default board_reducers;
