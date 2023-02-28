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
    const [winner, setWinner] = useState('')
    const [blackTime, setBlackTime] = useState(10);
    const [whiteTime, setWhiteTime] = useState(10);
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
    const handleRestart = () => {
        setWhiteTime(10);
        setBlackTime(10);
        setIsTimeOver(false);
        restart()
    }

    function decrementBlackTimer() {
        setBlackTime((prev: number) => {
            if (prev <= 0) {
                setIsTimeOver(true);
                setWinner('White')
                return 0;
            }
            return prev - 1;
        });
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev: number) => {
            if (prev <= 0) {
                setIsTimeOver(true);
                setWinner('Black')
                return 0;
            }
            return prev - 1;
        });
    }

    return (
        <div className="app">
            {isTimeOver && (
               <TimeIsOver winner={winner} handleRestart={handleRestart}  restart={restart}/>
            )}
            <div className='timerWrapper'>
                <Timer
                    decrementBlackTimer={decrementBlackTimer}
                    decrementWhiteTimer={decrementWhiteTimer}
                    handleRestart={handleRestart}
                    blackTime={blackTime}
                    setBlackTime={setBlackTime}
                    whiteTime={whiteTime}
                    setWhiteTime={setWhiteTime}
                    setIsTimeOver={setIsTimeOver}
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