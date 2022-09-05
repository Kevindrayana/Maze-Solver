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

        let i = 1;
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

    // function handleChangeStartRow(event){
    //   setStartRow(event.target.value)
    // }
      
    // function handleChangeStartCol(event){
    //   setStartCol(event.target.value)
    // }
      
    // function handleChangeEndRow(event){
    //   setEndRow(event.target.value)
    // }
      
    // function handleChangeEndCol(event){
    //   setEndCol(event.target.value)
    // }

    return( 
        <div>
            <button onClick={() => generateWalls(props.row, props.col)} id="generate-walls-button">Generate Walls</button>
            <button onClick={refresh} id="refresh-button">Refresh Page</button>
            <button onClick={solveMaze} id="solve-button" >Solve !</button>
            <label>Speed: </label><input type="range" name="speed" min="10" max="1000" default="100" onChange={handleSpeedChange}/>

            {/* <form>
            <input type="text" placeholder="start row" onChange={handleChangeStartRow}/>
            <input type="text" placeholder="start column" onChange={handleChangeStartCol}/>
            <input type="text" placeholder="end row" onChange={handleChangeEndRow}/>
            <input type="text" placeholder="end column" onChange={handleChangeEndCol}/>
            </form> */}
        </div>
    )
}