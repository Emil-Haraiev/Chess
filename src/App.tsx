import React, {useEffect, useState} from 'react';
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./modules/Board";
import {Player} from "./modules/Player";
import {Colors} from "./modules/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import TimeIsOver from "./components/TimeIsOver";

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [isTimeOver, setIsTimeOver] = useState(false)
    const [winner, setWinner] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="app">
            {isTimeOver && (
               <TimeIsOver restart={restart}/>
            )}
            <div className='timerWrapper'>
                <Timer
                    isTimeOver={isTimeOver}
                    setIsTimeOver={setIsTimeOver}
                    restart={restart}
                    currentPlayer={currentPlayer}
                />
            </div>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Black figures"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="White figures"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export default App;