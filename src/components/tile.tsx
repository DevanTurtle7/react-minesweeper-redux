import {useDispatch, useSelector} from 'react-redux';
import {getTileFromPosition} from 'redux/selectors/get_tile_from_position';
import {openTile} from 'redux/slices/board_slice';

const Tile = ({x, y}: {x: number; y: number}) => {
  const dispatch = useDispatch();
  const {open, isMine} = useSelector(getTileFromPosition({x, y}));

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
      />
    </div>
  );
};

export default Tile;
