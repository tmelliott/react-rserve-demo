import { useRserve } from '@tmelliott/react-rserve';
import React, { useEffect, useState } from 'react'

function Clustering() {
    const [clusters, setClusters] = useState(3);
    const [plot, setPlot] = useState("");

    const { R } = useRserve();
    const [mod, setMod] = useState([]);

    useEffect(() => {
        if (!R || !R.running) return;
        R.ocap((err, funs) => {
            funs.use_module("clustering", (err, value) => {
                setMod(value)
            })
        });
    }, [R]);

    useEffect(() => {
        if (!mod || mod.length === 0) return;
        mod.cluster_plot(clusters, (err, value) => setPlot(value))
    }, [mod, clusters])

    return (
        <div>
            <img src={plot} className="App-rplot" alt="" />
            <div style={{ display: "flex", gap: "1em" }}>
                <label>Number of clusters: {clusters}</label>
                <input type="button"
                    value="One fewer"
                    onClick={(e) => setClusters(Math.max(1, clusters - 1))}
                />
                <input type="button" value="One more"
                    onClick={(e) => setClusters(clusters + 1)}
                />
            </div>
        </div>
    )
}

export default Clustering
