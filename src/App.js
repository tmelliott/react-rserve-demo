import logo from './logo.svg';
import './App.css';
import { useRserve } from '@tmelliott/react-rserve';
import { useEffect } from 'react';

function App() {
  const R = useRserve()

  useEffect(() => {
    if (!R || !R.running) return
    R.ocap((err, funs) => {
      funs.rversion((err, value) => {
        console.log(value)
      })
    })
  }, [R])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
