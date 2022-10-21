import Board from 'components/Board';
import ResetButton from 'components/NewGameButton';
import Settings from 'components/Settings';
import StatusIndicator from 'components/StatusIndicator';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BOARD_CREATE_EMPTY} from 'redux/actions';
import {selectPreferences} from 'redux/selectors/preferences_selectors';

const App = () => {
  const dispatch = useDispatch();
  const preferences = useSelector(selectPreferences);

  useEffect(() => {
    const {width, height} = preferences;

    dispatch({
      type: BOARD_CREATE_EMPTY,
      payload: {width, height},
    });
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
