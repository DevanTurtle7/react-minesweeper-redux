import {useDispatch, useSelector} from 'react-redux';
import {selectBoard} from 'redux/selectors/board_selectors';
import {generateBoard} from 'redux/slices/board_slice';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const {width, height} = useSelector(selectBoard);

  const onClick = () => {
    dispatch(generateBoard({width, height, mineCount: 0}));
  };

  return <button onClick={onClick}>New Game</button>;
};

export default NewGameButton;
