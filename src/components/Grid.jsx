import handleClick from "../../functions/handleClick";

export default function Node(props){
    let lst = [...Array(props.row * props.col).keys()];
    let nodes = lst.map((num) => {
        return <div className={`grid-item ${num == props.start ? 'start' : ''} ${num == props.end ? 'end' : ''}`} onClick = {() => handleClick(num)} id={`${num}`} key={num}></div>
    })

    return(
        <div>
            <div className="grid-container">
                {nodes}
            </div>
        </div>
    )
}