import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../modules/Player";
import {Colors} from "../modules/Colors";
import time from '../assets/time.png';
interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    const blackMinutes = Math.floor(blackTime / 60);
    const blackSeconds = blackTime % 60;


    const whiteMinutes = Math.floor(whiteTime / 60);
    const whiteSeconds = whiteTime % 60;


    const formatTime = (minutes: number, seconds: number) => {
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div>
            <div>
                <div className='title'>Black's move</div>
                <div className='timeWrap'>
                    <img src={time} alt="time"/>
                    <div className='time'>{formatTime(blackMinutes, blackSeconds)}</div>
                </div>
            </div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <div>
                <div className='title' >White's move</div>
                <div className='timeWrap'>
                    <img src={time} alt="time"/>
                    <div className='time'>{formatTime(whiteMinutes, whiteSeconds)}</div>
                </div>
            </div>
        </div>
    );
};

export default Timer;
