import React, { useState, useEffect } from 'react';
import { Search, Plus, Sparkles, MessageSquare, TrendingUp, AlertCircle, ShoppingBag, Edit, Award, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AnalyticsChart from '../components/AnalyticsChart';

export default function VendorDashboard() {
  const { 
    inventory, 
    stats, 
    reviews, 
    addInventoryItem, 
    updateInventoryItem,
    addToast
  } = useAppContext();

  // Inventory filter
  const [searchVal, setSearchVal] = useState("");
  const [filteredInventory, setFilteredInventory] = useState(inventory);
  
  // Modals / Drawer toggles
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [medName, setMedName] = useState("");
  const [medCat, setMedCat] = useState("Cardiovascular");
  const [medPrice, setMedPrice] = useState("");
  const [medStock, setMedStock] = useState("");
  const [medMin, setMedMin] = useState("20");
  const [medLoc, setMedLoc] = useState("");

  // Keep inventory list filtered
  useEffect(() => {
    const cleanQ = searchVal.toLowerCase().trim();
    if (!cleanQ) {
      setFilteredInventory(inventory);
      return;
    }
    setFilteredInventory(inventory.filter(item => 
      item.name.toLowerCase().includes(cleanQ) || 
      item.category.toLowerCase().includes(cleanQ) ||
      item.location.toLowerCase().includes(cleanQ)
    ));
  }, [searchVal, inventory]);

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setMedName(item.name);
    setMedCat(item.category);
    setMedPrice(item.price.toString());
    setMedStock(item.stock.toString());
    setMedMin(item.minStock.toString());
    setMedLoc(item.location);
    setEditModalOpen(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!medName || !medPrice || !medStock) {
      addToast("Fill in mandatory details", "error");
      return;
    }
    addInventoryItem({
      name: medName,
      category: medCat,
      price: parseFloat(medPrice),
      stock: parseInt(medStock),
      minStock: parseInt(medMin),
      location: medLoc || "Shelf X"
    });
    resetForm();
    setAddModalOpen(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    updateInventoryItem({
      id: selectedItem.id,
      name: medName,
      category: medCat,
      price: parseFloat(medPrice),
      stock: parseInt(medStock),
      minStock: parseInt(medMin),
      location: medLoc
    });
    setEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setMedName("");
    setMedCat("Cardiovascular");
    setMedPrice("");
    setMedStock("");
    setMedMin("20");
    setMedLoc("");
    setSelectedItem(null);
  };

  // Pulse animation selector based on stock level
  const getStockPulseColor = (stock, min) => {
    if (stock <= 0) return 'pulse-red';
    if (stock < min) return 'pulse-amber';
    return '';
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Brand title bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 10px 0', marginBottom: '8px' }}>
        <div>
          <span className="label-md" style={{ color: 'var(--primary)', fontWeight: '700' }}>GOVERNMENT PHARMA PORTAL</span>
          <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Kendra Management</h3>
        </div>
        <span className="pulse-indicator" />
      </div>

      {/* Analytics KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        
        {/* Sales Card */}
        <div className="card" style={{ padding: '10px 12px', margin: 0 }}>
          <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Total Sales (INR)
          </span>
          <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '2px 0 4px 0', color: 'var(--primary)' }}>
            ₹{stats.totalSales.toLocaleString()}
          </h4>
          <span style={{ fontSize: '9px', color: 'var(--secondary-dark)', fontWeight: '700' }}>
            📈 +14.2% weekly peak
          </span>
        </div>

        {/* Stock Card */}
        <div className="card" style={{ padding: '10px 12px', margin: 0 }}>
          <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Active Stock
          </span>
          <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '2px 0 4px 0', color: 'var(--text-main)' }}>
            {stats.totalStockCount} Units
          </h4>
          <span style={{ fontSize: '9px', color: 'var(--text-light)' }}>
            Across {inventory.length} formulations
          </span>
        </div>

        {/* Chat Card */}
        <div className="card" style={{ padding: '10px 12px', margin: 0 }} onClick={() => addToast("WhatsApp support line active", "info")}>
          <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
            WhatsApp Chats <span className="pulse-indicator" />
          </span>
          <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '2px 0 4px 0', color: 'var(--secondary)' }}>
            {stats.activeChats} Patients
          </h4>
          <span style={{ fontSize: '9px', color: 'var(--secondary-dark)', fontWeight: '700' }}>
            💬 100% response rating
          </span>
        </div>

        {/* Rating Card */}
        <div className="card" style={{ padding: '10px 12px', margin: 0 }}>
          <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Average Rating
          </span>
          <h4 style={{ fontSize: '18px', fontWeight: '800', margin: '2px 0 4px 0', color: 'var(--accent)' }}>
            ★ {stats.avgRating} / 5
          </h4>
          <span style={{ fontSize: '9px', color: 'var(--text-light)' }}>
            Verified customer reviews
          </span>
        </div>

      </div>

      {/* Weekly Sales Chart Card */}
      <div className="card" style={{ padding: '14px', marginBottom: '16px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px' }}>
          WEEKLY DISPENSARY REVENUE
        </h4>
        <AnalyticsChart data={stats.weeklySalesData} />
      </div>

      {/* Live review feed ticker */}
      <div className="card" style={{ padding: '12px 14px', marginBottom: '16px', background: 'var(--surface-alt)', borderLeft: '4px solid var(--accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--accent-light)', backgroundColor: 'var(--accent)', color: '#ffffff', padding: '1px 6px', borderRadius: '4px' }}>
            LIVE FEEDBACK
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>{reviews[0].date}</span>
        </div>
        <p style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
          "<b>{reviews[0].userName}:</b> {reviews[0].comment.substring(0, 80)}..."
        </p>
      </div>

      {/* Cloud-Synced Inventory Console */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 4px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)' }}>
            CLOUDSYNCED INVENTORY ({inventory.length})
          </h4>
          <button 
            className="btn btn-primary" 
            style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
            onClick={() => setAddModalOpen(true)}
          >
            <Plus size={14} /> Add Stock
          </button>
        </div>

        {/* Inventory Search bar */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '40px' }}
            placeholder="Search stock by compound, location..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Search size={16} color="var(--text-light)" style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
        </div>

        {/* Inventory Rows */}
        <div>
          {filteredInventory.map((item) => (
            <div 
              key={item.id} 
              className="card"
              style={{
                borderColor: item.stock <= 0 ? 'var(--error)' : item.stock < item.minStock ? 'var(--accent)' : 'var(--border)',
                padding: '12px 14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    {/* Pulsing indicator */}
                    <span className={`pulse-indicator ${getStockPulseColor(item.stock, item.minStock)}`} />
                    <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>{item.name}</h5>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-light)', display: 'flex', gap: '10px' }}>
                    <span>{item.category}</span>
                    <span>•</span>
                    <span>Loc: <b>{item.location}</b></span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block' }}>Live Stock</span>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '800', 
                    color: item.stock <= 0 ? 'var(--error)' : item.stock < item.minStock ? 'var(--accent)' : 'var(--secondary-dark)' 
                  }}>
                    {item.stock} units
                  </span>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderTop: '1px solid var(--border)', 
                paddingTop: '8px', 
                marginTop: '8px',
                fontSize: '11px'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>Updated: <b>{item.lastUpdated}</b></span>
                
                <button 
                  onClick={() => handleOpenEdit(item)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--primary)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <Edit size={12} /> Adjust Stock
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- ADD PRODUCT DRAWER MODAL --- */}
      {addModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(9, 28, 53, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end'
        }} onClick={() => setAddModalOpen(false)}>
          
          <div 
            className="card slide-in-up" 
            style={{ width: '100%', maxWidth: '410px', margin: 0, borderRadius: '20px 20px 0 0', padding: '24px 16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px' }}>Add Stock to Firestore</h3>
              <button className="btn-icon-only" style={{ border: 'none' }} onClick={() => setAddModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Formulation Name (Generic Salt)</label>
                <input 
                  type="text" 
                  value={medName} 
                  onChange={(e) => setMedName(e.target.value)} 
                  className="input-field" 
                  placeholder="e.g. Paracetamol, Metformin..." 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Category</label>
                  <select className="input-field" value={medCat} onChange={(e) => setMedCat(e.target.value)}>
                    <option>Cardiovascular</option>
                    <option>Antibiotics</option>
                    <option>Diabetes</option>
                    <option>Analgesics</option>
                    <option>Gastrointestinal</option>
                    <option>Respiratory</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Gov Price (per unit)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={medPrice} 
                    onChange={(e) => setMedPrice(e.target.value)} 
                    className="input-field" 
                    placeholder="₹0.50" 
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Initial Stock Level</label>
                  <input 
                    type="number" 
                    value={medStock} 
                    onChange={(e) => setMedStock(e.target.value)} 
                    className="input-field" 
                    placeholder="500" 
                    required 
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Min Stock Threshold</label>
                  <input 
                    type="number" 
                    value={medMin} 
                    onChange={(e) => setMedMin(e.target.value)} 
                    className="input-field" 
                    placeholder="50" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Shelf Location</label>
                <input 
                  type="text" 
                  value={medLoc} 
                  onChange={(e) => setMedLoc(e.target.value)} 
                  className="input-field" 
                  placeholder="e.g. Rack A-3" 
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Sync Stock with Cloud
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT PRODUCT DRAWER MODAL --- */}
      {editModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(9, 28, 53, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end'
        }} onClick={() => setEditModalOpen(false)}>
          
          <div 
            className="card slide-in-up" 
            style={{ width: '100%', maxWidth: '410px', margin: 0, borderRadius: '20px 20px 0 0', padding: '24px 16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '16px' }}>Adjust Stock Levels</h3>
              <button className="btn-icon-only" style={{ border: 'none' }} onClick={() => setEditModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label className="form-label">Generic Salt</label>
                <input type="text" className="input-field" value={medName} disabled />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Adjust Stock Count</label>
                  <input 
                    type="number" 
                    value={medStock} 
                    onChange={(e) => setMedStock(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Price per tablet</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={medPrice} 
                    onChange={(e) => setMedPrice(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Warning Threshold</label>
                  <input 
                    type="number" 
                    value={medMin} 
                    onChange={(e) => setMedMin(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Shelf Location</label>
                  <input 
                    type="text" 
                    value={medLoc} 
                    onChange={(e) => setMedLoc(e.target.value)} 
                    className="input-field" 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Update Stock Levels
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
