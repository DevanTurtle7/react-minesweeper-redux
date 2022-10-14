import Board from 'components/Board';
import ResetButton from 'components/NewGameButton';
import {useDispatch} from 'react-redux';
import {BOARD_CREATE_EMPTY} from 'redux/slices/board_slice';

const App = () => {
  const dispatch = useDispatch();
  dispatch({
    type: BOARD_CREATE_EMPTY,
    payload: {width: 20, height: 10},
  });

  return (
    <div className='App'>
      <Board />
      <ResetButton />
    </div>
  );
};

export default App;
