import React, { useState, useEffect } from 'react';
import { fetchPharmacies, fetchInventory, fetchInventorySummary } from './services/api';
import { Pharmacy, InventoryItem, InventorySummary } from './types/types';
import PharmacyList from './components/PharmacyList';
import InventoryList from './components/InventoryList';
import AddPharmacyForm from './components/AddPharmacyForm';
import AddInventoryForm from './components/AddInventoryForm';
import SummaryReport from './components/SummaryReport';
import './styles.css';

const App: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [summary, setSummary] = useState<InventorySummary[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'report'>('inventory');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pharmaciesData, summaryData] = await Promise.all([
          fetchPharmacies(),
          fetchInventorySummary(),
        ]);
        setPharmacies(pharmaciesData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedPharmacy !== null) {
      fetchInventory(selectedPharmacy).then(setInventory).catch(console.error);
    }
  }, [selectedPharmacy]);

  const handlePharmacyAdded = (newPharmacy: Pharmacy) => {
    setPharmacies([...pharmacies, newPharmacy]);
    fetchInventorySummary().then(setSummary).catch(console.error);
  };

  const handleInventoryAdded = (newItem: InventoryItem) => {
    setInventory([...inventory, newItem]);
    fetchInventorySummary().then(setSummary).catch(console.error);
  };

  return (
    <div className="app-container">
      <h1>Pharmacy Inventory Management System</h1>
      
      <div className="pharmacy-section">
        <h2>Pharmacies</h2>
        <PharmacyList 
          pharmacies={pharmacies} 
          selectedPharmacy={selectedPharmacy}
          onSelectPharmacy={setSelectedPharmacy}
        />
        <AddPharmacyForm onPharmacyAdded={handlePharmacyAdded} />
      </div>

      <div className="tab-buttons">
        <button 
          className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button 
          className={activeTab === 'report' ? 'active' : ''}
          onClick={() => setActiveTab('report')}
        >
          Summary Report
        </button>
      </div>

      {activeTab === 'inventory' && selectedPharmacy && (
        <div className="inventory-section">
          <h2>Inventory for {pharmacies.find(p => p.id === selectedPharmacy)?.name}</h2>
          <InventoryList inventory={inventory} />
          <AddInventoryForm 
            pharmacyId={selectedPharmacy} 
            onInventoryAdded={handleInventoryAdded} 
          />
        </div>
      )}

      {activeTab === 'report' && (
        <div className="report-section">
          <h2>Inventory Summary</h2>
          <SummaryReport summary={summary} />
        </div>
      )}
    </div>
  );
};

export default App;