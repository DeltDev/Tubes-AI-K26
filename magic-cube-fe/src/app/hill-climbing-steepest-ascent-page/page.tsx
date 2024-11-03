"use client";

import { useState } from 'react';

export default function HillClimbingSteepestAscentPage() {
  // Yang perlu ditampilin
  const [cubeState, setCubeState] = useState(null); // Raw data
  const [initialState, setInitialState] = useState(null);
  const [finalState, setFinalState] = useState(null);
  const [finalObjectiveValue, setFinalObjectiveValue] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [iterationAmount, setIterationAmount] = useState(null);

  const handleStartExperiment = async () => {
    const url = 'http://localhost:8000/magic-cube/hill-climbing-steepest-ascent';

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
      console.error(`Error running hill-climbing steepest ascent:`, error);
    }
  };

  return (
    <div>
      <h1>Hill-Climbing Steepest Ascent</h1>

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
