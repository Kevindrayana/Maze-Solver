import { useState } from "react";

import createDependencyList from "../../functions/createDependencyList";
import dijkstras from "../../functions/dijkstras";
import generateWalls from "../../functions/generateWalls";
import refresh from "../../functions/refresh";

export default function Header(props){
    const [speed, setSpeed] = useState(100);

    function handleSpeedChange(event){
        setSpeed(event.target.value)
    }

    function solveMaze(){
        let dependencyList = createDependencyList(props.row, props.col);

        let solution = dijkstras(dependencyList, props.start, props.end);
        let finalSolution = solution.path.map((element) => parseInt(element));
        console.log(finalSolution);

        let i = 0;
        let colorSolution = setInterval(() => {
            if (i < finalSolution.length - 1){
                document.getElementsByClassName("grid-item")[finalSolution[i]].classList.add('node-visited');
                i++;
            }
            else{
                clearInterval(colorSolution);
            }
        }, speed)
    }

    return( 
        <div>
            <nav className="navbar">
                <h2 className="title">Maze Solver</h2>
                <ul className="nav-items">
                    <button className="items" onClick={() => generateWalls(props.row, props.col)} id="generate-walls-button">Generate Walls</button>
                    <button className="items" onClick={refresh} id="refresh-button">Refresh Page</button>
                    <button className="items" onClick={solveMaze} id="solve-button" >Solve !</button>
                    <h4 className="items">Speed: </h4><input className="slider" id="speed-slider" type="range" name="speed" min="10" max="100" step="10" default="100" onChange={handleSpeedChange}/>
                </ul>
            </nav>
        </div>
    )
}