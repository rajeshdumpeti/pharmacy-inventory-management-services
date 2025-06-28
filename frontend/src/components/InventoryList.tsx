import React from 'react';
import { InventoryItem } from '../types/types';

interface InventoryListProps {
  inventory: InventoryItem[];
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory }) => {
  return (
    <div className="inventory-list">
      {inventory.length === 0 ? (
        <p>No inventory items found for this pharmacy.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;