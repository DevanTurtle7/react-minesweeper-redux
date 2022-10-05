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
} from 'redux/slices/board_slice';

const Tile = ({x, y}: {x: number; y: number}) => {
  const dispatch = useDispatch();
  const {open, isMine} = useSelector((state: BoardState) =>
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
  };

  return (
    <div
      className={`tile-clickbox tile-clickbox-${
        !open || (satisfied && !neighborsOpen) ? 'clickable' : 'unclickable'
      }`}
      onClick={onClick}
    >
      <div
        className={`tile tile-${open ? 'open' : 'unopen'} ${
          isMine ? 'tile-mine' : ''
        }`}
      >
        {!isMine && <p className='tile-label'>{count}</p>}
      </div>
    </div>
  );
};

export default Tile;
