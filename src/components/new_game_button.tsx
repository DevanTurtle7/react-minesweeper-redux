import {useDispatch, useSelector} from 'react-redux';
import {selectBoard} from 'redux/selectors/board_selectors';
import {generateBoard} from 'redux/slices/board_slice';
import {setGameState} from 'redux/slices/game_state_slice';
import {GAME_STATE_NEW_GAME} from 'types';

const NewGameButton = () => {
  const dispatch = useDispatch();
  const {width, height} = useSelector(selectBoard);

  const onClick = () => {
    dispatch(generateBoard({width, height, mineCount: 0}));
    dispatch(setGameState({gameState: GAME_STATE_NEW_GAME}));
  };

  return <button onClick={onClick}>New Game</button>;
};

export default NewGameButton;
