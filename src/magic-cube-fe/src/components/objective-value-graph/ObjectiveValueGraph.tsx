import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MagicCubeClass } from '@/components/cube-state/MagicCube';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ObjectiveValueGraphProps {
  cubeState: Array<MagicCubeClass>;
}

export default function ObjectiveValueGraph({ cubeState }: ObjectiveValueGraphProps) {
  const data = {
    labels: cubeState.map((_, index) => index),
    datasets: [
      {
        label: 'Objective Value',
        data: cubeState.map((state) => state.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Objective Value per Iteration',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Iteration',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Objective Value',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
