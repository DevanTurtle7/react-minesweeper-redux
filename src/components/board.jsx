import {useSelector} from 'react-redux';
import {useBoard} from 'redux/selectors/use_board';
import Tile from 'components/tile';

const Board = () => {
  const {board, height, width} = useSelector(useBoard);
  console.log(height, width);

  return (
    <div className='board'>
      {board.map((row, y) => (
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