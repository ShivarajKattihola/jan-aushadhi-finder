import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Navigation, Phone, MapPin, CheckCircle, Clock, Star, Landmark } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import MockMap from '../components/MockMap';

// High-fidelity state-district cascading mock data
const STATE_DISTRICT_MAP = {
  "Karnataka": ["Bengaluru", "Mysore", "Mangalore"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Delhi": ["Central Delhi", "South Delhi", "West Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"]
};

export default function StoreLocator() {
  const { stores, navigateBack, favoriteStores, toggleFavoriteStore, navigateTo } = useAppContext();
  
  // --- SEARCH AND FILTER STATES ---
  const [selectedState, setSelectedState] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [pincodeQuery, setPincodeQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");

  const [filteredStores, setFilteredStores] = useState(stores);
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  // Handle cascading state district changes
  const availableDistricts = selectedState !== "All" ? STATE_DISTRICT_MAP[selectedState] : [];

  useEffect(() => {
    let result = stores;

    // Filter by State
    if (selectedState !== "All") {
      result = result.filter(store => {
        // Mock state assignment based on address or city
        if (selectedState === "Karnataka") return store.city === "Bengaluru";
        return false; // other states simulated
      });
    }

    // Filter by District
    if (selectedDistrict !== "All") {
      result = result.filter(store => {
        if (selectedDistrict === "Bengaluru") return store.city === "Bengaluru";
        return false;
      });
    }

    // Filter by Pincode text
    if (pincodeQuery.trim()) {
      result = result.filter(store => store.pincode.includes(pincodeQuery.trim()));
    }

    // Filter by Store Name / Area text
    if (nameQuery.trim()) {
      const cleanName = nameQuery.toLowerCase().trim();
      result = result.filter(store => 
        store.name.toLowerCase().includes(cleanName) || 
        store.address.toLowerCase().includes(cleanName)
      );
    }

    setFilteredStores(result);
    
    if (result.length > 0) {
      setSelectedStore(result[0]);
    } else {
      setSelectedStore(null);
    }
  }, [selectedState, selectedDistrict, pincodeQuery, nameQuery, stores]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict("All"); // Reset district when state changes
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>Jan-Aushadhi Kendra Locator</h3>
      </div>

      {/* --- GEOGRAPHIC CASCADING DROPDOWNS PANEL --- */}
      <div className="card" style={{ padding: '12px 14px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 0 4px 0' }}>
          <Landmark size={13} color="var(--primary)" /> Official PMBJP Kendra Locator
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {/* State Selector */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '10px', marginBottom: '4px' }}>Select State</label>
            <select className="input-field" style={{ height: '32px', padding: '4px 8px', fontSize: '12px' }} value={selectedState} onChange={handleStateChange}>
              <option value="All">All States</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra (Simulated)</option>
              <option value="Delhi">Delhi (Simulated)</option>
              <option value="Tamil Nadu">Tamil Nadu (Simulated)</option>
            </select>
          </div>

          {/* District Selector */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '10px', marginBottom: '4px' }}>Select District</label>
            <select 
              className="input-field" 
              style={{ height: '32px', padding: '4px 8px', fontSize: '12px' }} 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={selectedState === "All"}
            >
              <option value="All">All Districts</option>
              {availableDistricts.map((dist, i) => (
                <option key={i} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Pincode & Name Filters Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '8px', marginTop: '4px' }}>
          {/* Pincode Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="input-field"
              style={{ height: '32px', fontSize: '12px', paddingLeft: '8px' }}
              placeholder="Enter Pincode (e.g. 560038)"
              value={pincodeQuery}
              onChange={(e) => setPincodeQuery(e.target.value)}
            />
          </div>

          {/* Name Query Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="input-field"
              style={{ height: '32px', fontSize: '12px', paddingLeft: '28px' }}
              placeholder="Search store name/area..."
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
            />
            <Search size={12} color="var(--text-light)" style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
          </div>
        </div>
      </div>

      {/* Dynamic Map Component */}
      {filteredStores.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <MockMap 
            stores={filteredStores} 
            selectedStore={selectedStore} 
            onSelectStore={(store) => setSelectedStore(store)} 
          />
        </div>
      )}

      {/* Nearest stores list */}
      <div>
        <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '10px', paddingLeft: '4px', textTransform: 'uppercase' }}>
          Govt Kendra Outlets ({filteredStores.length})
        </h4>

        {filteredStores.length > 0 ? (
          filteredStores.map((store) => {
            const isSelected = selectedStore && selectedStore.id === store.id;
            return (
              <div 
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className="card card-interactive"
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                  borderLeft: isSelected ? '4px solid var(--primary)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{store.name}</h4>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>Pincode: {store.pincode}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteStore(store.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: favoriteStores.includes(store.id) ? '#F59E0B' : 'var(--text-light)',
                        cursor: 'pointer',
                        padding: '2px'
                      }}
                    >
                      <Star size={14} fill={favoriteStores.includes(store.id) ? '#F59E0B' : 'transparent'} />
                    </button>
                    <span className="generic-badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary-dark)' }}>
                      {store.distance} km
                    </span>
                  </div>
                </div>
                
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  {store.address}
                </p>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '11px', color: 'var(--text-light)', marginBottom: isSelected ? '10px' : 0 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {store.timings}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: store.isOpen ? 'var(--secondary-dark)' : 'var(--error)' }}>
                    <CheckCircle size={12} /> {store.isOpen ? "Open Now" : "Closed"}
                  </span>
                  <span className="generic-badge" style={{ 
                    backgroundColor: store.stockStatus === 'High Stock' ? 'var(--secondary-light)' : 'var(--error-light)', 
                    color: store.stockStatus === 'High Stock' ? 'var(--secondary-dark)' : 'var(--error)',
                    margin: 0
                  }}>
                    {store.stockStatus}
                  </span>
                </div>

                {isSelected && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    borderTop: '1px solid var(--border)', 
                    paddingTop: '10px', 
                    marginTop: '10px' 
                  }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ flex: 1, padding: '6px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: 0, height: '32px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.lat || 12.93},${store.lng || 77.61}`);
                      }}
                    >
                      <Navigation size={12} /> Route
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      style={{ flex: 1, padding: '6px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: 0, height: '32px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${store.phone || '18001808080'}`);
                      }}
                    >
                      <Phone size={12} /> Call
                    </button>
                    <button 
                      className="btn btn-primary" 
                      style={{ flex: 1.3, padding: '6px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: 0, height: '32px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('stock_request');
                      }}
                    >
                      Reserve Stock
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No government stores found matching pincode or area query.</p>
          </div>
        )}
      </div>

    </div>
  );
}
