export default function makeWall(id){
    console.log(document.getElementById(id).classList);
    if (document.getElementById(id).classList.contains('start') || document.getElementById(id).classList.contains('end')){
        console.log('Cannot add walls to start or end node')
        return;
    }

    if (!document.getElementById(id).classList.contains('wall')){
        document.getElementById(id).classList.add('wall');
    }
    else{
        document.getElementById(id).classList.remove('wall');
    }
}