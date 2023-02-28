import React, {FC, MouseEventHandler} from 'react';

interface TimeProps {
    restart: () => void;
    handleRestart: MouseEventHandler<HTMLButtonElement>;
    winner: string
}


const TimeIsOver: FC<TimeProps> = ({handleRestart, winner}) => {
    return (
        <div>
            <div className='modal'>
                <h2 className='modalTittle'>Time is up!</h2>
                <h3 className='modalWinner'>{winner} player wins</h3>
                <button className='modalButton' onClick={handleRestart}>Restart game</button>
            </div>
        </div>
    );
};

export default TimeIsOver;