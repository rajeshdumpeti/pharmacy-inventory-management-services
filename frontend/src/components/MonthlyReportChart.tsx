import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface MonthlyPieChartProps {
  monthlySummary: { month: string; total_value: number }[];
}

const MonthlyReportChart: React.FC<MonthlyPieChartProps> = ({ monthlySummary }) => {
  if (!monthlySummary || monthlySummary.length === 0) {
    return <div className="text-center text-gray-500">No monthly data available.</div>;
  }
  const data = {
    labels: monthlySummary.map((item) => item.month),
    datasets: [
      {
        label: 'Total Value',
        data: monthlySummary.map((item) => item.total_value),
        backgroundColor: [
          '#60a5fa',
          '#f472b6',
          '#34d399',
          '#fbbf24',
          '#a78bfa',
          '#f87171',
          '#38bdf8',
          '#facc15',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
      title: {
        display: true,
        text: 'Monthly Inventory Value Distribution',
        font: { size: 18 },
      },
    },
  };

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto flex flex-col items-center">
      <Pie data={data} options={options} />
    </div>
  );
};

export default MonthlyReportChart;
