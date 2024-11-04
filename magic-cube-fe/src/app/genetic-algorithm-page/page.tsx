"use client";

import { useState } from 'react';

export default function GeneticAlgorithmPage() {
  // State variables
  const [cubeState, setCubeState] = useState(null); // Raw data
  const [duration, setDuration] = useState<number | null>(null);
  const [genomeAmt, setGenomeAmt] = useState<number>(100); // Default population amount
  const [maxIteration, setMaxIteration] = useState<number>(1000); // Default max iteration

  const handleStartExperiment = async () => {
    const url = `http://localhost:8000/magic-cube/genetic-algorithm?genomeAmt=${genomeAmt}&maxIteration=${maxIteration}`;
    const startTime = Date.now();

    try {
      const response = await fetch(url);
      const data = await response.json();

      const endTime = Date.now();
      
      setCubeState(data.cubeStates);
      setDuration(endTime - startTime); 

    } catch (error) {
      console.error(`Error running genetic algorithm:`, error);
    }
  };

  return (
    <div>
      <h1>Genetic Algorithm</h1>

      <div>
        <label>
          Population Amount:
          <input
            type="number"
            value={genomeAmt}
            onChange={(e) => setGenomeAmt(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Maximum Iteration:
          <input
            type="number"
            value={maxIteration}
            onChange={(e) => setMaxIteration(Number(e.target.value))}
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
