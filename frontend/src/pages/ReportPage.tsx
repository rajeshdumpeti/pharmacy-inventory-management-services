import React from 'react';
import SummaryReport from '../components/SummaryReport';
import { InventorySummary } from '../types/types';

interface ReportPageProps {
  summary: InventorySummary[];
}

const ReportPage: React.FC<ReportPageProps> = ({ summary }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8  max-w-4xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-purple-700">Inventory Summary</h2>
    <div className="mt-8">
      <SummaryReport summary={summary} />
    </div>
  </div>
);

export default ReportPage;
