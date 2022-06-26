import "./App.css";
import { useRserve } from "@tmelliott/react-rserve";
import { useEffect, useState } from "react";
import Clustering from "./components/Clustering";

function App() {
  const R = useRserve();
  const [version, setVersion] = useState("");

  // const [message, setMessage] = useState("")

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
        <h1>react-rserve-demo</h1>
        {version !== "" ? (
          <p>Connected to R {version}</p>
        ) : (
          <p>Not connected to R</p>
        )}

        <Clustering />
      </header>
    </div>
  );
}

export default App;
