import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  fetchPharmacies,
  fetchInventory,
  fetchInventorySummary,
  deletePharmacy,
  fetchMonthlySummary,
  updateInventoryItem,
} from './services/api';
import { Pharmacy, InventoryItem, InventorySummary } from './types/types';
import HomePage from './pages/HomePage';
import PharmaciesPage from './pages/PharmaciesPage';
import AddPharmacyPage from './pages/AddPharmacyPage';
import AddInventoryPage from './pages/AddInventoryPage';
import EditPharmacyPage from './pages/EditPharmacyPage';
import DeletePharmacyPage from './pages/DeletePharmacyPage';
import InventoryPage from './pages/InventoryPage';
import ReportPage from './pages/ReportPage';
import MonthlyReportPage from './pages/MonthlyReportPage';

import './index.css';
import AppHeader from './components/AppHeader';

const App: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [summary, setSummary] = useState<InventorySummary[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<{ month: string; total_value: number }[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMonthlySummary().then(setMonthlySummary);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [pharmaciesData, summaryData] = await Promise.all([
          fetchPharmacies(),
          fetchInventorySummary(),
        ]);
        setPharmacies(pharmaciesData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error loading data:', error);
        setApiError(error instanceof Error ? error.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const fetchInventoryForPharmacy = (pharmacyId: number) => {
    fetchInventory(pharmacyId).then(setInventory).catch(console.error);
  };

  const handlePharmacyAdded = (newPharmacy: Pharmacy) => {
    setPharmacies([...pharmacies, newPharmacy]);
    fetchInventorySummary().then(setSummary).catch(console.error);
  };

  const handleInventoryAdded = (newItem: InventoryItem) => {
    setInventory((prev) => [...prev, newItem]);
    fetchInventorySummary().then(setSummary).catch(console.error);
    fetchMonthlySummary().then(setMonthlySummary).catch(console.error); // <-- add this line
  };

  const handleInventoryUpdate = async (itemId: number, updates: Partial<InventoryItem>) => {
    try {
      await updateInventoryItem(itemId, updates);
      // Refresh monthly summary after update
      fetchMonthlySummary().then(setMonthlySummary).catch(console.error);
    } catch (error) {
      console.error('Failed to update inventory:', error);
    }
  };

  const handleDeletePharmacy = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this pharmacy?')) {
      try {
        await deletePharmacy(id);
        setPharmacies((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Failed to delete pharmacy:', error);
        alert('Failed to delete pharmacy. Please try again.');
      }
    }
  };
  console.log('Monthly Summary:', monthlySummary);
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-blue-600">
        Loading pharmacies...
      </div>
    );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
        {apiError && (
          <div className="max-w-lg mx-auto mt-8 bg-red-100 border border-red-300 text-red-700 rounded-xl p-6 shadow">
            <p>{apiError}</p>
          </div>
        )}
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pharmacies" element={<PharmaciesPage pharmacies={pharmacies} />} />
            <Route
              path="/add-pharmacy"
              element={<AddPharmacyPage onPharmacyAdded={handlePharmacyAdded} />}
            />
            <Route
              path="/add-inventory"
              element={
                <AddInventoryPage pharmacies={pharmacies} onInventoryAdded={handleInventoryAdded} />
              }
            />
            <Route
              path="/inventory/:pharmacyId"
              element={
                <InventoryPage
                  pharmacies={pharmacies}
                  inventory={inventory}
                  fetchInventoryForPharmacy={fetchInventoryForPharmacy}
                  onInventoryUpdate={handleInventoryUpdate} // <-- Pass it here
                />
              }
            />
            <Route path="/edit-pharmacy/:pharmacyId" element={<EditPharmacyPage />} />
            <Route
              path="/delete-pharmacy/:pharmacyId"
              element={<DeletePharmacyPage onDelete={handleDeletePharmacy} />}
            />
            <Route path="/report" element={<ReportPage summary={summary} />} />
            <Route
              path="/monthly-report"
              element={<MonthlyReportPage monthlySummary={monthlySummary} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
