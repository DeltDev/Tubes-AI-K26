"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const algorithms = [
    'Hill-Climbing Steepest Ascent',
    'Hill-Climbing Sideways Move',
    'Hill-Climbing Random Restart',
    'Hill-Climbing Stochastic',
    'Simulated Annealing',
    'Genetic Algorithm'
  ];

  return (
    <div>
      <h1>Magic Cube</h1>

      <div className="w-full flex gap-5">
        {algorithms.map((algorithm) => (
          <button
            key={algorithm}
            onClick={() => router.push(`/${algorithm.toLowerCase().replace(/\s+/g, '-')}-page`)}
          >
            {algorithm}
          </button>
        ))}
      </div>
    </div>
  );
}
