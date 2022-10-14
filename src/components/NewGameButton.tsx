import {useDispatch, useSelector} from 'react-redux';
import {BOARD_CREATE_EMPTY} from 'redux/actions';
import {selectBoard} from 'redux/selectors/board_selectors';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const {width, height} = useSelector(selectBoard);

  const onClick = () => {
    dispatch({
      type: BOARD_CREATE_EMPTY,
      payload: {
        width,
        height,
      },
    });
  };

  return <button onClick={onClick}>New Game</button>;
};

export default NewGameButton;
