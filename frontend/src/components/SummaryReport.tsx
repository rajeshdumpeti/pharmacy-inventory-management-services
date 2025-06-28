import React from 'react';
import { InventorySummary } from '../types/types';

interface SummaryReportProps {
  summary: InventorySummary[];
}

const SummaryReport: React.FC<SummaryReportProps> = ({ summary }) => {
  return (
    <div className="summary-report">
      {summary.length === 0 ? (
        <p>No inventory data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pharmacy</th>
              <th>Item Count</th>
              <th>Total Quantity</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((report, index) => (
              <tr key={index}>
                <td>{report.pharmacy_name}</td>
                <td>{report.item_count}</td>
                <td>{report.total_quantity}</td>
                <td>${report.total_value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{summary.reduce((sum, r) => sum + r.item_count, 0)}</strong></td>
              <td><strong>{summary.reduce((sum, r) => sum + r.total_quantity, 0)}</strong></td>
              <td><strong>${summary.reduce((sum, r) => sum + r.total_value, 0).toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default SummaryReport;