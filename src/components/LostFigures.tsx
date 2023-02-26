import React, {FC} from 'react';
import {Figure} from "../modules/figures/Figure";
import '../App.css'
interface LostFiguresProps {
    title: string;
    figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {

    return (
        <div className='lost'>
            <h3>{title}</h3>
            <div className='lostWrap'>
                {figures.map(figure =>
                    <div  key={figure.id}>
                        {figure.logo && <img width={20} height={20} src={figure.logo}/>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LostFigures;