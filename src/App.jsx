import './App.css'
import Footer from './components/Footer';
import Grid from './components/Grid';
import Header from './components/Header';

function App() {
    const row = 25;
    const col = 50;

    const start = 0;
    const end = row * col - 1;
    
    return (
      <div className="App">
        <Header 
          row={row} 
          col={col}  
          start={start} 
          end={end}
        />
        <Grid 
          row={row} 
          col={col}  
          start={start} 
          end={end}
        />
        <Footer/>
      </div>
    )
}

export default App
