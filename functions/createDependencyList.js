export default function createDependencyList(row, col){
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

    return dependencyList;
}