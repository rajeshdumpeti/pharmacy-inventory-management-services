import React from 'react';
import { Pharmacy } from '../types/types';

interface PharmacyListProps {
  pharmacies: Pharmacy[];
  selectedPharmacy: number | null;
  onSelectPharmacy: (id: number) => void;
}

const PharmacyList: React.FC<PharmacyListProps> = ({ 
  pharmacies, 
  selectedPharmacy, 
  onSelectPharmacy 
}) => {
  return (
    <div className="pharmacy-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map(pharmacy => (
            <tr 
              key={pharmacy.id} 
              className={selectedPharmacy === pharmacy.id ? 'selected' : ''}
            >
              <td>{pharmacy.name}</td>
              <td>{pharmacy.address}</td>
              <td>{pharmacy.phone}</td>
              <td>
                <button onClick={() => onSelectPharmacy(pharmacy.id)}>
                  {selectedPharmacy === pharmacy.id ? 'Selected' : 'Select'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PharmacyList;