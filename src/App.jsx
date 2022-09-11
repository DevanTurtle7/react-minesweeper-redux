import Tile from './components/tile';
import {useDispatch} from 'react-redux';
import {generateBoard} from './redux/slices/board_slice';

function App() {
  const dispatch = useDispatch();

  dispatch(generateBoard({width: 20, height: 20}));

  return (
    <div className='App'>
      <Tile />
    </div>
  );
}

export default App;
