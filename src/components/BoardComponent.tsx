import React, {FC, useState} from 'react';
import {Board} from "../modules/Board";
import CellComponent from "./CellComponenet";
import {Cell} from "../modules/Cell";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click (cell: Cell) {
        if(cell.figure){
            setSelectedCell(cell);
        }
    }

    function highlightCells () {
       board.hightloghtCells()
    }

    return (
        <div className='board'>
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent cell={cell} key={cell.id}
                                       click={click}
                                       selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                    )}
                </React.Fragment>
            )}

        </div>
    );
};

export default BoardComponent;