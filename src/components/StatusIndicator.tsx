import {useSelector} from 'react-redux';
import {selectBoard} from 'redux/selectors/board_selectors';
import {selectGameState} from 'redux/selectors/game_state_selectors';
import {
  GAME_STATE_IN_PROGRESS,
  GAME_STATE_LOSS,
  GAME_STATE_NEW_GAME,
  GAME_STATE_WIN,
} from 'types';

const StatusIndicator = () => {
  const gameState = useSelector(selectGameState);
  const {mineCount, flagCount} = useSelector(selectBoard);

  const getStatusMessage = () => {
    switch (gameState) {
      case GAME_STATE_NEW_GAME:
        return 'Click anywhere to start';
      case GAME_STATE_IN_PROGRESS:
        return `${flagCount}/${mineCount}`;
      case GAME_STATE_WIN:
        return 'You win!';
      case GAME_STATE_LOSS:
        return 'You lose!';
      default:
        return 'Something went wrong';
    }
  };

  return <p>{getStatusMessage()}</p>;
};

export default StatusIndicator;
