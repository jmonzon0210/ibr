import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, MagnifyingGlassIcon, DocumentIcon } from '@heroicons/react/24/outline';

const Diezmos = () => {
  const [diezmos, setDiezmos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [mostrarModalMiembro, setMostrarModalMiembro] = useState(false);
  const [mostrarModalMonto, setMostrarModalMonto] = useState(false);
  const [mostrarModalHistorial, setMostrarModalHistorial] = useState(false);
  const [nuevoMonto, setNuevoMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Fecha actual

  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);

  useEffect(() => {
    // Aquí podrías cargar los diezmos desde una API o base de datos
    const diezmosIniciales = [
      { id: 1, nombre: 'Juan Pérez', monto: 100, donaciones: [{ monto: 50, fecha: '2024-11-15' }] },
      { id: 2, nombre: 'María García', monto: 150, donaciones: [{ monto: 100, fecha: '2024-11-10' }] },
      { id: 3, nombre: 'Carlos Rodríguez', monto: 200, donaciones: [{ monto: 150, fecha: '2024-11-05' }] },
    ];
    setDiezmos(diezmosIniciales);
  }, []);

  const agregarMiembro = () => {
    setMostrarModalMiembro(true);
  };

  const agregarNuevoMiembro = () => {
    if (nuevoNombre.trim() !== '') {
      const nuevoId = Math.max(...diezmos.map(d => d.id), 0) + 1;
      const nuevoDiezmo = { id: nuevoId, nombre: nuevoNombre, monto: 0, donaciones: [] };
      setDiezmos([...diezmos, nuevoDiezmo]);
      setNuevoNombre('');
      setMostrarModalMiembro(false);
    }
  };

  const eliminarNombre = (id) => {
    setDiezmos(diezmos.filter(d => d.id !== id));
  };

  const agregarMonto = (id) => {
    setMiembroSeleccionado(id);
    setMostrarModalMonto(true);
  };

  const confirmarMonto = () => {
    if (nuevoMonto.trim() !== '' && !isNaN(nuevoMonto)) {
      setDiezmos(diezmos.map(d => 
        d.id === miembroSeleccionado 
        ? { ...d, monto: d.monto + parseFloat(nuevoMonto), donaciones: [...d.donaciones, { monto: nuevoMonto, fecha }] }
        : d
      ));
      setNuevoMonto('');
      setFecha(new Date().toISOString().split('T')[0]);
      setMostrarModalMonto(false);
    }
  };

  const verHistorial = (id) => {
    setMiembroSeleccionado(id);
    setMostrarModalHistorial(true);
  };

  const diezmosFiltrados = diezmos.filter(d => 
    d.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Registro de Diezmos</h1>
      
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="p-2 border rounded-l-md flex-grow"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-md">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      <button onClick={agregarMiembro} className="bg-green-500 text-white p-2 mb-4 rounded-md">
        Agregar Miembro
      </button>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th> {/* Nueva columna para ID */}
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Monto Total</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {diezmosFiltrados.map((diezmo) => (
            <tr key={diezmo.id}>
              <td className="border p-2">{diezmo.id}</td> {/* Mostrar el ID */}
              <td className="border p-2">{diezmo.nombre}</td>
              <td className="border p-2">${diezmo.monto}</td>
              <td className="border p-2">
                <div className="flex justify-center space-x-2">
                  <button 
                    onClick={() => agregarMonto(diezmo.id)} 
                    className="bg-blue-500 text-white p-1 rounded"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => verHistorial(diezmo.id)} 
                    className="bg-yellow-500 text-white p-1 rounded"
                  >
                    <DocumentIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => eliminarNombre(diezmo.id)} className="bg-red-500 text-white p-1 rounded">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar un nuevo miembro */}
      {mostrarModalMiembro && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Miembro</h2>
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              placeholder="Nombre del nuevo miembro"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setMostrarModalMiembro(false)} 
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancelar
              </button>
              <button 
                onClick={agregarNuevoMiembro} 
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Agregar Miembro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar monto */}
      {mostrarModalMonto && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Agregar Monto</h2>
            <input
              type="number"
              value={nuevoMonto}
              onChange={(e) => setNuevoMonto(e.target.value)}
              placeholder="Cantidad diezmada"
              className="w-full p-2 border rounded-md mb-4"
            />
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setMostrarModalMonto(false)} 
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarMonto} 
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Agregar Monto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver historial */}
      {mostrarModalHistorial && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Historial de Donaciones</h2>
            <table className="w-full border-collapse border mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Fecha</th>
                  <th className="border p-2">Monto</th>
                </tr>
              </thead>
              <tbody>
                {diezmos.find(d => d.id === miembroSeleccionado)?.donaciones.map((donacion, index) => (
                  <tr key={index}>
                    <td className="border p-2">{donacion.fecha}</td>
                    <td className="border p-2">${donacion.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button 
                onClick={() => setMostrarModalHistorial(false)} 
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diezmos;
