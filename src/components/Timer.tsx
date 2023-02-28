import React, {FC, useEffect, useRef, useState} from 'react';
import {MouseEventHandler} from "react";
import {Player} from "../modules/Player";
import {Colors} from "../modules/Colors";
import time from '../assets/time.png';


interface TimerProps {
    currentPlayer: Player | null;
    setIsTimeOver: Function;
    blackTime: number;
    whiteTime: number;
    setBlackTime: Function;
    setWhiteTime: Function;
    handleRestart: MouseEventHandler<HTMLButtonElement>;
    decrementWhiteTimer: Function;
    decrementBlackTimer: Function;

}

const Timer: FC<TimerProps> = ({
                                   currentPlayer,
                                   decrementWhiteTimer,
                                   decrementBlackTimer,
                                   blackTime,
                                   whiteTime,
                                   handleRestart
                               }) => {


    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer, blackTime, whiteTime]);

    function startTimer() {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setTimeout(callback, 1000) as any;
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
                <button className='mainButton' onClick={handleRestart}>Restart game</button>
            </div>
            <div>
                <div className='title'>White's move</div>
                <div className='timeWrap'>
                    <img src={time} alt="time"/>
                    <div className='time'>{formatTime(whiteMinutes, whiteSeconds)}</div>
                </div>
            </div>
        </div>
    );
};

export default Timer;
