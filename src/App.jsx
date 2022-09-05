import { useState } from 'react';
import './App.css'
import Grid from './components/Grid';
import Header from './components/Header';

function App() {
    const [row, setRow] = useState(25);
    const [col, setCol] = useState(50);

    return (
      <div className="App">
        <Header row={row} col={col}  start={`${0}`} end={`${row * col - 1}`}/>
        <Grid row={row} col={col}  start={`${0}`} end={`${row * col - 1}`}/>
      </div>
    )
}

export default App
