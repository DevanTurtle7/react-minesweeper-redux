import {useDispatch, useSelector} from 'react-redux';
import {createEmptyBoard} from 'redux/actions/board_actions';
import {selectPreferences} from 'redux/selectors/preferences_selectors';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const {width, height} = useSelector(selectPreferences);

  const onClick = () => {
    console.log('new game');
    dispatch(
      createEmptyBoard({
        width,
        height,
      })
    );
  };

  return <button onClick={onClick}>New Game</button>;
};

export default NewGameButton;
