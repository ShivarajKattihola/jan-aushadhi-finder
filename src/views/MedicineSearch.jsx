import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight, ShieldCheck, Mic, HelpCircle, Filter, ArrowUpDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CATEGORIES = ["All", "Cardiovascular", "Antibiotics", "Diabetes", "Analgesics", "Gastrointestinal", "Respiratory"];

// Fuzzy typo corrections map for demo purposes
const FUZZY_MAP = {
  "liptor": "Lipitor",
  "lipiter": "Lipitor",
  "calpul": "Calpol 650",
  "calpole": "Calpol 650",
  "glucopage": "Glucophage 500mg",
  "glucofage": "Glucophage 500mg",
  "augmentn": "Augmentin 625 DUO",
  "crocn": "Crocin Pain Relief"
};

// Disease mapping for search compatibility
const DISEASE_MAP = {
  "cholesterol": "Cardiovascular",
  "heart": "Cardiovascular",
  "stroke": "Cardiovascular",
  "infection": "Antibiotics",
  "bacterial": "Antibiotics",
  "fever": "Analgesics",
  "pain": "Analgesics",
  "headache": "Analgesics",
  "diabetes": "Diabetes",
  "sugar": "Diabetes",
  "acidity": "Gastrointestinal",
  "gerd": "Gastrointestinal",
  "heartburn": "Gastrointestinal",
  "asthma": "Respiratory",
  "copd": "Respiratory",
  "breathing": "Respiratory"
};

export default function MedicineSearch() {
  const { 
    medicines, 
    navigateTo, 
    navigateBack,
    recentSearches,
    addRecentSearch,
    offlineMode,
    addToast
  } = useAppContext();
  
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [didYouMean, setDidYouMean] = useState(null);
  const [filteredMeds, setFilteredMeds] = useState(medicines);

  // --- FILTERS & SORTING STATES ---
  const [sortBy, setSortBy] = useState("savings"); // 'savings', 'priceLow', 'priceHigh', 'rating'
  const [stockFilter, setStockFilter] = useState("All"); // 'All', 'InStock', 'LowStock'
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Voice Search states
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Listening...");

  useEffect(() => {
    // Check for fuzzy matches
    const cleanQuery = query.toLowerCase().trim();
    if (FUZZY_MAP[cleanQuery]) {
      setDidYouMean(FUZZY_MAP[cleanQuery]);
    } else {
      setDidYouMean(null);
    }

    // Perform filter
    let results = [...medicines];

    // Filter by text search (matches brand, generic, composition, or mapped disease tags)
    if (query) {
      const searchTerm = FUZZY_MAP[cleanQuery] ? FUZZY_MAP[cleanQuery].toLowerCase() : cleanQuery;
      
      // Check if keyword is a disease term
      const diseaseCategory = DISEASE_MAP[searchTerm];

      results = results.filter(med => {
        const matchesBrand = med.name.toLowerCase().includes(searchTerm);
        const matchesGeneric = med.genericName.toLowerCase().includes(searchTerm);
        const matchesComposition = med.composition.toLowerCase().includes(searchTerm);
        const matchesDisease = diseaseCategory ? med.category === diseaseCategory : false;
        
        return matchesBrand || matchesGeneric || matchesComposition || matchesDisease;
      });
    }

    // Filter by Category
    if (selectedCat !== "All") {
      results = results.filter(med => med.category === selectedCat);
    }

    // Filter by Stock status
    if (stockFilter !== "All") {
      results = results.filter(med => {
        // High stock maps to InStock
        if (stockFilter === "InStock") return med.rating >= 4.7; // high ratings correlated to stock for demo
        if (stockFilter === "LowStock") return med.rating < 4.7;
        return true;
      });
    }

    // Apply Sorting logic
    if (sortBy === "savings") {
      results.sort((a, b) => b.savingsPct - a.savingsPct); // Highest savings first
    } else if (sortBy === "priceLow") {
      results.sort((a, b) => a.genericPrice - b.genericPrice); // Lowest generic price first
    } else if (sortBy === "priceHigh") {
      results.sort((a, b) => b.genericPrice - a.genericPrice); // Highest generic price first
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating); // Highest rated first
    }

    setFilteredMeds(results);
  }, [query, selectedCat, stockFilter, sortBy, medicines]);

  // Voice Speech simulated engine
  useEffect(() => {
    if (!voiceActive) return;
    
    setVoiceStatus("Listening for formulation...");
    
    const t1 = setTimeout(() => {
      setVoiceStatus("Processing spoken frequencies...");
    }, 1500);

    const t2 = setTimeout(() => {
      setVoiceStatus("Transcribing speech: 'Lipitor'");
    }, 2800);

    const t3 = setTimeout(() => {
      setQuery("Lipitor");
      addRecentSearch("Lipitor");
      setVoiceActive(false);
      addToast("Voice Match: 'Lipitor'", "success");
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [voiceActive]);

  const handleApplyFuzzy = () => {
    if (didYouMean) {
      setQuery(didYouMean);
      setDidYouMean(null);
      addRecentSearch(didYouMean);
    }
  };

  // Keystroke typing history capture debouncer
  useEffect(() => {
    if (query && query.length > 2) {
      const timer = setTimeout(() => {
        addRecentSearch(query);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="btn-icon-only" onClick={navigateBack}>
            <ArrowLeft size={16} />
          </button>
          <h3 className="title-md" style={{ margin: 0 }}>Medicine Discovery</h3>
        </div>
        <button className="btn-icon-only" onClick={() => setShowFilterDrawer(!showFilterDrawer)}>
          <Filter size={18} color={showFilterDrawer ? "var(--primary)" : "var(--text-main)"} />
        </button>
      </div>

      {/* Offline SQLite Cache Banner */}
      {offlineMode && (
        <div className="slide-in-up" style={{
          backgroundColor: '#B45309',
          color: '#ffffff',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '700',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          ⚡ SQLite Cache Active — offline matching is limited to cached formulations.
        </div>
      )}

      {/* Main Search Input with Mic Trigger */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          className="input-field"
          style={{ paddingLeft: '40px', paddingRight: '40px' }}
          placeholder="Search generic, brand, or disease (e.g. diabetes)..."
          value={query}
          onChange={handleInputChange}
        />
        <Search size={16} color="var(--text-light)" style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)'
        }} />
        <button 
          type="button" 
          onClick={() => setVoiceActive(true)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'transparent',
            color: 'var(--primary)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Mic size={18} />
        </button>
      </div>

      {/* --- FILTER DRAWER PANEL --- */}
      {showFilterDrawer && (
        <div className="card fade-in" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', padding: '14px', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '10px', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={14} /> Catalog Filters &amp; Sorting
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            {/* Sort Dropdown */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '10px' }}>Sort Catalog By</label>
              <select className="input-field" style={{ height: '32px', fontSize: '11px', padding: '4px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="savings">Highest Net Savings</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Consumer Ratings</option>
              </select>
            </div>

            {/* Availability Dropdown */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '10px' }}>Kendra Stock Status</label>
              <select className="input-field" style={{ height: '32px', fontSize: '11px', padding: '4px' }} value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
                <option value="All">All Formulations</option>
                <option value="InStock">In Stock (Kendra High)</option>
                <option value="LowStock">Low Stock (Alerts Active)</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary" style={{ height: '28px', padding: '4px 10px', fontSize: '11px', width: 'auto', margin: '6px 0 0 0' }} onClick={() => setShowFilterDrawer(false)}>
            Apply Filters
          </button>
        </div>
      )}

      {/* Fuzzy Did-You-Mean helper text */}
      {didYouMean && (
        <div 
          onClick={handleApplyFuzzy}
          style={{
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '12px',
            color: 'var(--primary-dark)',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <span>Including results for: <b>{didYouMean}</b></span>
          <span style={{ fontSize: '10px', textDecoration: 'underline', color: 'var(--primary)' }}>Apply Match</span>
        </div>
      )}

      {/* Recent & Trending Searches Dashboard (only if empty search) */}
      {!query && (
        <div className="fade-in" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Recent Searches */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Recent Searches
            </h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {recentSearches && recentSearches.length > 0 ? (
                recentSearches.slice(0, 4).map((term, idx) => (
                  <span 
                    key={idx}
                    onClick={() => { setQuery(term); addRecentSearch(term); }}
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'var(--surface-alt)',
                      border: '1px solid var(--border)',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    🕒 {term}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '11px', color: 'var(--text-light)', fontStyle: 'italic' }}>No recent searches.</span>
              )}
            </div>
          </div>

          {/* Trending Searches */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Trending Medicines (PMBJP Peak)
            </h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {["Augmentin", "Crocin", "Glucophage", "Lipitor"].map((term, idx) => (
                <span 
                  key={idx}
                  onClick={() => { setQuery(term); addRecentSearch(term); }}
                  style={{
                    fontSize: '11px',
                    backgroundColor: 'var(--secondary-light)',
                    color: 'var(--secondary-dark)',
                    border: '1px solid var(--secondary)',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '700'
                  }}
                >
                  🔥 {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Category Pill Filter */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '10px',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {CATEGORIES.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCat(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid',
              borderColor: selectedCat === cat ? 'var(--primary)' : 'var(--border)',
              backgroundColor: selectedCat === cat ? 'var(--primary)' : 'var(--surface)',
              color: selectedCat === cat ? '#ffffff' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Comparison results checklist */}
      {filteredMeds.length > 0 ? (
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '10px', paddingLeft: '4px' }}>
            FOUND {filteredMeds.length} BRANDED COMPARISONS
          </div>

          {filteredMeds.map((med) => (
            <div 
              key={med.id} 
              className="comparison-card card-interactive"
              onClick={() => navigateTo('details', { medicine: med })}
              style={{ cursor: 'pointer' }}
            >
              {/* TOP SPLIT: Branded Drug */}
              <div className="branded-side">
                <div>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-light)', display: 'block', textTransform: 'uppercase' }}>
                    Branded drug ({med.manufacturer})
                  </span>
                  <span className="branded-name" style={{ fontSize: '15px' }}>{med.name}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-light)', display: 'block' }}>Retail Price</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{med.brandPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* BOTTOM SPLIT: Government Generic alternative */}
              <div className="generic-side">
                <div className="generic-name-row">
                  <div style={{ flex: 1, paddingRight: '8px' }}>
                    <span className="generic-badge" style={{ marginBottom: '4px', display: 'inline-block' }}>
                      PMBJP Generic Match
                    </span>
                    <h4 style={{ fontSize: '16px', color: 'var(--secondary-dark)' }}>{med.genericName}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Composition: {med.composition}
                    </p>
                  </div>
                  
                  {/* Saving percentage chip */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '4px' }}>
                    <div className="savings-chip">
                      Save {med.savingsPct}%
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>
                      ₹{med.genericPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '6px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: '600' }}>
                    Pack size: {med.packSize}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    View Composition &amp; Stock <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '32px 16px', textAlign: 'center' }}>
          <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>🔍</span>
          <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>No matches found</h4>
          <p className="body-md" style={{ fontSize: '13px' }}>
            We couldn't locate any generic matches for <b>"{query}"</b>. Try checking the spelling or entering another popular drug name.
          </p>
        </div>
      )}

      {/* Trust seal bottom footer */}
      <div style={{
        display: 'flex',
        alignItems: 'start',
        gap: '8px',
        backgroundColor: 'var(--surface)',
        padding: '10px 12px',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border)',
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '16px'
      }}>
        <ShieldCheck size={18} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <b>Clinical Integrity Guarantee:</b> All matching database records are certified by the National Institute of Pharmaceutical Education and Research (NIPER).
        </div>
      </div>

      {/* --- ACCESSIBILITY VOICE SEARCH MODAL OVERLAY --- */}
      {voiceActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(9, 28, 53, 0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 3000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div className="card slide-in-up" style={{
            width: '280px',
            textAlign: 'center',
            padding: '24px 16px',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h4 style={{ fontSize: '15px', marginBottom: '16px' }}>AI Speech Assistant</h4>
            
            {/* Pulsing microphone waveform animation */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              position: 'relative'
            }}>
              <span className="pulse-indicator" style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                opacity: 0.4,
                zIndex: -1
              }} />
              <Mic size={36} color="var(--primary)" />
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', minHeight: '36px' }}>
              {voiceStatus}
            </p>

            <button 
              className="btn btn-secondary" 
              style={{ width: 'auto', padding: '6px 16px', fontSize: '12px', marginTop: '10px' }}
              onClick={() => setVoiceActive(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
