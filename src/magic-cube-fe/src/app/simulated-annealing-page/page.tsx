"use client";

import { MagicCubeClass } from '@/components/cube-state/MagicCube';
import CubeVisualizationWithoutSpaceDiags from '@/components/cube-visualization/CubeVisualizationWithoutSpaceDiags';
import ObjectiveValueGraph from '@/components/objective-value-graph/ObjectiveValueGraph';
import ProbabilityGraph from '@/components/probability-graph/ProbabilityGraph';
import { useState } from 'react';

export default function SimulatedAnnealingPage() {
  // Yang perlu ditampilin
  const [cubeState, setCubeState] = useState<Array<MagicCubeClass> | null>(null); // Raw data
  const [probabilities, setProbabilities] = useState<Array<number>>([]); 
  const [stuckInLocalOptima, setStuckInLocalOptima] = useState<number>(0); 
  const [duration, setDuration] = useState<number | null>(null);

  const handleStartExperiment = async () => {
    const url = `http://localhost:8000/magic-cube/simulated-annealing`;
    const startTime = Date.now();

    try {
      const response = await fetch(url);
      const data = await response.json();

      const endTime = Date.now();
      
      setCubeState(data.cubeStates);
      setProbabilities(data.probabilities);
      setStuckInLocalOptima(data.stuckInLocalOptima);
      setDuration(endTime - startTime); 

    } catch (error) {
      console.error(`Error running simulated annealing:`, error);
    }
  };

  return (
    <div>
      <h1>Simulated Annealing</h1>

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
            <p>Iteration Amount: {cubeState.length - 1}</p>
            <p>Stuck in local optima frequency: {stuckInLocalOptima}</p>
          </div>

          <br />

          <div>
            <h2>Objective Value per Iteration</h2>
            <ObjectiveValueGraph cubeState={cubeState} />
          </div>

          <br />

          <div>
            <h2>Probability Value per Iteration</h2>
            <ProbabilityGraph probabilities={probabilities} />
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
