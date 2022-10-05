import {useDispatch, useSelector} from 'react-redux';
import {useBoard} from 'redux/selectors/board_selectors';
import {generateBoard} from 'redux/slices/board_slice';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const {width, height, mineCount} = useSelector(useBoard);

  const onClick = () => {
    dispatch(generateBoard({width, height, mineCount}));
  };

  return <button onClick={onClick}>New Game</button>;
};

export default NewGameButton;
