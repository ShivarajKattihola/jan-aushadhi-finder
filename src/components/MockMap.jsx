import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Award } from 'lucide-react';

export default function MockMap({ stores, selectedStore, onSelectStore }) {
  const canvasRef = useRef(null);
  const [hoveredPin, setHoveredPin] = useState(null);

  // Custom visual city mapping simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear and draw clinical theme layout
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Draw soft grass grid
    ctx.fillStyle = '#EBF1F8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle grid lines
    ctx.strokeStyle = '#D1D9E6';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // 2. Draw a river/canal (aesthetic touch)
    ctx.fillStyle = '#CADBFC';
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.bezierCurveTo(150, 40, 200, 180, canvas.width, 130);
    ctx.lineTo(canvas.width, 160);
    ctx.bezierCurveTo(200, 210, 150, 70, 0, 80);
    ctx.closePath();
    ctx.fill();

    // 3. Draw primary roads (grid structure)
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Main Avenue
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, canvas.height);
    ctx.stroke();

    // Park Road
    ctx.beginPath();
    ctx.moveTo(0, 260);
    ctx.lineTo(canvas.width, 260);
    ctx.stroke();

    // Secondary Roads
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(220, 0);
    ctx.lineTo(220, canvas.height);
    ctx.moveTo(0, 100);
    ctx.lineTo(canvas.width, 100);
    ctx.stroke();

    // 4. Draw road markings (dashes)
    ctx.strokeStyle = '#D1D9E6';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, canvas.height);
    ctx.moveTo(220, 0);
    ctx.lineTo(220, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Draw green hospital/park zone
    ctx.fillStyle = '#D3F4DF';
    ctx.fillRect(80, 120, 100, 90);
    ctx.strokeStyle = '#00A651';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, 120, 100, 90);
    
    ctx.fillStyle = '#00A651';
    ctx.font = '10px Public Sans';
    ctx.fillText('Jan-Aushadhi Park', 90, 170);

    // 6. Draw clickable store pins
    stores.forEach((store, idx) => {
      // Map lat/lng coordinates to Canvas pixels
      const x = 50 + ((store.lng - 77.55) * 1500) % (canvas.width - 100);
      const y = 50 + ((store.lat - 12.9) * 1500) % (canvas.height - 100);
      
      const isSelected = selectedStore && selectedStore.id === store.id;
      
      // Pin outer glowing boundary
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 18 : 12, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? 'rgba(0, 94, 184, 0.2)' : 'rgba(0, 166, 81, 0.15)';
      ctx.fill();
      
      // Pin body
      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 9 : 6, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? '#005EB8' : '#00A651';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

  }, [stores, selectedStore]);

  // Click listener for Canvas element
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Detect if close to any store coordinates
    stores.forEach((store) => {
      const x = 50 + ((store.lng - 77.55) * 1500) % (canvas.width - 100);
      const y = 50 + ((store.lat - 12.9) * 1500) % (canvas.height - 100);
      
      const dist = Math.hypot(clickX - x, clickY - y);
      if (dist < 18) {
        onSelectStore(store);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="map-canvas" style={{ height: '260px' }}>
        <canvas
          ref={canvasRef}
          width={378}
          height={260}
          onClick={handleCanvasClick}
          style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'block' }}
        />
        
        {/* Helper overlay */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'var(--surface)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          border: '1px solid var(--border)'
        }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00A651' }} />
          Active Kendras
        </div>
      </div>

      {selectedStore && (
        <div className="card fade-in" style={{ borderColor: 'var(--primary)', borderLeft: '4px solid var(--primary)', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
            <div>
              <span className="generic-badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '4px', display: 'inline-block' }}>
                Store Found ({selectedStore.distance} km away)
              </span>
              <h4 style={{ fontSize: '15px', color: 'var(--text-main)' }}>{selectedStore.name}</h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className={`pulse-indicator ${selectedStore.isOpen ? '' : 'pulse-red'}`} />
              <span style={{ fontSize: '11px', fontWeight: '700', color: selectedStore.isOpen ? 'var(--secondary)' : 'var(--error)' }}>
                {selectedStore.isOpen ? 'OPEN NOW' : 'CLOSED'}
              </span>
            </div>
          </div>
          
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>{selectedStore.address}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
            <a href={`tel:${selectedStore.phone}`} className="btn btn-secondary" style={{ padding: '8px', fontSize: '12px' }}>
              <Phone size={14} /> Call Kendra
            </a>
            <button 
              onClick={() => {
                alert(`Routing to Kendra: Start navigating via Google Maps directions to ${selectedStore.name}`);
              }} 
              className="btn btn-primary" 
              style={{ padding: '8px', fontSize: '12px' }}
            >
              <Navigation size={14} /> Directions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
