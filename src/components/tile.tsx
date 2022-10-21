import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GAME_STATE_SET_LOSS} from 'redux/actions';
import {selectBoard} from 'redux/selectors/board_selectors';
import {selectGameState} from 'redux/selectors/game_state_selectors';
import {
  selectTileFromPosition,
  selectTileIsSatisfied,
  selectTileNeighborsOpen,
} from 'redux/selectors/tile_selectors';
import {
  generateBoard,
  openTile,
  openTileRecursive,
  setTileFlag,
} from 'redux/slices/board_slice';
import {GAME_STATE_LOSS, GAME_STATE_NEW_GAME, ReduxState} from 'types';

import '../styles/tile.scss';

const Tile = ({x, y}: {x: number; y: number}) => {
  const dispatch = useDispatch();
  const {width, height} = useSelector(selectBoard);
  const gameState = useSelector(selectGameState);
  const {open, isMine, flagged, mineCount, flagCount} = useSelector(
    (state: ReduxState) => selectTileFromPosition(state, {x, y})
  );
  const satisfied = useSelector((state: ReduxState) =>
    selectTileIsSatisfied(state, {x, y})
  );
  const neighborsOpen = useSelector((state: ReduxState) =>
    selectTileNeighborsOpen(state, {x, y})
  );

  const overflagged = flagCount > mineCount && open;
  const gameNotLost = gameState !== GAME_STATE_LOSS;
  const clickableRecursive = open && satisfied && !neighborsOpen;
  const clickable = gameNotLost && !flagged && (clickableRecursive || !open);

  useEffect(() => {
    if (gameNotLost && isMine && open) {
      dispatch({type: GAME_STATE_SET_LOSS});
    }
  }, [gameNotLost, isMine, open]);

  const onClick = () => {
    if (clickable) {
      if (gameState === GAME_STATE_NEW_GAME) {
        dispatch(
          generateBoard({width, height, mineCount: 40, clickLocation: {x, y}})
        );
      }

      const openAction = open ? openTileRecursive : openTile;
      dispatch(openAction({x, y}));
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
      className={`tile-clickbox ${clickable ? 'tile-clickbox-clickable' : ''}
      }`}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <div
        className={`tile tile-${open ? 'open' : 'unopen'} ${
          isMine ? 'tile-mine' : ''
        } ${flagged ? 'tile-flagged' : ''}
        ${overflagged ? 'tile-overflagged' : ''}
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
