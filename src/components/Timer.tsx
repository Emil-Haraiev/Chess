import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../modules/Player";
import {Colors} from "../modules/Colors";
import time from '../assets/time.png';
interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    isTimeOver: boolean;
    setIsTimeOver: Function;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, isTimeOver, setIsTimeOver}) => {
    const [blackTime, setBlackTime] = useState(10);
    const [whiteTime, setWhiteTime] = useState(10);

    const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer, blackTime, whiteTime]);

    function startTimer() {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setTimeout(callback, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => {
            if (prev <= 0) {
                setIsTimeOver(true);
                return 0;
            }
            return prev - 1;
        });
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => {
            if (prev <= 0) {
                setIsTimeOver(true);
                return 0;
            }
            return prev - 1;
        });
    }


    const handleRestart = () => {
        setWhiteTime(10);
        setBlackTime(10);
        setIsTimeOver(false);
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
            {/*{isTimeOver && (*/}
            {/*    <div className='modal'>*/}
            {/*        <div className='modal-content'>*/}
            {/*            <h2>Time is up!</h2>*/}
            {/*            <button onClick={handleRestart}>Restart game</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <div>
                <div className='title'>Black's move</div>
                <div className='timeWrap'>
                    <img src={time} alt="time"/>
                    <div className='time'>{formatTime(blackMinutes, blackSeconds)}</div>
                </div>
            </div>
            <div>
                <button className='mainButton' onClick={handleRestart}>Restart game</button>
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
