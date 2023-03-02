import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }


    canMove(target: Cell): boolean {

        if (!super.canMove(target))
            return false;
        // if (this.cell.hasNeighbourKing(target))
        //     return false;
        const deltaX = Math.abs(target.x - this.cell.x);
        const deltaY = Math.abs(target.y - this.cell.y);
        if (deltaX <= 1 && deltaY <= 1)
            return true;
        return false;
    }

    // hasNeighbourKing(cell: Cell): boolean {
    //     for (let i = -1; i <= 1; i++) {
    //         for (let j = -1; j <= 1; j++) {
    //             const neighbour = this.board.getCell(this.cell.x + i, this.cell.y + j);
    //             if (neighbour && neighbour !== this.cell && neighbour.piece instanceof King && neighbour.piece.color === this.color)
    //                 return true;
    //         }
    //     }
    //     return false;
    // }
}