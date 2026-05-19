import React, { useState } from 'react';
import { ArrowLeft, Landmark, HeartPulse, Check, Sparkles, TrendingDown, BarChart2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function SavingsCalculator() {
  const { navigateBack, medicines } = useAppContext();
  
  // Interactive Monthly Brand Expense
  const [monthlyBrandCost, setMonthlyBrandCost] = useState(2500);

  // Substitute catalog check states
  const [selectedMedId, setSelectedMedId] = useState(medicines[0]?.id || "");
  const [stripCount, setStripCount] = useState(2);

  // Brand vs Generic calculations
  const avgGenericCost = monthlyBrandCost * 0.15; // 85% average savings
  const monthlySaved = monthlyBrandCost - avgGenericCost;
  const annualSaved = monthlySaved * 12;

  // Selected med substitution splits
  const targetMed = medicines.find(m => m.id === selectedMedId) || medicines[0];
  const itemBrandTotal = targetMed ? targetMed.brandPrice * stripCount : 0;
  const itemGenericTotal = targetMed ? targetMed.genericPrice * stripCount : 0;
  const itemSaved = itemBrandTotal - itemGenericTotal;
  const itemSavedPct = targetMed ? targetMed.savingsPct : 0;

  // Calculate chart scale
  const maxCost = monthlyBrandCost * 12;

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>Savings Calculator</h3>
      </div>

      {/* Monthly Expense Gauge Card */}
      <div className="card" style={{ borderColor: 'var(--secondary)' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Landmark size={16} color="var(--secondary)" /> Estimate Monthly Drug Bills
        </h4>
        
        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '16px' }}>
          Slide the bar to enter your current monthly branded medicine expenditures to compute your generic discount equivalent.
        </p>

        {/* Cost input and slider */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700' }}>Branded Monthly Cost</span>
          <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text-main)' }}>
            ₹{monthlyBrandCost.toLocaleString()}
          </span>
        </div>

        <input 
          type="range" 
          min="500" 
          max="10000" 
          step="250"
          value={monthlyBrandCost} 
          onChange={(e) => setMonthlyBrandCost(parseInt(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--secondary)',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        />

        {/* Brand vs Generic side-by-side comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          backgroundColor: 'var(--surface-alt)',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          marginBottom: '16px'
        }}>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase' }}>
              Branded Cost
            </span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{monthlyBrandCost.toFixed(2)}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: 'var(--secondary-dark)', display: 'block', textTransform: 'uppercase', fontWeight: '800' }}>
              Generic cost
            </span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--secondary-dark)' }}>
              ₹{avgGenericCost.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Savings results header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px', marginBottom: '8px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Monthly Savings</span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-main)', display: 'block' }}>
              ₹{monthlySaved.toFixed(2)}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: 'var(--secondary-dark)', fontWeight: '800' }}>Annual Savings</span>
            <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--secondary-dark)', display: 'block' }}>
              ₹{annualSaved.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* --- VISUAL MONTHLY & YEARLY SAVINGS CHART --- */}
      <div className="card">
        <h4 style={{ fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart2 size={16} color="var(--primary)" /> Cumulative Expense Comparison
        </h4>

        {/* Dynamic HTML Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px 0' }}>
          {/* Monthly Comparison */}
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>Monthly Cost Comparison</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Branded Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '50px', fontSize: '10px', color: 'var(--text-muted)' }}>Branded</span>
                <div style={{ flex: 1, backgroundColor: 'var(--surface-alt)', borderRadius: '4px', height: '14px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--text-light)', width: '100%', height: '100%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', width: '60px', textAlign: 'right' }}>₹{monthlyBrandCost}</span>
              </div>

              {/* Generic Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '50px', fontSize: '10px', color: 'var(--text-muted)' }}>Generic</span>
                <div style={{ flex: 1, backgroundColor: 'var(--surface-alt)', borderRadius: '4px', height: '14px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--secondary-dark)', width: '15%', height: '100%', transition: 'width 0.3s ease' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--secondary-dark)', width: '60px', textAlign: 'right' }}>₹{avgGenericCost.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Yearly Comparison */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>Projected Yearly Costs</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Branded Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '50px', fontSize: '10px', color: 'var(--text-muted)' }}>Branded</span>
                <div style={{ flex: 1, backgroundColor: 'var(--surface-alt)', borderRadius: '4px', height: '14px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--text-light)', width: '100%', height: '100%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', width: '60px', textAlign: 'right' }}>₹{(monthlyBrandCost * 12).toLocaleString()}</span>
              </div>

              {/* Generic Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '50px', fontSize: '10px', color: 'var(--text-muted)' }}>Generic</span>
                <div style={{ flex: 1, backgroundColor: 'var(--surface-alt)', borderRadius: '4px', height: '14px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: 'var(--secondary-dark)', width: '15%', height: '100%' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--secondary-dark)', width: '60px', textAlign: 'right' }}>₹{(avgGenericCost * 12).toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-world savings value converter */}
      <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-light)', paddingLeft: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
        Real-world Savings Power
      </h4>
      
      <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
          With an annual generic savings of <b>₹{annualSaved.toLocaleString(undefined, {minimumFractionDigits: 2})}</b>, you can secure valuable healthcare resources for your family:
        </p>

        {/* Benefit 1 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: annualSaved >= 5000 ? 1 : 0.4 }}>
          <div style={{ color: 'var(--secondary-dark)', fontSize: '18px' }}>🛡️</div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', display: 'block' }}>Complete Family Health Insurance</span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Secure a ₹2 Lakh yearly insurance coverage policy (approx ₹5,000/yr)</span>
          </div>
          {annualSaved >= 5000 && <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--secondary-dark)', fontWeight: '800' }}>UNLOCKED</span>}
        </div>

        {/* Benefit 2 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: annualSaved >= 2000 ? 1 : 0.4, borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
          <div style={{ color: 'var(--secondary-dark)', fontSize: '18px' }}>🩺</div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', display: 'block' }}>4 Full-Body Diagnostics Packages</span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Secure baseline clinical tests once every quarter (approx ₹500/pkg)</span>
          </div>
          {annualSaved >= 2000 && <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--secondary-dark)', fontWeight: '800' }}>UNLOCKED</span>}
        </div>

        {/* Benefit 3 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: annualSaved >= 1200 ? 1 : 0.4, borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
          <div style={{ color: 'var(--secondary-dark)', fontSize: '18px' }}>💪</div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', display: 'block' }}>Daily Nutritional Supplement Strips</span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Maintain baseline high-potency multivitamins daily (approx ₹100/mo)</span>
          </div>
          {annualSaved >= 1200 && <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--secondary-dark)', fontWeight: '800' }}>UNLOCKED</span>}
        </div>
      </div>

      {/* --- FORMULATION COMPARISON SPECIFIC TOOL --- */}
      <div className="card">
        <h4 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeartPulse size={16} color="var(--primary)" /> Specific Formulation Calculator
        </h4>

        {targetMed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div className="form-group">
              <label className="form-label">Select Branded Formulation</label>
              <select 
                className="input-field" 
                value={selectedMedId} 
                onChange={(e) => setSelectedMedId(e.target.value)}
              >
                {medicines.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.genericName})</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '4px' }}>
              <label className="form-label">Quantity (Strips of {targetMed.packSize})</label>
              <select 
                className="input-field" 
                value={stripCount} 
                onChange={(e) => setStripCount(parseInt(e.target.value))}
              >
                <option value="1">1 Strip</option>
                <option value="2">2 Strips</option>
                <option value="3">3 Strips</option>
                <option value="5">5 Strips</option>
                <option value="10">10 Strips</option>
              </select>
            </div>

            {/* Substitution outputs */}
            <div style={{
              backgroundColor: 'var(--surface-alt)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Branded Strip Cost:</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-light)' }}>
                  ₹{itemBrandTotal.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary-dark)', fontWeight: '800' }}>
                <span>Government Generic Equivalent:</span>
                <span>₹{itemGenericTotal.toFixed(2)}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                borderTop: '1px solid var(--border)', 
                paddingTop: '8px',
                marginTop: '4px',
                fontSize: '13px',
                fontWeight: '900',
                color: 'var(--text-main)'
              }}>
                <span>Total Net Savings ({itemSavedPct}%):</span>
                <span>₹{itemSaved.toFixed(2)}</span>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
