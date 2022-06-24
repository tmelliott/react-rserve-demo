import "./App.css";
import { useRserve } from "@tmelliott/react-rserve";
import { useEffect, useState } from "react";

function App() {
  const R = useRserve();
  const [version, setVersion] = useState("");

  const [clusters, setClusters] = useState(3)

  // const [message, setMessage] = useState("")
  const [plot, setPlot] = useState("");

  useEffect(() => {
    if (!R || !R.running) return;

    R.ocap((err, funs) => {
      funs.rversion((err, value) => {
        setVersion(value);
      });
      // if (funs.dummy_html) {
      //   funs.dummy_html((err, value) => {
      //     setMessage(value)
      //   })
      // }
      if (funs.aplot) {
        funs.aplot(clusters, (err, value) => {
          setPlot(value)
        })
      }
    });
  }, [R, clusters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>react-rserve-demo</h1>
        {version !== "" ? (
          <p>Connected to R {version}</p>
        ) : (
          <p>Not connected to R</p>
        )}

        <img src={plot} className="App-rplot" alt="logo" />
        <div style={{display: "flex", gap: "1em"}}>
        <label>Number of clusters:</label>
        <input type="number"
          defaultValue={3}
          size={2}
          onChange={(e) => setClusters(e.target.value)} />
        </div>

      </header>
    </div>
  );
}

export default App;
