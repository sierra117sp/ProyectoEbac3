import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PriceChart = ({ prices }) => {
  if (!prices || prices.length === 0) return null;

  const data = {
    labels: prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Precio USD',
        data: prices.map(([, price]) => price),
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.1)',
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { display: true, title: { display: true, text: 'Fecha' } },
      y: { display: true, title: { display: true, text: 'Precio (USD)' } },
    },
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Histórico de precios (últimos 30 días)</h3>
      <Line data={data} options={options} height={300} />
    </div>
  );
};

export default PriceChart;
