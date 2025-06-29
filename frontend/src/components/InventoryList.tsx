import React from 'react';
import { InventoryItem } from '../types/types';

interface InventoryListProps {
  inventory: InventoryItem[];
  onEditSubmit?: (itemId: number, updates: Partial<InventoryItem>) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, onEditSubmit }) => {
  // Example: Add an Edit button for each row if onEditSubmit is provided
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
              {onEditSubmit && <th>Edit</th>}
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
                {onEditSubmit && (
                  <td>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onEditSubmit(item.id, {
                          // Example: you would show a form to get these values
                          quantity: item.quantity + 1, // Example increment
                        })
                      }
                    >
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryList;
