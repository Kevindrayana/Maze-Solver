export default function Node(){
    let row = 10;
    let col = 10;

    function generateWalls(){
        let elements = document.getElementsByClassName('wall')
        for(let element of elements){
            element.classList.remove('wall')
        }

        let randomNums = [];
        for(let i = 0; i < (row*col*0.25); i ++){
            let randomNum = Math.floor(Math.random() * (row * col - 2)) + 1;
                if (!randomNums.includes(randomNum) || randomNum == 1 || randomNum == 500){
                    randomNums.push(randomNum);
                }
        }

        for(let j = 0; j < randomNums.length; j++){
            document.getElementsByClassName("grid-item")[randomNums[j]].classList.add('wall');
        }
    }

    function solveMaze(){
        let nodes_id = [...Array(row*col-1).keys()];
        let dependencyList = {};

        nodes_id.forEach((element) => {
            let right = (element + 1) % col !== 0 ? element + 1 : null;
            let bottom = element + col <= row * col - 1 ? element + col : null;
            let left = element % col !== 0 ? element - 1 : null;
            let up = element - col >= 0 ? element - col : null;

            dependencyList[element] = {
                ...(right && {[right] : 1}), 
                ...(bottom && {[bottom] : 1}),
                ...(left && {[left] : 1}),
                ...(up && {[up] : 1}),
            };
        })

        // console.log(dependencyList);

        function shortestDistanceNode(distances, visited){
            // create a default value for shortest
            let shortest = null;
            
            // for each node in the distances object
            for (let node in distances) {
                // if no node has been assigned to shortest yet
                // or if the current node's distance is smaller than the current shortest
                let currentIsShortest =
                    shortest === null || distances[node] < distances[shortest];
                    
                // and if the current node is in the unvisited set
                if (currentIsShortest && !visited.includes(node)) {
                    // update shortest to be the current node
                    shortest = node;
                }
            }
            return shortest;
        };
        
        function solve(graph, startNode, endNode){
 
            // track distances from the start node using a hash object
            let distances = {};
            distances[endNode] = "Infinity";
            distances = Object.assign(distances, graph[startNode]);
            // track paths using a hash object
            let parents = { endNode: null };
            for (let child in graph[startNode]) {
             parents[child] = startNode;
            }
             
            // collect visited nodes
              let visited = [];
           // find the nearest node
              let node = shortestDistanceNode(distances, visited);
            
            // for that node:
            while (node) {
            // find its distance from the start node & its child nodes
                let distance = distances[node];
                let children = graph[node]; 
                
                if (document.getElementById(node).classList.contains('wall')){
                    distance = Math.pow(10, 1000); //represents infinity
                }
            // for each of those child nodes:
                for (let child in children) {
                    
             // make sure each child node is not the start node
                    if (String(child) === String(startNode)) {
                        continue;
                    } 
                    else {
                        // save the distance from the start node to the child node
                        let newdistance = distance + children[child];
                        // if there's no recorded distance from the start node to the child node in the distances object
                        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
                        if (!distances[child] || distances[child] > newdistance) {
                        // save the distance to the object
                            distances[child] = newdistance;
                        // record the path
                            parents[child] = node;
                        } 
                    }
                }  
                // move the current node to the visited set
                visited.push(node);
                // move to the nearest neighbor node
                node = shortestDistanceNode(distances, visited);
               }
             
            // using the stored paths from start node to end node
            // record the shortest path
            let shortestPath = [endNode];
            let parent = parents[endNode];
            while (parent) {
                shortestPath.push(parent);
                parent = parents[parent];
            }
            shortestPath.reverse();
             
            //this is the shortest path
            let results = {
                distance: distances[endNode],
                path: shortestPath,
            };

            //catch if there is no solution
            if (results.path[0] === endNode){
                alert('No solutions found, please refresh')
            }

            // return the shortest path & the end node's distance from the start node
                return results;
            };
            

            let solution = solve(dependencyList, 0, row*col-1);
            let finalSolution = solution.path.map((element) => parseInt(element));
            console.log(finalSolution);
            console.log(finalSolution.length);


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

    function makeWall(id){
        if (document.getElementById(id).classList.contains('start') || document.getElementById(id).classList.contains('end')){
            console.log('Cannot add walls to start or end node')
            return;
        }
        document.getElementById(id).classList.add('wall');
    }

    function refresh(){
        window.location.reload();
    }
    
    return(
        <div>
            <div className="grid-container">
                <div className="grid-item start" onClick = {() => makeWall(0)} id="0"></div>
                <div className="grid-item" onClick = {() => makeWall(1)} id="1"></div>
                <div className="grid-item" onClick = {() => makeWall(2)} id="2"></div>
                <div className="grid-item" onClick = {() => makeWall(3)} id="3"></div>
                <div className="grid-item" onClick = {() => makeWall(4)} id="4"></div>
                <div className="grid-item" onClick = {() => makeWall(5)} id="5"></div>
                <div className="grid-item" onClick = {() => makeWall(6)} id="6"></div>
                <div className="grid-item" onClick = {() => makeWall(7)} id="7"></div>
                <div className="grid-item" onClick = {() => makeWall(8)} id="8"></div>
                <div className="grid-item" onClick = {() => makeWall(9)} id="9"></div>
                <div className="grid-item" onClick = {() => makeWall(10)} id="10"></div>
                <div className="grid-item" onClick = {() => makeWall(11)} id="11"></div>
                <div className="grid-item" onClick = {() => makeWall(12)} id="12"></div>
                <div className="grid-item" onClick = {() => makeWall(13)} id="13"></div>
                <div className="grid-item" onClick = {() => makeWall(14)} id="14"></div>
                <div className="grid-item" onClick = {() => makeWall(15)} id="15"></div>
                <div className="grid-item" onClick = {() => makeWall(16)} id="16"></div>
                <div className="grid-item" onClick = {() => makeWall(17)} id="17"></div>
                <div className="grid-item" onClick = {() => makeWall(18)} id="18"></div>
                <div className="grid-item" onClick = {() => makeWall(19)} id="19"></div>
                <div className="grid-item" onClick = {() => makeWall(20)} id="20"></div>
                <div className="grid-item" onClick = {() => makeWall(21)} id="21"></div>
                <div className="grid-item" onClick = {() => makeWall(22)} id="22"></div>
                <div className="grid-item" onClick = {() => makeWall(23)} id="23"></div>
                <div className="grid-item" onClick = {() => makeWall(24)} id="24"></div>
                <div className="grid-item" onClick = {() => makeWall(25)} id="25"></div>
                <div className="grid-item" onClick = {() => makeWall(26)} id="26"></div>
                <div className="grid-item" onClick = {() => makeWall(27)} id="27"></div>
                <div className="grid-item" onClick = {() => makeWall(28)} id="28"></div>
                <div className="grid-item" onClick = {() => makeWall(29)} id="29"></div>
                <div className="grid-item" onClick = {() => makeWall(30)} id="30"></div>
                <div className="grid-item" onClick = {() => makeWall(31)} id="31"></div>
                <div className="grid-item" onClick = {() => makeWall(32)} id="32"></div>
                <div className="grid-item" onClick = {() => makeWall(33)} id="33"></div>
                <div className="grid-item" onClick = {() => makeWall(34)} id="34"></div>
                <div className="grid-item" onClick = {() => makeWall(35)} id="35"></div>
                <div className="grid-item" onClick = {() => makeWall(36)} id="36"></div>
                <div className="grid-item" onClick = {() => makeWall(37)} id="37"></div>
                <div className="grid-item" onClick = {() => makeWall(38)} id="38"></div>
                <div className="grid-item" onClick = {() => makeWall(39)} id="39"></div>
                <div className="grid-item" onClick = {() => makeWall(40)} id="40"></div>
                <div className="grid-item" onClick = {() => makeWall(41)} id="41"></div>
                <div className="grid-item" onClick = {() => makeWall(42)} id="42"></div>
                <div className="grid-item" onClick = {() => makeWall(43)} id="43"></div>
                <div className="grid-item" onClick = {() => makeWall(44)} id="44"></div>
                <div className="grid-item" onClick = {() => makeWall(45)} id="45"></div>
                <div className="grid-item" onClick = {() => makeWall(46)} id="46"></div>
                <div className="grid-item" onClick = {() => makeWall(47)} id="47"></div>
                <div className="grid-item" onClick = {() => makeWall(48)} id="48"></div>
                <div className="grid-item" onClick = {() => makeWall(49)} id="49"></div>
                <div className="grid-item" onClick = {() => makeWall(50)} id="50"></div>
                <div className="grid-item" onClick = {() => makeWall(51)} id="51"></div>
                <div className="grid-item" onClick = {() => makeWall(52)} id="52"></div>
                <div className="grid-item" onClick = {() => makeWall(53)} id="53"></div>
                <div className="grid-item" onClick = {() => makeWall(54)} id="54"></div>
                <div className="grid-item" onClick = {() => makeWall(55)} id="55"></div>
                <div className="grid-item" onClick = {() => makeWall(56)} id="56"></div>
                <div className="grid-item" onClick = {() => makeWall(57)} id="57"></div>
                <div className="grid-item" onClick = {() => makeWall(58)} id="58"></div>
                <div className="grid-item" onClick = {() => makeWall(59)} id="59"></div>
                <div className="grid-item" onClick = {() => makeWall(60)} id="60"></div>
                <div className="grid-item" onClick = {() => makeWall(61)} id="61"></div>
                <div className="grid-item" onClick = {() => makeWall(62)} id="62"></div>
                <div className="grid-item" onClick = {() => makeWall(63)} id="63"></div>
                <div className="grid-item" onClick = {() => makeWall(64)} id="64"></div>
                <div className="grid-item" onClick = {() => makeWall(65)} id="65"></div>
                <div className="grid-item" onClick = {() => makeWall(66)} id="66"></div>
                <div className="grid-item" onClick = {() => makeWall(67)} id="67"></div>
                <div className="grid-item" onClick = {() => makeWall(68)} id="68"></div>
                <div className="grid-item" onClick = {() => makeWall(69)} id="69"></div>
                <div className="grid-item" onClick = {() => makeWall(70)} id="70"></div>
                <div className="grid-item" onClick = {() => makeWall(71)} id="71"></div>
                <div className="grid-item" onClick = {() => makeWall(72)} id="72"></div>
                <div className="grid-item" onClick = {() => makeWall(73)} id="73"></div>
                <div className="grid-item" onClick = {() => makeWall(74)} id="74"></div>
                <div className="grid-item" onClick = {() => makeWall(75)} id="75"></div>
                <div className="grid-item" onClick = {() => makeWall(76)} id="76"></div>
                <div className="grid-item" onClick = {() => makeWall(77)} id="77"></div>
                <div className="grid-item" onClick = {() => makeWall(78)} id="78"></div>
                <div className="grid-item" onClick = {() => makeWall(79)} id="79"></div>
                <div className="grid-item" onClick = {() => makeWall(80)} id="80"></div>
                <div className="grid-item" onClick = {() => makeWall(81)} id="81"></div>
                <div className="grid-item" onClick = {() => makeWall(82)} id="82"></div>
                <div className="grid-item" onClick = {() => makeWall(83)} id="83"></div>
                <div className="grid-item" onClick = {() => makeWall(84)} id="84"></div>
                <div className="grid-item" onClick = {() => makeWall(85)} id="85"></div>
                <div className="grid-item" onClick = {() => makeWall(86)} id="86"></div>
                <div className="grid-item" onClick = {() => makeWall(87)} id="87"></div>
                <div className="grid-item" onClick = {() => makeWall(88)} id="88"></div>
                <div className="grid-item" onClick = {() => makeWall(89)} id="89"></div>
                <div className="grid-item" onClick = {() => makeWall(90)} id="90"></div>
                <div className="grid-item" onClick = {() => makeWall(91)} id="91"></div>
                <div className="grid-item" onClick = {() => makeWall(92)} id="92"></div>
                <div className="grid-item" onClick = {() => makeWall(93)} id="93"></div>
                <div className="grid-item" onClick = {() => makeWall(94)} id="94"></div>
                <div className="grid-item" onClick = {() => makeWall(95)} id="95"></div>
                <div className="grid-item" onClick = {() => makeWall(96)} id="96"></div>
                <div className="grid-item" onClick = {() => makeWall(97)} id="97"></div>
                <div className="grid-item" onClick = {() => makeWall(98)} id="98"></div>
                <div className="grid-item end" onClick = {() => makeWall(99)} id="99"></div>
            </div>
            <button onClick={generateWalls}>Generate Walls</button>
            <button onClick={solveMaze}>Solve !</button>
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}