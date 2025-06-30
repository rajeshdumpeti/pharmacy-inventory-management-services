import { Pharmacy, InventoryItem, InventorySummary, MonthlySummary } from '../types/types';

const API_BASE_URL = process.env.DEV_REACT_APP_API_URL || 'http://localhost:8000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Add this helper function
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  throw new Error(
    error instanceof Error 
      ? error.message 
      : 'Network request failed. Is the backend running?'
  );
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
  const url = new URL(`${API_BASE_URL}/api/inventory/`);
  
  if (pharmacyId) {
    url.searchParams.append('pharmacy_id', pharmacyId.toString());
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        typeof errorData.detail === 'string'
          ? errorData.detail
          : JSON.stringify(errorData)
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch inventory error:', {
      error,
      url: url.toString(),
      pharmacyId
    });
    throw new Error(
      error instanceof Error 
        ? error.message 
        : JSON.stringify(error)
    );
  }
};
export const createInventoryItem = async (
  item: Omit<InventoryItem, 'id' | 'last_updated'>
): Promise<InventoryItem> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Detailed error:', {
      error,
      item,
      url: `${API_BASE_URL}/api/inventory/`
    });
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to create inventory item. Check console for details.'
    );
  }
};

export const fetchInventorySummary = async (): Promise<InventorySummary[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/inventory-summary`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    handleApiError(error);
    return []; // Return empty array as fallback
  }
};


export const updatePharmacy = async (
  id: number, 
  updates: Partial<Pharmacy>
): Promise<Pharmacy> => {
  const response = await fetch(`${API_BASE_URL}/api/pharmacies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update pharmacy');
  return response.json();
};

export const deletePharmacy = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/pharmacies/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete pharmacy');
};


export const updateInventoryItem = async (id: number, updates: Partial<InventoryItem>): Promise<InventoryItem> => {
  const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update inventory item');
  return response.json();
};

export const deleteInventoryItem = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/inventory/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete inventory item');
};


export const fetchMonthlySummary = async (): Promise<MonthlySummary[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reports/monthly-summary`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to fetch monthly summary');
    return await response.json();
  } catch (error) {
    console.error('Fetch monthly summary error:', error);
    return [];
  }
};