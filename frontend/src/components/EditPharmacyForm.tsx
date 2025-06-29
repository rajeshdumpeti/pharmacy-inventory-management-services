import React, { useState } from 'react';
import { Pharmacy } from '../types/types';
import { updatePharmacy } from '../services/api';

interface EditPharmacyFormProps {
  pharmacy: Pharmacy;
  onSave: (updatedPharmacy: Pharmacy) => void;
  onCancel: () => void;
}

const EditPharmacyForm: React.FC<EditPharmacyFormProps> = ({ pharmacy, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Pharmacy, 'id' | 'is_active'>>({
    name: pharmacy.name,
    address: pharmacy.address,
    phone: pharmacy.phone,
    email: pharmacy.email,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updatePharmacy(pharmacy.id, formData);
      onSave(updated);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Name:</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      {/* Other fields similarly */}
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPharmacyForm;
