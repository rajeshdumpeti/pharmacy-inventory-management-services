import React from 'react';
import { useParams } from 'react-router-dom';

const EditPharmacyPage: React.FC = () => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-100">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700">
        Edit Pharmacy <span className="text-blue-500">#{pharmacyId}</span>
      </h2>
      {/* Add your edit form here */}
      <div className="text-center text-gray-400">Edit form coming soon...</div>
    </div>
  );
};

export default EditPharmacyPage;
