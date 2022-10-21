import Board from 'components/Board';
import ResetButton from 'components/NewGameButton';
import Settings from 'components/Settings';
import StatusIndicator from 'components/StatusIndicator';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createEmptyBoard} from 'redux/actions/board_actions';
import {selectPreferences} from 'redux/selectors/preferences_selectors';

const App = () => {
  const dispatch = useDispatch();
  const preferences = useSelector(selectPreferences);

  useEffect(() => {
    const {width, height} = preferences;

    dispatch(
      createEmptyBoard({
        height,
        width,
      })
    );
  }, [preferences]);

  return (
    <div className='App'>
      <StatusIndicator />
      <Board />
      <ResetButton />
      <Settings />
    </div>
  );
};

export default App;
