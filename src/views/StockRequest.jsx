import React, { useState } from 'react';
import { ArrowLeft, Box, Truck, Plus, CheckCircle, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function StockRequest() {
  const { navigateBack, currentUser, medicines, stores, addToast } = useAppContext();
  
  const isVendor = currentUser && currentUser.role === 'vendor';

  // --- VENDOR REPLENISHMENT FORM STATES ---
  const [selectedMedId, setSelectedMedId] = useState(medicines[0]?.id || "");
  const [replenishQty, setReplenishQty] = useState("500");
  const [priority, setPriority] = useState("Normal");
  const [vendorOrders, setVendorOrders] = useState([
    { id: "REP-9104", medName: "Atorvastatin Calcium 20mg", qty: 1000, priority: "High", date: "May 17", status: "Shipped" },
    { id: "REP-8041", medName: "Metformin Hydrochloride 500mg", qty: 2500, priority: "Normal", date: "May 12", status: "Delivered" }
  ]);

  const handleCreateReplenish = (e) => {
    e.preventDefault();
    const target = medicines.find(m => m.id === selectedMedId) || medicines[0];
    const newOrder = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      medName: target ? target.composition : "Generic compound",
      qty: parseInt(replenishQty),
      priority,
      date: "Today",
      status: "Processing"
    };
    setVendorOrders([newOrder, ...vendorOrders]);
    addToast(`Replenishment request submitted to BPPI Central Depot!`, 'success');
  };

  // --- CUSTOMER RESERVATION FORM STATES ---
  const [custMedId, setCustMedId] = useState(medicines[0]?.id || "");
  const [custStoreId, setCustStoreId] = useState(stores[0]?.id || "");
  const [custQty, setCustQty] = useState("2");
  const [pickupTime, setPickupTime] = useState("17:30");
  const [reservedReceipt, setReservedReceipt] = useState(null);

  const handleCreateReservation = (e) => {
    e.preventDefault();
    const targetMed = medicines.find(m => m.id === custMedId) || medicines[0];
    const targetStore = stores.find(s => s.id === custStoreId) || stores[0];
    
    const receipt = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      medName: targetMed ? targetMed.genericName : "Generic Salt",
      storeName: targetStore ? targetStore.name : "Kendra Store",
      qty: custQty,
      time: pickupTime,
      otp: Math.floor(1000 + Math.random() * 9000)
    };

    setReservedReceipt(receipt);
    addToast(`Generic medicine reservation success!`, 'success');
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>
          {isVendor ? "Kendra Replenishment Portal" : "Reserve Generic Medicines"}
        </h3>
      </div>

      {/* --- VENDOR FLOW --- */}
      {isVendor ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Replica order form */}
          <div className="card" style={{ borderColor: 'var(--primary)' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Box size={16} color="var(--primary)" /> Request BPPI Central Depot Supply
            </h4>
            
            <form onSubmit={handleCreateReplenish}>
              <div className="form-group">
                <label className="form-label">Replenish Formulation</label>
                <select className="input-field" value={selectedMedId} onChange={(e) => setSelectedMedId(e.target.value)}>
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.genericName} ({m.composition})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Order Volume (Units)</label>
                  <select className="input-field" value={replenishQty} onChange={(e) => setReplenishQty(e.target.value)}>
                    <option value="500">500 units</option>
                    <option value="1000">1000 units</option>
                    <option value="2500">2500 units</option>
                    <option value="5000">5000 units</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Depot Priority</label>
                  <select className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Normal</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Replenishment Wholesale Order
              </button>
            </form>
          </div>

          {/* Shipment timeline indicator */}
          <div className="card" style={{ padding: '14px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '12px', textTransform: 'uppercase' }}>
              🚚 Depot Shipping Status
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '8px', borderLeft: '2px solid var(--border)', position: 'relative' }}>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '10px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-13px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }} />
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '800', display: 'block', color: 'var(--secondary-dark)' }}>Order Arrived at Koramangala Kendra</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Delivered &bull; May 17, 14:20</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: '10px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-13px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '800', display: 'block' }}>Dispatched from BPPI Depot Bengaluru</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>In Transit &bull; May 16, 09:12</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'start', gap: '10px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-13px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border)' }} />
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '800', display: 'block', color: 'var(--text-light)' }}>Processed by Government Procurement Portal</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Completed &bull; May 15, 17:40</span>
                </div>
              </div>

            </div>
          </div>

          {/* Replenishment logs */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', paddingLeft: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
              Procurement Order Log
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {vendorOrders.map(order => (
                <div 
                  key={order.id} 
                  className="card"
                  style={{
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 0
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: '800', display: 'block' }}>{order.medName}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Order ID: <b>{order.id}</b> &bull; Qty: <b>{order.qty}</b></span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      fontSize: '10px',
                      backgroundColor: order.status === 'Delivered' ? 'var(--secondary-light)' : 'var(--primary-light)',
                      color: order.status === 'Delivered' ? 'var(--secondary-dark)' : 'var(--primary)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: '800'
                    }}>{order.status}</span>
                    <span style={{ fontSize: '9px', display: 'block', color: 'var(--text-light)', marginTop: '2px' }}>{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* --- CUSTOMER FLOW --- */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {!reservedReceipt ? (
            <div className="card" style={{ borderColor: 'var(--secondary)' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={16} color="var(--secondary)" /> Reserve Subs at Government Kendra
              </h4>

              <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '16px' }}>
                Out of stock elsewhere? Select your target generic salt and reserve a strip for pickup at the nearest PMBJP outlet.
              </p>

              <form onSubmit={handleCreateReservation}>
                <div className="form-group">
                  <label className="form-label">Target Generic Substitute</label>
                  <select className="input-field" value={custMedId} onChange={(e) => setCustMedId(e.target.value)}>
                    {medicines.map(m => (
                      <option key={m.id} value={m.id}>{m.genericName} (Alternative to {m.name})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup Kendra Outlet</label>
                  <select className="input-field" value={custStoreId} onChange={(e) => setCustStoreId(e.target.value)}>
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.distance} km)</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Quantity (Strips)</label>
                    <select className="input-field" value={custQty} onChange={(e) => setCustQty(e.target.value)}>
                      <option>1 Strip</option>
                      <option>2 Strips</option>
                      <option>5 Strips</option>
                      <option>10 Strips</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Pickup Time Today</label>
                    <input type="time" className="input-field" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                  </div>
                </div>

                <button type="submit" className="btn btn-secondary">
                  Lock Medicine Reservation
                </button>
              </form>
            </div>
          ) : (
            <div className="card fade-in" style={{ padding: '24px 16px', borderColor: 'var(--secondary)' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '8px'
                }}>
                  ✅
                </div>
                <h3 style={{ fontSize: '16px', color: 'var(--secondary-dark)' }}>Reservation Locked!</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Kendra reservation receipt generated</span>
              </div>

              {/* Receipt mockup */}
              <div style={{
                backgroundColor: 'var(--surface-alt)',
                border: '1px dashed var(--border)',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Reservation ID:</span>
                  <b>{reservedReceipt.id}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Generic Drug:</span>
                  <b>{reservedReceipt.medName}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Reserve Outlet:</span>
                  <b>{reservedReceipt.storeName}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Order volume:</span>
                  <b>{reservedReceipt.qty}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Scheduled Pickup:</span>
                  <b>{reservedReceipt.time} (Today)</b>
                </div>

                <div style={{ 
                  borderTop: '1px dashed var(--border)', 
                  paddingTop: '10px', 
                  marginTop: '6px', 
                  textAlign: 'center' 
                }}>
                  <span style={{ fontSize: '10px', display: 'block', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                    Kendra verification pickup code
                  </span>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)', letterSpacing: '2px' }}>
                    {reservedReceipt.otp}
                  </span>
                  <span style={{ fontSize: '9px', display: 'block', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Provide this secure OTP to the Kendra pharmacist for verification.
                  </span>
                </div>
              </div>

              <button className="btn btn-secondary" onClick={() => setReservedReceipt(null)}>
                Reserve Another Strip
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
