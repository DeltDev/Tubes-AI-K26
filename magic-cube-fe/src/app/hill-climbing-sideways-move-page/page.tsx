"use client";

import { useState } from 'react';

export default function HillClimbingSteepestAscentPage() {
  // Yang menjadi parameter
  const [sidewaysMoveMax, setSidewaysMoveMax] = useState<number>(0);

  // Yang perlu ditampilin
  const [cubeState, setCubeState] = useState(null); // Raw data
  const [initialState, setInitialState] = useState(null);
  const [finalState, setFinalState] = useState(null);
  const [finalObjectiveValue, setFinalObjectiveValue] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [iterationAmount, setIterationAmount] = useState(null);

  const handleStartExperiment = async () => {
    const url = `http://localhost:8000/magic-cube/hill-climbing-sideways-move/${sidewaysMoveMax}`;

    const startTime = Date.now(); 

    try {
      const response = await fetch(url);
      const data = await response.json();

      const endTime = Date.now(); 
      
      setCubeState(data.cubeStates);
      setInitialState(data.cubeStates[0].cubeState);
      setFinalState(data.cubeStates[data.cubeStates.length - 1].cubeState);
      setFinalObjectiveValue(data.cubeStates[data.cubeStates.length - 1].value);
      setDuration(endTime - startTime); 
      setIterationAmount(data.cubeStates.length);

    } catch (error) {
      console.error(`Error running hill-climbing sideways move:`, error);
    }
  };

  return (
    <div>
      <h1>Hill-Climbing Sideways Move</h1>

      <div>
        <label>
          Maximum sideways moves:
          <input
            type="number"
            value={sidewaysMoveMax}
            onChange={(e) => setSidewaysMoveMax(parseInt(e.target.value))}
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
            <p>Initial State: {JSON.stringify(initialState)}</p>
            <p>Final State: {JSON.stringify(finalState)}</p>
            <p>Final Objective Value: {finalObjectiveValue}</p>
            <p>Duration: {duration} ms</p>
            <p>Iteration Amount: {iterationAmount}</p>
          </div>

          <br />

          <div>
            <h2>Step-by-step detail</h2>
            <p>{JSON.stringify(cubeState)}</p>
          </div>
        </>
      )}

    </div>
  );
}
