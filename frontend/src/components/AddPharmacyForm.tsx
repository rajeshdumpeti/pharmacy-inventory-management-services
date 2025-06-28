import React, { useState } from 'react';
import { createPharmacy } from '../services/api';

interface AddPharmacyFormProps {
  onPharmacyAdded: (pharmacy: any) => void;
}

const AddPharmacyForm: React.FC<AddPharmacyFormProps> = ({ onPharmacyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });
 const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const newPharmacy = await createPharmacy(formData);
      onPharmacyAdded(newPharmacy);
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: ''
      });
    } catch (error) {
      console.error('Error adding pharmacy:', error);
      setError(error instanceof Error ? error.message : 'Failed to add pharmacy');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Pharmacy</h3>
            {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Pharmacy Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
                    disabled={isSubmitting}

        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
   <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Pharmacy'}
      </button>
    </form>
  );
};

export default AddPharmacyForm;