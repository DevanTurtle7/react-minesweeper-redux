import React from 'react';
import {useDispatch} from 'react-redux';

const Tile = (props) => {
  const dispatch = useDispatch();

  const onClick = () => {};

  return <div className='tile' onClick={onClick}></div>;
};

export default Tile;
