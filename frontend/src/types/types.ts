export interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  is_active: number;
}

export interface InventoryItem {
  id: number;
  pharmacy_id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  last_updated: string;
}

export interface InventorySummary {
  pharmacy_name: string;
  item_count: number;
  total_quantity: number;
  total_value: number;
}

export interface MonthlySummary {
  month: string;
  total_value: number;
}