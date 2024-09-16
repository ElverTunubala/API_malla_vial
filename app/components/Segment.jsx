"use client";

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SegmentComponent({ onSegmentsFetched }) {
  const [number, setNumber] = useState('');
  const [length, setLength] = useState('');
  const [directionNomenclature, setDirectionNomenclature] = useState('');

  // Maneja el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const data = {
      number,
      length: parseFloat(length), // se debe enviar un float
      directionNomenclature
    };

    try {
      const response = await fetch('http://localhost:9000/segments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      // para limpiar los campos del formulario
      setNumber('');
      setLength('');
      setDirectionNomenclature('');

    } catch (error) {
      console.error('Error:', error);
    }
  };
  // solicitud para listar los segmentos
  const handleListClick = async () => {
    try {
      const response = await fetch('http://localhost:9000/segments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      // Llama a la función proporcionada para actualizar la lista de segmentos
      if (onSegmentsFetched) {
        onSegmentsFetched(result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Number
        </label>
        <input
          type="text"
          className="form-control"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="length" className="form-label">
          Length
        </label>
        <input
          type="number"
          className="form-control"
          id="length"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="directionNomenclature" className="form-label">
          Direction Nomenclature
        </label>
        <input
          type="text"
          className="form-control"
          id="directionNomenclature"
          value={directionNomenclature}
          onChange={(e) => setDirectionNomenclature(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <div className="btn " ></div>
      <button type="button" className="btn btn-secondary" onClick={handleListClick}>
        Listar
      </button>
    </form>
  );
}
