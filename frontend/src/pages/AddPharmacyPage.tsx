import React from 'react';
import AddPharmacyForm from '../components/AddPharmacyForm';
import { Pharmacy } from '../types/types';

const AddPharmacyPage: React.FC<{ onPharmacyAdded: (pharmacy: Pharmacy) => void }> = ({
  onPharmacyAdded,
}) => (
  <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
    <h2 className="text-3xl font-extrabold text-center text-blue-700">Add New Pharmacy</h2>
    <AddPharmacyForm onPharmacyAdded={onPharmacyAdded} />
  </div>
);

export default AddPharmacyPage;
