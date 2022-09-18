import React from 'react';
import {useDispatch} from 'react-redux';
import {openTile} from 'redux/slices/board_slice';

const Tile = ({x, y}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(
      openTile({
        x,
        y,
      })
    );
  };

  return <div className='tile' onClick={onClick}></div>;
};

export default Tile;
