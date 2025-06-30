import React, { useState } from 'react';
import AddInventoryForm from '../components/AddInventoryForm';
import { Pharmacy, InventoryItem } from '../types/types';

const AddInventoryPage: React.FC<{
  pharmacies: Pharmacy[];
  onInventoryAdded: (item: InventoryItem) => void;
}> = ({ pharmacies, onInventoryAdded }) => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<number | null>(null);
  const [selectedPharmacyName, setSelectedPharmacyName] = useState<string>('');

  const handlePharmacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedPharmacyId(id);
    const pharmacy = pharmacies.find((p) => p.id === id);
    setSelectedPharmacyName(pharmacy ? pharmacy.name : '');
  };

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-8 mb-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-green-700">
        Add New Inventory Item
      </h2>
      <label className="block mb-2 font-semibold text-gray-700">Select Pharmacy:</label>
      <select
        value={selectedPharmacyId ?? ''}
        onChange={handlePharmacyChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        <option value="" disabled>
          -- Select Pharmacy --
        </option>
        {pharmacies.map((pharmacy) => (
          <option key={pharmacy.id} value={pharmacy.id}>
            {pharmacy.name}
          </option>
        ))}
      </select>
      {selectedPharmacyId && (
        <AddInventoryForm
          pharmacyId={selectedPharmacyId}
          pharmacyName={selectedPharmacyName}
          onInventoryAdded={onInventoryAdded}
        />
      )}
    </div>
  );
};

export default AddInventoryPage;
