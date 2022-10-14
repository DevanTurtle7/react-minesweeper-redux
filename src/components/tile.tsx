import {useDispatch, useSelector} from 'react-redux';
import {selectBoard} from 'redux/selectors/board_selectors';
import {selectGameState} from 'redux/selectors/game_state_selectors';
import {
  selectTileFromPosition,
  selectTileIsSatisfied,
  selectTileNeighborsOpen,
} from 'redux/selectors/tile_selectors';
import {
  BoardState,
  generateBoard,
  openTile,
  openTileRecursive,
  setTileFlag,
} from 'redux/slices/board_slice';
import {setGameState} from 'redux/slices/game_state_slice';
import {GAME_STATE_IN_PROGRESS, GAME_STATE_NEW_GAME} from 'types';

const Tile = ({x, y}: {x: number; y: number}) => {
  const {width, height} = useSelector(selectBoard);
  const gameState = useSelector(selectGameState);
  const {open, isMine, flagged, mineCount, flagCount} = useSelector(
    (state: BoardState) => selectTileFromPosition(state, {x, y})
  );
  const satisfied = useSelector((state: BoardState) =>
    selectTileIsSatisfied(state, {x, y})
  );
  const neighborsOpen = useSelector((state: BoardState) =>
    selectTileNeighborsOpen(state, {x, y})
  );
  const dispatch = useDispatch();
  const overflagged = flagCount > mineCount && open;

  const onClick = () => {
    if (gameState === GAME_STATE_NEW_GAME) {
      dispatch(generateBoard({width, height, mineCount: 50}));
      dispatch(setGameState({gameState: GAME_STATE_IN_PROGRESS}));
    }

    if (!flagged) {
      dispatch(
        open && !overflagged
          ? openTileRecursive({
              x,
              y,
            })
          : openTile({
              x,
              y,
            })
      );
    }
  };

  const onRightClick = (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if (!open) {
      dispatch(setTileFlag({flagged: !flagged, x, y}));
    }
  };

  return (
    <div
      className={`tile-clickbox tile-clickbox-${
        !open || (satisfied && !neighborsOpen) ? 'clickable' : 'unclickable'
      }`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <div
        className={`tile tile-${open ? 'open' : 'unopen'} ${
          isMine && 'tile-mine'
        } ${flagged && 'tile-flagged'}
        ${overflagged && 'tile-overflagged'}
        `}
      >
        {!isMine && open && mineCount > 0 && (
          <p className='tile-label unselectable'>{mineCount}</p>
        )}
      </div>
    </div>
  );
};

export default Tile;
