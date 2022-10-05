import {useDispatch, useSelector} from 'react-redux';
import {
  getTileFromPosition,
  getTileMineCount,
  getTileNeighborsOpen,
  getTileSatisfied,
} from 'redux/selectors/tile_selectors';
import {
  BoardState,
  openTile,
  openTileRecursive,
  setTileFlag,
} from 'redux/slices/board_slice';

const Tile = ({x, y}: {x: number; y: number}) => {
  const dispatch = useDispatch();
  const {open, isMine, flagged} = useSelector((state: BoardState) =>
    getTileFromPosition(state, {x, y})
  );
  const count = useSelector((state: BoardState) =>
    getTileMineCount(state, {x, y})
  );
  const satisfied = useSelector((state: BoardState) =>
    getTileSatisfied(state, {x, y})
  );
  const neighborsOpen = useSelector((state: BoardState) =>
    getTileNeighborsOpen(state, {x, y})
  );

  const onClick = () => {
    if (!flagged) {
      dispatch(
        open
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

  console.log(flagged);

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
          isMine ? 'tile-mine' : ''
        } ${flagged ? 'tile-flagged' : ''}`}
      >
        {!isMine && <p className='tile-label'>{count}</p>}
      </div>
    </div>
  );
};

export default Tile;
