export default function generateWalls(row, col){
    let elements = document.getElementsByClassName('wall')
    for(let element of elements){
        element.classList.remove('wall')
    }

    let randomNums = [];
    for(let i = 0; i < (row*col*0.33); i ++){
        let randomNum = Math.floor(Math.random() * (row * col - 2)) + 1;
            if (!randomNums.includes(randomNum) || randomNum == 1 || randomNum == 500){
                randomNums.push(randomNum);
            }
    }

    for(let j = 0; j < randomNums.length; j++){
        document.getElementsByClassName("grid-item")[randomNums[j]].classList.add('wall');
    }
}