import {useSelector} from 'react-redux';
import {useBoard} from 'redux/selectors/use_board';
import Tile from 'components/tile';
import {Row} from '../types';

const Board = () => {
  const {board, height, width} = useSelector(useBoard);

  return (
    <div className='board'>
      {board.map((row: Row, y: number) => (
        <div className='board-row' key={y}>
          {row.map((tile, x) => (
            <Tile x={x} y={y} key={y * width + x} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
