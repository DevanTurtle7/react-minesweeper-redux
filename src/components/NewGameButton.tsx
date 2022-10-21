import {useDispatch, useSelector} from 'react-redux';
import {BOARD_CREATE_EMPTY} from 'redux/actions';
import {selectPreferences} from 'redux/selectors/preferences_selectors';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const {width, height} = useSelector(selectPreferences);

  const onClick = () => {
    console.log('new game');
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
