export default function Footer(){
    return(
        <div>
            <div className="container">
                <div className="start-node"></div><label className="legend-labels">Start Node</label>
                <div className="end-node"></div><label className="legend-labels">End Node</label>
                <div className="empty-node"></div><label className="legend-labels">Empty Node</label>
                <div className="wall-node"></div><label className="legend-labels">Wall</label>
            </div>
        </div>
    )
}