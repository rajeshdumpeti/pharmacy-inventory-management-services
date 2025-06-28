import { Pharmacy, InventoryItem, InventorySummary } from '../types/types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchPharmacies = async (): Promise<Pharmacy[]> => {
  const response = await fetch(`${API_BASE_URL}/api/pharmacies/`);
  if (!response.ok) throw new Error('Failed to fetch pharmacies');
  return response.json();
};

export const createPharmacy = async (pharmacy: Omit<Pharmacy, 'id' | 'is_active'>): Promise<Pharmacy> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pharmacies/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pharmacy),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Network error:', error);
    throw new Error('Network request failed. Is the backend running?');
  }
};

export const fetchInventory = async (pharmacyId?: number): Promise<InventoryItem[]> => {
  const url = pharmacyId 
    ? `${API_BASE_URL}/api/inventory/?pharmacy_id=${pharmacyId}`
    : `${API_BASE_URL}/api/inventory/`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch inventory');
  return response.json();
};

export const createInventoryItem = async (item: Omit<InventoryItem, 'id' | 'last_updated'>): Promise<InventoryItem> => {
  const response = await fetch(`${API_BASE_URL}/api/inventory/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Failed to create inventory item');
  return response.json();
};

export const fetchInventorySummary = async (): Promise<InventorySummary[]> => {
  const response = await fetch(`${API_BASE_URL}/api/reports/inventory-summary`);
  if (!response.ok) throw new Error('Failed to fetch inventory summary');
  return response.json();
};