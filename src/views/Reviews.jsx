import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Star, Heart, Check, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Reviews() {
  const { reviews, addCustomerReview, navigateBack, addToast, currentUser } = useAppContext();
  
  const [formOpen, setFormOpen] = useState(false);
  const [medName, setMedName] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!medName || !comment) {
      addToast("Please fill in both medicine name and comments", "error");
      return;
    }
    addCustomerReview(medName, comment, stars);
    
    // reset form
    setMedName("");
    setComment("");
    setStars(5);
    setFormOpen(false);
  };

  return (
    <div className="screen-scroll-container fade-in" style={{ paddingBottom: '32px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0 12px 0', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
        <button className="btn-icon-only" onClick={navigateBack}>
          <ArrowLeft size={16} />
        </button>
        <h3 className="title-md" style={{ margin: 0 }}>Savings Feedback Hub</h3>
      </div>

      {/* Review summary cards */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 14px', background: 'var(--surface-alt)' }}>
        <div>
          <h4 style={{ fontSize: '15px' }}>Overall Community Rating</h4>
          <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>Based on government patient surveys</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Star size={16} fill="var(--accent)" color="var(--accent)" />
          <span style={{ fontSize: '18px', fontWeight: '800' }}>4.6 / 5</span>
        </div>
      </div>

      {/* Controls header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 10px 0', padding: '0 4px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-light)' }}>
          PATIENT SAVINGS STORIES ({reviews.length})
        </h4>
        
        {/* Toggle form button */}
        {!formOpen && (
          <button 
            className="btn btn-secondary" 
            style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
            onClick={() => setFormOpen(true)}
          >
            <Plus size={14} /> Add Story
          </button>
        )}
      </div>

      {/* Write a review form */}
      {formOpen && (
        <div className="card fade-in" style={{ borderColor: 'var(--primary)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h5 style={{ fontSize: '14px', fontWeight: '700' }}>Write Your Savings Story</h5>
            <button 
              className="btn-ghost" 
              style={{ width: 'auto', padding: '2px', border: 'none', color: 'var(--text-light)' }} 
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Generic Salt / Brand Used</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Atorvastatin, Metformin..." 
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Review Star Rating</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <span 
                    key={val}
                    onClick={() => setStars(val)}
                    style={{ cursor: 'pointer', transition: 'var(--transition)' }}
                  >
                    <Star 
                      size={24} 
                      fill={val <= stars ? 'var(--accent)' : 'transparent'} 
                      color="var(--accent)" 
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Your Experience / Savings Details</label>
              <textarea 
                className="input-field" 
                rows="3" 
                placeholder="Describe how much money you saved and your experience with generic safety..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Publish Story to Live Feed
            </button>
          </form>
        </div>
      )}

      {/* Review List Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {reviews.map((rev) => (
          <div key={rev.id} className="card fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)' }}>
                {rev.userName}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1px', color: 'var(--accent)', fontSize: '11px' }}>
                {"★".repeat(rev.rating)}
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '18px' }}>
              "{rev.comment}"
            </p>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderTop: '1px solid var(--border)', 
              paddingTop: '8px', 
              marginTop: '8px',
              fontSize: '11px',
              color: 'var(--text-light)'
            }}>
              <span>Medicine: <b>{rev.medicineName}</b></span>
              
              <button 
                onClick={() => addToast("Review marked helpful!", "success")}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <Heart size={11} /> Helpful ({rev.likes})
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
