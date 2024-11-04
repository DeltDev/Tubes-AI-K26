"use client";

import { useState } from 'react';

export default function HillClimbingSteepestAscentPage() {
  // Yang perlu ditampilin
  const [cubeState, setCubeState] = useState(null); // Raw data
  const [duration, setDuration] = useState<number | null>(null);

  const handleStartExperiment = async () => {
    const url = 'http://localhost:8000/magic-cube/hill-climbing-stochastic';

    const startTime = Date.now(); 

    try {
      const response = await fetch(url);
      const data = await response.json();

      const endTime = Date.now(); 
      
      setCubeState(data.cubeStates);
      setDuration(endTime - startTime); 

    } catch (error) {
      console.error(`Error running hill-climbing stochastic:`, error);
    }
  };

  return (
    <div>
      <h1>Hill-Climbing Stochastic</h1>

      <button onClick={handleStartExperiment}>
        Start Experiment
      </button>

      {cubeState && (
        <>
          <div>
            <h2>Experiment Results:</h2>
            <p>Initial State: {JSON.stringify(cubeState[0].cubeState)}</p>
            <p>Final State: {JSON.stringify(cubeState[cubeState.length - 1].cubeState)}</p>
            <p>Final Objective Value: {cubeState[cubeState.length - 1].value}</p>
            <p>Duration: {duration} ms</p>
            <p>Iteration Amount: {cubeState.length}</p>
          </div>

          <br />

          <div>
            <h2>Step-by-step detail</h2>
            <pre>{JSON.stringify(cubeState, null, 2)}</pre>
          </div>
        </>
      )}

    </div>
  );
}
