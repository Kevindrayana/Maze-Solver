export default function Node(){
    let row = 10;
    let col = 10;

    function generateWalls(){
        let elements = document.getElementsByClassName('wall')
        for(let element of elements){
            element.classList.remove('wall')
        }

        let randomNums = [];
        for(let i = 0; i < (row*col*0.35); i ++){
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

            if (right === null){
                dependencyList[element] = {[bottom] : 1, [left] : 1, [up] : 1};
            }
            else if (bottom === null){
                dependencyList[element] = {[right] : 1, [left] : 1, [up] : 1};
            }
            else if (left === null){
                dependencyList[element] = {[right] : 1, [bottom] : 1, [up] : 1};
            }
            else if (up === null){
                dependencyList[element] = {[right] : 1, [bottom] : 1, [left] : 1};
            }
            else{
                dependencyList[element] = {[right] : 1, [bottom] : 1, [left] : 1, [up] : 1};
            }
        })

        console.log(dependencyList);

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
                    distance = Math.pow(10, 1000);
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

            // return the shortest path & the end node's distance from the start node
                return results;
            };
            

            let solution = solve(dependencyList, 0, row*col-1);
            let finalSolution = solution.path.map((element) => parseInt(element));
            console.log(finalSolution);

            // for(let i of finalSolution){
            //     document.getElementsByClassName("grid-item")[i].classList.add('grey');
            // }
            let i = 0;
            let colorSolution = setInterval(() => {
                if (i >= finalSolution.length-1){
                    clearInterval(colorSolution);
                }
                document.getElementsByClassName("grid-item")[finalSolution[i]].classList.add('grey');
                i++;
                
            }, 100)
    }
    
    return(
        <div>
            <div className="grid-container">
                <div className="grid-item start" id="0"></div>
                <div className="grid-item" id="1"></div>
                <div className="grid-item" id="2"></div>
                <div className="grid-item" id="3"></div>
                <div className="grid-item" id="4"></div>
                <div className="grid-item" id="5"></div>
                <div className="grid-item" id="6"></div>
                <div className="grid-item" id="7"></div>
                <div className="grid-item" id="8"></div>
                <div className="grid-item" id="9"></div>
                <div className="grid-item" id="10"></div>
                <div className="grid-item" id="11"></div>
                <div className="grid-item" id="12"></div>
                <div className="grid-item" id="13"></div>
                <div className="grid-item" id="14"></div>
                <div className="grid-item" id="15"></div>
                <div className="grid-item" id="16"></div>
                <div className="grid-item" id="17"></div>
                <div className="grid-item" id="18"></div>
                <div className="grid-item" id="19"></div>
                <div className="grid-item" id="20"></div>
                <div className="grid-item" id="21"></div>
                <div className="grid-item" id="22"></div>
                <div className="grid-item" id="23"></div>
                <div className="grid-item" id="24"></div>
                <div className="grid-item" id="25"></div>
                <div className="grid-item" id="26"></div>
                <div className="grid-item" id="27"></div>
                <div className="grid-item" id="28"></div>
                <div className="grid-item" id="29"></div>
                <div className="grid-item" id="30"></div>
                <div className="grid-item" id="31"></div>
                <div className="grid-item" id="32"></div>
                <div className="grid-item" id="33"></div>
                <div className="grid-item" id="34"></div>
                <div className="grid-item" id="35"></div>
                <div className="grid-item" id="36"></div>
                <div className="grid-item" id="37"></div>
                <div className="grid-item" id="38"></div>
                <div className="grid-item" id="39"></div>
                <div className="grid-item" id="40"></div>
                <div className="grid-item" id="41"></div>
                <div className="grid-item" id="42"></div>
                <div className="grid-item" id="43"></div>
                <div className="grid-item" id="44"></div>
                <div className="grid-item" id="45"></div>
                <div className="grid-item" id="46"></div>
                <div className="grid-item" id="47"></div>
                <div className="grid-item" id="48"></div>
                <div className="grid-item" id="49"></div>
                <div className="grid-item" id="50"></div>
                <div className="grid-item" id="51"></div>
                <div className="grid-item" id="52"></div>
                <div className="grid-item" id="53"></div>
                <div className="grid-item" id="54"></div>
                <div className="grid-item" id="55"></div>
                <div className="grid-item" id="56"></div>
                <div className="grid-item" id="57"></div>
                <div className="grid-item" id="58"></div>
                <div className="grid-item" id="59"></div>
                <div className="grid-item" id="60"></div>
                <div className="grid-item" id="61"></div>
                <div className="grid-item" id="62"></div>
                <div className="grid-item" id="63"></div>
                <div className="grid-item" id="64"></div>
                <div className="grid-item" id="65"></div>
                <div className="grid-item" id="66"></div>
                <div className="grid-item" id="67"></div>
                <div className="grid-item" id="68"></div>
                <div className="grid-item" id="69"></div>
                <div className="grid-item" id="70"></div>
                <div className="grid-item" id="71"></div>
                <div className="grid-item" id="72"></div>
                <div className="grid-item" id="73"></div>
                <div className="grid-item" id="74"></div>
                <div className="grid-item" id="75"></div>
                <div className="grid-item" id="76"></div>
                <div className="grid-item" id="77"></div>
                <div className="grid-item" id="78"></div>
                <div className="grid-item" id="79"></div>
                <div className="grid-item" id="80"></div>
                <div className="grid-item" id="81"></div>
                <div className="grid-item" id="82"></div>
                <div className="grid-item" id="83"></div>
                <div className="grid-item" id="84"></div>
                <div className="grid-item" id="85"></div>
                <div className="grid-item" id="86"></div>
                <div className="grid-item" id="87"></div>
                <div className="grid-item" id="88"></div>
                <div className="grid-item" id="89"></div>
                <div className="grid-item" id="90"></div>
                <div className="grid-item" id="91"></div>
                <div className="grid-item" id="92"></div>
                <div className="grid-item" id="93"></div>
                <div className="grid-item" id="94"></div>
                <div className="grid-item" id="95"></div>
                <div className="grid-item" id="96"></div>
                <div className="grid-item" id="97"></div>
                <div className="grid-item" id="98"></div>
                <div className="grid-item end" id="99"></div>
            </div>
            <button onClick={generateWalls}>Generate Walls</button>
            <button onClick={solveMaze}>Solve !</button>
        </div>
    )
}