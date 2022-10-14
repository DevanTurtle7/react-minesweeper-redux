import {useDispatch, useSelector} from 'react-redux';
import {
  selectTileFromPosition,
  selectTileIsSatisfied,
  selectTileNeighborsOpen,
} from 'redux/selectors/tile_selectors';
import {
  BoardState,
  openTile,
  openTileRecursive,
  setTileFlag,
} from 'redux/slices/board_slice';

const Tile = ({x, y}: {x: number; y: number}) => {
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
        {!isMine && open && (
          <p className='tile-label unselectable'>{mineCount}</p>
        )}
      </div>
    </div>
  );
};

export default Tile;
