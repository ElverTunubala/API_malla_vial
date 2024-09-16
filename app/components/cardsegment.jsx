"use client"; //componente cliente
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CardsegmentComponent({ segments, setSegments }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [updatedNumber, setUpdatedNumber] = useState('');
  const [updatedLength, setUpdatedLength] = useState('');
  const [updatedDirectionNomenclature, setUpdatedDirectionNomenclature] = useState('');

  // Función para eliminar un segmento
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/segments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Actualiza la lista de segmentos después de eliminar uno
      setSegments((prevSegments) => prevSegments.filter(segment => segment.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Función para manejar la apertura del modal y cargar los datos del segmento a actualizar
  const handleUpdateClick = (segment) => {
    setSelectedSegment(segment);
    setUpdatedNumber(segment.number);
    setUpdatedLength(segment.length);
    setUpdatedDirectionNomenclature(segment.directionNomenclature);
    setIsModalOpen(true);
  };

  // Función para manejar la actualización del segmento
  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedData = {
      number: updatedNumber,
      length: parseFloat(updatedLength),
      directionNomenclature: updatedDirectionNomenclature,
    };

    try {
      const response = await fetch(`http://localhost:9000/segments/${selectedSegment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Update success:', result);

      // Actualiza la lista de segmentos después de la actualización
      setSegments((prevSegments) =>
        prevSegments.map((segment) =>
          segment.id === selectedSegment.id ? { ...segment, ...updatedData } : segment
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <ul className="list-group list-group-flush">
          {segments.length > 0 ? (
            segments.map((segment) => (
              <li key={segment.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>Number:</strong> {segment.number} <br />
                  <strong>Length:</strong> {segment.length} <br />
                  <strong>Direction Nomenclature:</strong> {segment.directionNomenclature}
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdateClick(segment)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(segment.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No segments available</li>
          )}
        </ul>
      </div>

      {/* Modal para actualizar segmento */}
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Segmento</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label htmlFor="updatedNumber" className="form-label">
                      Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedNumber"
                      value={updatedNumber}
                      onChange={(e) => setUpdatedNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updatedLength" className="form-label">
                      Length
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="updatedLength"
                      value={updatedLength}
                      onChange={(e) => setUpdatedLength(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updatedDirectionNomenclature" className="form-label">
                      Direction Nomenclature
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="updatedDirectionNomenclature"
                      value={updatedDirectionNomenclature}
                      onChange={(e) => setUpdatedDirectionNomenclature(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Actualizar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
