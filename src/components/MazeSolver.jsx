import Node from "./Node";

export default function MazeSolver(){
    let row = 13;
    let col= 30;
    return(
        <div>
            <Node row={`${row}`} col={`${col}`}  start={`${0}`} end={`${row*col-1}`}/>
        </div>
    )
}