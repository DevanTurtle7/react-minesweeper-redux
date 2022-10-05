import {useDispatch, useSelector} from 'react-redux';
import {
  getTileFromPosition,
  getTileMineCount,
} from 'redux/selectors/tile_selectors';
import {BoardState, openTile} from 'redux/slices/board_slice';

const Tile = ({x, y}: {x: number; y: number}) => {
  const dispatch = useDispatch();
  const {open, isMine} = useSelector((state: BoardState) =>
    getTileFromPosition(state, {x, y})
  );
  const count = useSelector((state: BoardState) =>
    getTileMineCount(state, {x, y})
  );

  const onClick = () => {
    dispatch(
      openTile({
        x,
        y,
      })
    );
  };

  return (
    <div
      className={`tile-clickbox tile-clickbox-${
        !open ? 'clickable' : 'unclickable'
      }`}
      onClick={onClick}
    >
      <div
        className={`tile tile-${open ? 'open' : 'unopen'} ${
          isMine ? 'tile-mine' : ''
        }`}
      >
        <p>{count}</p>
      </div>
    </div>
  );
};

export default Tile;
