import React, {FC} from 'react';
import {Cell} from "../modules/Cell";

interface CellProps {
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({cell}) => {
    return (
        <div className={['cell',cell.color].join(' ')}>
            {cell.figure}
        </div>
    );
};

export default CellComponent;