import React from 'react';

const HomePage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[10vh]">
    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full text-center">
      <h2 className="text-3xl font-extrabold mb-4 text-blue-700">
        Welcome to the Pharmacy Inventory System
      </h2>
      <p className="text-gray-600 text-lg">
        Use the navigation above to manage pharmacies, add inventory, or view reports.
      </p>
    </div>
  </div>
);

export default HomePage;
