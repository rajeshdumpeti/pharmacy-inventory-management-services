import React, { useState } from 'react';
import { createInventoryItem } from '../services/api';

interface AddInventoryFormProps {
  pharmacyId: number;
  onInventoryAdded: (item: any) => void;
}

const AddInventoryForm: React.FC<AddInventoryFormProps> = ({ 
  pharmacyId, 
  onInventoryAdded 
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
    <form onSubmit={handleSubmit}>
      <h3>Add New Inventory Item</h3>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
          required
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddInventoryForm;