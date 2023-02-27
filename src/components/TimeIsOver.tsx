import React, {FC} from 'react';

interface TimeProps {
    restart: () => void;
}


const TimeIsOver: FC<TimeProps> = ({restart}) => {
    return (
        <div>
            <div className='modal'>
                <h2 className='modalTittle'>Time is up!</h2>
                <h3 className='modalWinner'>White player wins</h3>
                <button className='modalButton' onClick={restart}>Restart game</button>
            </div>
        </div>
    );
};

export default TimeIsOver;