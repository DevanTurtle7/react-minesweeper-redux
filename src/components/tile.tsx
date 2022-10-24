import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {gameStateSetLoss} from 'redux/actions/game_state_actions';
import {selectGameState} from 'redux/selectors/game_state_selectors';
import {selectPreferences} from 'redux/selectors/preferences_selectors';
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
  const {
    width,
    height,
    mineCount: mineCountPreference,
  } = useSelector(selectPreferences);

  const overflagged = flagCount > mineCount && open;
  const gameNotLost = gameState !== GAME_STATE_LOSS;
  const clickableRecursive = open && satisfied && !neighborsOpen;
  const clickable = gameNotLost && !flagged && (clickableRecursive || !open);

  useEffect(() => {
    if (gameNotLost && isMine && open) {
      dispatch(gameStateSetLoss());
    }
  }, [gameNotLost, isMine, open]);

  const onClick = () => {
    if (clickable) {
      if (gameState === GAME_STATE_NEW_GAME) {
        dispatch(
          generateBoard({
            width,
            height,
            mineCount: mineCountPreference,
            clickLocation: {x, y},
          })
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

  const getClassNames = ({prefix}: {prefix: string}): string => {
    let classNames = prefix;

    classNames += ` ${prefix}-${open ? 'open' : 'unopen'}`;

    if (open && isMine) {
      classNames += ` ${prefix}-mine`;
    }

    if (flagged) {
      classNames += ` ${prefix}-flagged`;
    }

    if (overflagged) {
      classNames += ` ${prefix}-overflagged`;
    }

    return classNames ?? '';
  };

  return (
    <div
      className={getClassNames({prefix: 'tile-clickbox'})}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      <div className={getClassNames({prefix: 'tile'})}>
        {!isMine && open && mineCount > 0 && (
          <p className='tile-label unselectable'>{mineCount}</p>
        )}
      </div>
    </div>
  );
};

export default Tile;
