"use client";

import { MagicCubeClass } from '@/components/cube-state/MagicCube';
import CubeVisualizationWithoutSpaceDiags from '@/components/cube-visualization/CubeVisualizationWithoutSpaceDiags';
import { useState } from 'react';

export default function HillClimbingSidewaysMovePage() {
  // Yang menjadi parameter
  const [sidewaysMoveMax, setSidewaysMoveMax] = useState<number>(0);

  // Yang perlu ditampilin
  const [cubeState, setCubeState] = useState<Array<MagicCubeClass> | null>(null); // Raw data
  const [duration, setDuration] = useState<number | null>(null);

  const handleStartExperiment = async () => {
    const url = `http://localhost:8000/magic-cube/hill-climbing-sideways-move/${sidewaysMoveMax}`;

    const startTime = Date.now(); 

    try {
      const response = await fetch(url);
      const data = await response.json();

      const endTime = Date.now(); 
      
      setCubeState(data.cubeStates);
      setDuration(endTime - startTime); 

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
            <p>Initial State:</p>
            <CubeVisualizationWithoutSpaceDiags
              cube={cubeState[0].cubeState}
            />
            <p>Final State:</p>
            <CubeVisualizationWithoutSpaceDiags 
              cube={cubeState[cubeState.length - 1].cubeState}
            />
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
