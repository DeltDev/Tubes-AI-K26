import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ProbabilityGraphProps {
  probabilities: Array<number>;
}

export default function ProbabilityGraph({ probabilities }: ProbabilityGraphProps) {
  const data = {
    labels: probabilities.map((_, index) => index),
    datasets: [
      {
        label: 'Probability Value (e^(deltaE/T))',
        data: probabilities.map((state) => state),
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
        text: 'Probability Value per Iteration',
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
          text: 'Probability Value',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
