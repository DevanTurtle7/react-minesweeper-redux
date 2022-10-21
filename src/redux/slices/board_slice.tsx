import {createSlice} from '@reduxjs/toolkit';
import {BOARD_CREATE_EMPTY} from 'redux/actions/board_actions';
import {
  GAME_STATE_SET_LOSS,
  GAME_STATE_SET_WIN,
} from 'redux/actions/game_state_actions';
import {selectSurroundingTiles} from 'redux/selectors/tile_selectors';
import {Board, Coordinate} from '../../types';

export interface BoardState {
  board: Board;
  height: number;
  width: number;
  mineCount: number;
}

const initialState: BoardState = {
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

  const neighbors = selectSurroundingTiles({board, height, width, x, y});
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
  ignore,
}: {
  height: number;
  width: number;
  mineCount: number;
  ignore?: Array<Coordinate>;
}) => {
  let minesPlaced = 0;
  const mineLocations = new Set();
  const board: Board = [];

  while (minesPlaced < mineCount) {
    const y = Math.floor(Math.random() * height);
    const x = Math.floor(Math.random() * width);
    const key = y * width + x;

    if (
      !mineLocations.has(key) &&
      ignore?.every((coordinate) => !(coordinate.x === x && coordinate.y === y))
    ) {
      mineLocations.add(key);
      minesPlaced++;
    }
  }

  for (let y = 0; y < height; y++) {
    board.push([]);
    for (let x = 0; x < width; x++) {
      const key = y * width + x;

      board[y].push({
        open:
          ignore?.some(
            (coordinate) => coordinate.x === x && coordinate.y === y
          ) ?? false,
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
    generateBoard: (
      state,
      {payload: {height, width, mineCount, clickLocation}}
    ) => {
      const ignore = [];

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const currentX = clickLocation.x + x;
          const currentY = clickLocation.y + y;

          if (
            currentX >= 0 &&
            currentX < width &&
            currentY >= 0 &&
            currentY < height
          ) {
            ignore.push({
              x: currentX,
              y: currentY,
            });
          }
        }
      }

      const result = createBoard({height, width, mineCount, ignore});
      const {board} = result;

      ignore.forEach(({x, y}) => {
        openTileRec({
          board,
          height,
          width,
          x,
          y,
        });
      });

      return result;
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
    [GAME_STATE_SET_WIN]: (state) => {
      state.board.forEach((row) =>
        row.forEach((tile) => {
          tile.flagged = tile.isMine;
          tile.open = !tile.isMine;
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
