import createDependencyList from "../../functions/createDependencyList";
import dijkstras from "../../functions/dijkstras";
import generateWalls from "../../functions/generateWalls";
import makeWall from "../../functions/makeWall";
import refresh from "../../functions/refresh";

export default function Node(props){
    let row = parseInt(props.row);
    let col = parseInt(props.col);

    function solveMaze(){
        let dependencyList = createDependencyList(row, col);

        let solution = dijkstras(dependencyList, 0, row*col-1);
        let finalSolution = solution.path.map((element) => parseInt(element));

        let i = 0;
        let colorSolution = setInterval(() => {
            if (i < finalSolution.length - 1){
                document.getElementsByClassName("grid-item")[finalSolution[i]].classList.add('node-visited');
                i++;
            }
            else{
                clearInterval(colorSolution);
            }
        }, 100)
    }

    let lst = [...Array(row*col).keys()];
    let nodes = lst.map((num) => {
        return <div className={`grid-item ${num == props.start ? 'start' : ''} ${num == props.end ? 'end' : ''}`} onClick = {() => makeWall(num)} id={`${num}`} key={num}></div>
    })

    return(
        <div>
            <h1>Maze Solver</h1>
            <div className="grid-container">
                {nodes}
            </div>
            <button onClick={() => generateWalls(row, col)} id="generate-walls-button">Generate Walls</button>
            <button onClick={refresh} id="refresh-button">Refresh Page</button>
            <br />
            <button onClick={solveMaze} id="solve-button" >Solve !</button>
        </div>
    )
}