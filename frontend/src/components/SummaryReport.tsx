import React from 'react';
import { InventorySummary } from '../types/types';

interface SummaryReportProps {
  summary: InventorySummary[];
}

const SummaryReport: React.FC<SummaryReportProps> = ({ summary }) => {
  return (
    <div className="w-full overflow-x-auto">
      {summary.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No inventory data available.</p>
      ) : (
        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-purple-100 to-blue-100">
              <th className="py-3 px-4 text-left font-semibold text-purple-700">Pharmacy</th>
              <th className="py-3 px-4 text-left font-semibold text-purple-700">Item Count</th>
              <th className="py-3 px-4 text-left font-semibold text-purple-700">Total Quantity</th>
              <th className="py-3 px-4 text-left font-semibold text-purple-700">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((report, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-purple-50'
                } hover:bg-purple-100`}
              >
                <td className="py-3 px-4 font-medium">{report.pharmacy_name}</td>
                <td className="py-3 px-4">{report.item_count}</td>
                <td className="py-3 px-4">{report.total_quantity}</td>
                <td className="py-3 px-4">${report.total_value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-purple-100">
              <td className="py-3 px-4 font-bold">Total</td>
              <td className="py-3 px-4 font-bold">
                {summary.reduce((sum, r) => sum + r.item_count, 0)}
              </td>
              <td className="py-3 px-4 font-bold">
                {summary.reduce((sum, r) => sum + r.total_quantity, 0)}
              </td>
              <td className="py-3 px-4 font-bold">
                ${summary.reduce((sum, r) => sum + r.total_value, 0).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default SummaryReport;
