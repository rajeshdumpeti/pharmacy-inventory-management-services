import React from 'react';
import { Pharmacy } from '../types/types';

interface PharmacyListProps {
  pharmacies: Pharmacy[];
  onSelectPharmacy: (id: number) => void;
  onEditPharmacy: (id: number) => void;
  onDeletePharmacy: (id: number) => void;
}

const PharmacyList: React.FC<PharmacyListProps> = ({
  pharmacies,
  onSelectPharmacy,
  onEditPharmacy,
  onDeletePharmacy,
}) => {
  return (
    <div className="pharmacy-list-container w-full">
      <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-green-100">
            <th className="py-3 px-4 text-left font-semibold text-blue-700">Name</th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">Address</th>
            <th className="py-3 px-4 text-left font-semibold text-blue-700">Phone</th>
            <th className="py-3 px-4 text-center font-semibold text-blue-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-8 text-gray-400">
                No pharmacies found.
              </td>
            </tr>
          ) : (
            pharmacies.map((pharmacy, idx) => (
              <tr
                key={pharmacy.id}
                className={`transition-colors duration-150 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                } hover:bg-blue-100`}
              >
                <td className="py-3 px-4 font-medium">{pharmacy.name}</td>
                <td className="py-3 px-4">{pharmacy.address}</td>
                <td className="py-3 px-4">{pharmacy.phone}</td>
                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                    title="View Inventory"
                    onClick={() => onSelectPharmacy(pharmacy.id)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Inventory
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
                    title="Edit Pharmacy"
                    onClick={() => onEditPharmacy(pharmacy.id)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 13l6-6M3 21h18"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
                    title="Delete Pharmacy"
                    onClick={() => onDeletePharmacy(pharmacy.id)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyList;
