import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPharmacy } from '../services/api';
import SuccessMessage from './SuccessMessage';

interface AddPharmacyFormProps {
  onPharmacyAdded: (pharmacy: any) => void;
}

const AddPharmacyForm: React.FC<AddPharmacyFormProps> = ({ onPharmacyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    // Add more fields as needed
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
        email: '',
      });
      setSuccess('Pharmacy added successfully!');
      setTimeout(() => {
        setSuccess(null);
        navigate('/pharmacies'); // Redirect to the pharmacies list
      }, 1500);
    } catch (error) {
      console.error('Error adding pharmacy:', error);
      setError(error instanceof Error ? error.message : 'Failed to add pharmacy');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto bg-white p-6 rounded shadow space-y-4">
      {success && <SuccessMessage message={success} />}
      {error && (
        <div className="text-red-600 text-sm">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}
      <div className="flex flex-row gap-4">
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Pharmacy Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Address:</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Phone:</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        {/* Add more fields here as needed, following the same pattern */}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? 'Adding...' : 'Add Pharmacy'}
      </button>
    </form>
  );
};

export default AddPharmacyForm;
