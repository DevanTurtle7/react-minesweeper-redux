import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectBoard} from 'redux/selectors/board_selectors';
import {selectGameState} from 'redux/selectors/game_state_selectors';
import {selectBoardWon} from 'redux/selectors/board_selectors';
import {GAME_STATE_IN_PROGRESS, Row} from '../types';
import Tile from './Tile';

import '../styles/board.scss';
import {gameStateSetWin} from 'redux/actions/game_state_actions';

const Board = () => {
  const {board, width} = useSelector(selectBoard);
  const gameState = useSelector(selectGameState);
  const boardWon = useSelector(selectBoardWon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (boardWon && gameState === GAME_STATE_IN_PROGRESS) {
      dispatch(gameStateSetWin());
    }
  }, [boardWon, gameState]);

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
