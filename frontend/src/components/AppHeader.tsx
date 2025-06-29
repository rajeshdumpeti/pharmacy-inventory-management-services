import React from 'react';
import { Link } from 'react-router-dom';

const AppHeader: React.FC = () => (
  <>
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg rounded-b-3xl mb-0">
      <div className="flex items-center space-x-4">
        <img src="/logo192.png" alt="Pharmacy Logo" className="h-12 w-12 rounded-full shadow-lg" />
        <span className="text-3xl font-extrabold text-white tracking-wide drop-shadow">
          Pharmacy Inventory
        </span>
      </div>
      <span className="mt-4 md:mt-0 text-white text-lg font-medium opacity-80">
        Manage your pharmacies and inventory with ease
      </span>
    </header>
    <nav className="sticky top-[88px] z-40 flex justify-center mb-4 bg-white">
      <ul className="flex flex-wrap gap-4 bg-white rounded-full shadow px-8 py-3">
        <li>
          <Link
            to="/"
            className="px-5 py-2 rounded-full font-semibold text-blue-700 hover:bg-blue-100 transition-colors duration-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/pharmacies"
            className="px-5 py-2 rounded-full font-semibold text-blue-700 hover:bg-blue-100 transition-colors duration-200"
          >
            Pharmacies
          </Link>
        </li>
        <li>
          <Link
            to="/add-pharmacy"
            className="px-5 py-2 rounded-full font-semibold text-blue-700 hover:bg-blue-100 transition-colors duration-200"
          >
            Add New Pharmacy
          </Link>
        </li>
        <li>
          <Link
            to="/add-inventory"
            className="px-5 py-2 rounded-full font-semibold text-green-700 hover:bg-green-100 transition-colors duration-200"
          >
            Add New Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/report"
            className="px-5 py-2 rounded-full font-semibold text-purple-700 hover:bg-purple-100 transition-colors duration-200"
          >
            Summary Report
          </Link>
        </li>
        <li>
          <Link
            to="/monthly-report"
            className="px-5 py-2 rounded-full font-semibold text-orange-700 hover:bg-orange-100 transition-colors duration-200"
          >
            Monthly Chart
          </Link>
        </li>
      </ul>
    </nav>
  </>
);

export default AppHeader;
