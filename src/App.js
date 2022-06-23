import logo from "./logo.svg";
import "./App.css";
import { useRserve } from "@tmelliott/react-rserve";
import { useEffect, useState } from "react";

function App() {
  const R = useRserve();
  const [version, setVersion] = useState("");

  useEffect(() => {
    if (!R || !R.running) return;

    R.ocap((err, funs) => {
      funs.rversion((err, value) => {
        setVersion(value);
      });
    });
  }, [R]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {version != "" ? (
          <p>Connected to R {version}</p>
        ) : (
          <p>Not connected to R</p>
        )}
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
