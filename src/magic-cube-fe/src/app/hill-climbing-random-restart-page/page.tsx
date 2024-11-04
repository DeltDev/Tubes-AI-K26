"use client";

import { MagicCubeClass } from '@/components/cube-state/MagicCube';
import CubeVisualizationWithoutSpaceDiags from '@/components/cube-visualization/CubeVisualizationWithoutSpaceDiags';
import ObjectiveValueGraph from '@/components/objective-value-graph/ObjectiveValueGraph';
import { useState } from 'react';

export default function HillClimbingRandomRestartPage() {
  // Yang jadi parameter
  const [maximumRestart, setMaximumRestart] = useState<number>(0);

  // Yang perlu ditampilin
  const [cubeState, setCubeState] = useState<Array<Array<MagicCubeClass>> | null>(null); // Raw data
  const [duration, setDuration] = useState<number | null>(null);

  const handleStartExperiment = async () => {
    const url = `http://localhost:8000/magic-cube/hill-climbing-random-restart/${maximumRestart}`;
    const startTime = Date.now();

    try {
      const response = await fetch(url);
      const data = await response.json();

      const endTime = Date.now();
      
      setCubeState(data.cubeStates);
      setDuration(endTime - startTime); 

    } catch (error) {
      console.error(`Error running hill-climbing random restart:`, error);
    }
  };

  return (
    <div>
      <h1>Hill-Climbing Random Restart</h1>

      <div>
        <label>
          Maximum restart:
          <input
            type="number"
            value={maximumRestart}
            onChange={(e) => setMaximumRestart(parseInt(e.target.value))}
          />
        </label>
      </div>

      <button onClick={handleStartExperiment}>
        Start Experiment
      </button>

      {cubeState && (
        <>
          <div>
            <h2>Experiment Results:</h2>
            <p>Duration: {duration} ms</p>
            <p>Total Restarts: {cubeState.length}</p>

            {cubeState.map((restart : Array<MagicCubeClass>, index) => (
              <div key={index}>
                <h3>Restart {index + 1}</h3>
                <p>Iterations: {restart.length - 1}</p>
                <p>Initial State:</p>
                <CubeVisualizationWithoutSpaceDiags 
                  cube={restart[0].cubeState}
                />
                <p>Final State:</p>
                <CubeVisualizationWithoutSpaceDiags 
                  cube={restart[restart.length - 1].cubeState}
                />
                <p>Final Objective Value: {restart[restart.length - 1].value}</p>
                
                <br />

                <div>
                  <h2>Objective Value per Iteration</h2>
                  <ObjectiveValueGraph cubeState={restart} />
                </div>
              </div>
            ))}
          </div>

          <br />

          <div>
            <h2>Step-by-step Detail</h2>
            <pre>{JSON.stringify(cubeState, null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
}
