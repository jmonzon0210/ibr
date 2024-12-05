import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { 
  HomeIcon, 
  CurrencyDollarIcon, 
  GiftIcon, 
  BanknotesIcon,
  ArrowDownCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Diezmos from './components/Diezmos';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'josedanielmonzon02@gmail.com' && password === 'TesoreroIBR2024*') {
      onLogin();
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Tesorería Iglesia Bautista Renacer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

const Sidebar = ({ isOpen, toggleSidebar, onLogout, onNavigate }) => {
  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: 'dashboard' },
    { name: 'Diezmos', icon: CurrencyDollarIcon, href: 'diezmos' },
    { name: 'Ofrendas', icon: GiftIcon, href: 'ofrendas' },
    { name: 'Fondos', icon: BanknotesIcon, href: 'fondos' },
    { name: 'Salidas', icon: ArrowDownCircleIcon, href: 'salidas' },
  ];

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Menú</h2>
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onNavigate(item.href);
                toggleSidebar();
              }}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

const Dashboard = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const data = {
    cajaCUP: 5000,
    cajaUSD: 200,
    bancoCUP: 15000,
    bancoUSD: 1000,
    misionesCUP: 3000,
    misionesUSD: 500,
    misericordiaCUP: 2000,
    misericordiaUSD: 300,
    entradasCUP: 10000,
    entradasUSD: 800,
    salidasCUP: 8000,
    salidasUSD: 600
  };

  const totalFondosData = {
    labels: ['Caja', 'Banco', 'Misiones', 'Misericordia'],
    datasets: [
      {
        label: 'CUP',
        data: [data.cajaCUP, data.bancoCUP, data.misionesCUP, data.misericordiaCUP],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
      },
      {
        label: 'USD',
        data: [data.cajaUSD, data.bancoUSD, data.misionesUSD, data.misericordiaUSD],
        backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)', 'rgba(75, 192, 192, 0.9)'],
      }
    ]
  };

  const entradasSalidasData = {
    labels: ['Entradas', 'Salidas'],
    datasets: [
      {
        data: [data.entradasCUP, data.salidasCUP],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onLogout={onLogout}
        onNavigate={handleNavigate}
      />
      <div className="p-4 sm:ml-64">
        <div className="flex items-center mb-4">
          <button onClick={toggleSidebar} className="mr-4 text-gray-500 hover:text-gray-600">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-blue-600">
            {currentPage === 'dashboard' ? 'Dashboard Financiero - Iglesia Bautista Renacer' : ''}
          </h1>
        </div>
        
        {currentPage === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Total de Fondos (CUP y USD)</h2>
              <Bar 
                data={totalFondosData} 
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Entradas vs Salidas (CUP)</h2>
              <Pie data={entradasSalidasData} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Resumen Financiero</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(data).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500">{key}</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {key.includes('USD') ? `$${value}` : `${value} CUP`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'diezmos' && <Diezmos />}

      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

