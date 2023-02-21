import React, {FC, useEffect, useState} from 'react';
import {Board} from "../modules/Board";
import CellComponent from "./CellComponenet";
import {Cell} from "../modules/Cell";
import {Player} from "../modules/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }

    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])


    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>Текущий игрок: {currentPlayer?.color}</h3>
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
        </div>
    );
};

export default BoardComponent;