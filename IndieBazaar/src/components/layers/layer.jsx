import React from 'react';
import './layer.css';

const Layer = () => {
  return (
    <div className="layer-container">
      <div className="layer-card layer-1">
        <div className="layer-title">Layer 1</div>
        <div className="layer-content">Content for Layer 1</div>
      </div>
      <div className="layer-card layer-2">
        <div className="layer-title">Layer 2</div>
        <div className="layer-content">Content for Layer 2</div>
      </div>
      <div className="layer-card layer-3">
        <div className="layer-title">Layer 3</div>
        <div className="layer-content">Content for Layer 3</div>
      </div>
      {/* Add more layers as needed */}
    </div>
  );
};

export default Layer;
