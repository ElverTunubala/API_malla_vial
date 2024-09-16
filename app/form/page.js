"use client";

import SegmentComponent from '../components/Segment.jsx';
import BordilloComponent from '../components/bordillo.jsx';
import CardsegmentComponent from '../components/cardsegment.jsx';

import { useState } from 'react';

export default function FormPage() {
  const [segments, setSegments] = useState([]);

  // Maneja la actualización de la lista de segmentos
  const handleSegmentsFetched = (fetchedSegments) => {
    setSegments(fetchedSegments);
  };

  return (
    <div className="container mt-5">
      <h1>Form Segment</h1>
      <div className="row">
        <div className="col-md-6">
          <SegmentComponent onSegmentsFetched={handleSegmentsFetched} />
        </div>
        <div className="col-md-6">
          <CardsegmentComponent segments={segments} setSegments={setSegments} />
        </div>
      </div>
      <h1>Form Bordillo</h1>
      <BordilloComponent />
    </div>
  );
}
