import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InventoryList from '../components/InventoryList';
import { Pharmacy, InventoryItem } from '../types/types';

interface InventoryPageProps {
  pharmacies: Pharmacy[];
  inventory: InventoryItem[];
  fetchInventoryForPharmacy: (pharmacyId: number) => void;
  onInventoryUpdate: (itemId: number, updates: Partial<InventoryItem>) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({
  pharmacies,
  inventory,
  fetchInventoryForPharmacy,
  onInventoryUpdate,
}) => {
  const { pharmacyId } = useParams<{ pharmacyId: string }>();
  const pharmacyIdNum = Number(pharmacyId);

  useEffect(() => {
    if (!isNaN(pharmacyIdNum)) {
      fetchInventoryForPharmacy(pharmacyIdNum);
    }
  }, [pharmacyIdNum, fetchInventoryForPharmacy]);

  const handleEditSubmit = (itemId: number, updates: Partial<InventoryItem>) => {
    onInventoryUpdate(itemId, updates);
  };

  const pharmacy = pharmacies.find((p) => p.id === pharmacyIdNum);

  if (!pharmacy) {
    return <div className="text-center text-red-600 mt-10">Pharmacy not found.</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Inventory for {pharmacy.name}</h2>
      <InventoryList
        inventory={inventory}
        onEditSubmit={handleEditSubmit} // Pass the handler to InventoryList
      />
    </div>
  );
};

export default InventoryPage;
