import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeletePharmacyPage: React.FC<{ onDelete: (id: number) => void }> = ({ onDelete }) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (pharmacyId) {
      onDelete(Number(pharmacyId));
      navigate('/pharmacies');
    }
  };

  const handleCancel = () => {
    navigate('/pharmacies');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-red-700 mb-2 text-center">
            Delete Pharmacy <span className="text-red-500">#{pharmacyId}</span>
          </h2>
          <p className="text-center text-gray-700 mb-2">
            Are you sure you want to delete this pharmacy? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-4 w-full mt-4">
          <button
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl hover:bg-gray-300 transition font-semibold"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition font-semibold"
            onClick={handleDelete}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePharmacyPage;
