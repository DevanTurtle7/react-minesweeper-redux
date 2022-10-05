import Board from 'components/board';
import ResetButton from 'components/new_game_button';
import {useDispatch} from 'react-redux';
import {generateBoard} from 'redux/slices/board_slice';

const App = () => {
  const dispatch = useDispatch();
  dispatch(generateBoard({width: 20, height: 10, mineCount: 50}));

  return (
    <div className='App'>
      <Board />
      <ResetButton />
    </div>
  );
};

export default App;
