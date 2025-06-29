import React from 'react';
import { useNavigate } from 'react-router-dom';
import PharmacyList from '../components/PharmacyList';
import { Pharmacy } from '../types/types';

const PharmaciesPage: React.FC<{ pharmacies: Pharmacy[] }> = ({ pharmacies }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Pharmacy Stores</h2>
      <div className="overflow-x-auto">
        <PharmacyList
          pharmacies={pharmacies}
          onSelectPharmacy={(id) => navigate(`/inventory/${id}`)}
          onEditPharmacy={(id) => navigate(`/edit-pharmacy/${id}`)}
          onDeletePharmacy={(id) => navigate(`/delete-pharmacy/${id}`)}
        />
      </div>
    </div>
  );
};

export default PharmaciesPage;
