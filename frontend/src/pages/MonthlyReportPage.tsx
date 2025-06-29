import MonthlyReportChart from '../components/MonthlyReportChart';

const MonthlyReportPage: React.FC<{ monthlySummary: { month: string; total_value: number }[] }> = ({
  monthlySummary,
}) => {
  console.log('Monthly Summary:', monthlySummary);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Monthly Inventory Report
      </h2>
      <MonthlyReportChart monthlySummary={monthlySummary} />
    </div>
  );
};

export default MonthlyReportPage;
