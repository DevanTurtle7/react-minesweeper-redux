import {useSelector} from 'react-redux';
import {selectBoard} from 'redux/selectors/board_selectors';
import {Row} from '../types';
import Tile from './Tile';

const Board = () => {
  const {board, width} = useSelector(selectBoard);

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
