import {useDispatch} from 'react-redux';
import {generateBoard} from 'redux/slices/board_slice';

const ResetButton = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(generateBoard({width: 20, height: 10, mineCount: 50}));
  };

  return <button onClick={onClick}>Reset</button>;
};

export default ResetButton;
