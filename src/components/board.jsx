import {useSelector} from 'react-redux';
import {useBoard} from 'redux/selectors/use_board';

export default board = () => {
  const {board, height, width} = useSelector(useBoard());
};
