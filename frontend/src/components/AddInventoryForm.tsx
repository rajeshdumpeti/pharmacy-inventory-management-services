import React, { useState } from 'react';
import { createInventoryItem } from '../services/api';

interface AddInventoryFormProps {
  pharmacyId: number;
  onInventoryAdded: (item: any) => void;
  pharmacyName: string;
}

const AddInventoryForm: React.FC<AddInventoryFormProps> = ({
  pharmacyId,
  onInventoryAdded,
  pharmacyName,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = await createInventoryItem({
        ...formData,
        pharmacy_id: pharmacyId,
      });
      onInventoryAdded(newItem);
      setFormData({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
      });
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold mb-2">
        Add New Inventory Item for {pharmacyName} store
      </h3>
      {/* Name & Description side by side */}
      <div className="flex flex-row gap-4">
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Description:</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
      {/* Quantity & Price side by side */}
      <div className="flex flex-row gap-4">
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Quantity:</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="flex-1 mb-2">
          <label className="block mb-1 font-medium">Price:</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddInventoryForm;
