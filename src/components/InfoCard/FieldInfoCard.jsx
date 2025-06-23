import React, { useEffect, useRef, useState } from 'react';
import { FiPlus, FiEdit3 } from 'react-icons/fi';
import './FieldInfoCard.css';

const FieldInfoCard = ({ field, onClose }) => {
  const cardRef = useRef(null);
  const [fieldData, setFieldData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://147.93.62.10:5601/api/field-data?field=${encodeURIComponent(field)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch field data");
        }
        const data = await response.json();
        setFieldData(data);
        setError(null); 
      } catch (err) {
        setError(err.message);
        setFieldData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFieldData();
  }, [field]);

  return (
    <div ref={cardRef} className="info-card">
      <div className="card-header">
        <div className="field-title">{field}</div>
        <div className="card-actions">
          <button className="action-btn"><FiPlus /></button>
          <button className="action-btn small">
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
            </svg>
          </button>
          <button className="action-btn edit"><FiEdit3 /></button>
        </div>
      </div>

      <hr className="divider1" />


      {loading ? (
        <div className="no-data">Loading data...</div>
      ) : error ? (
        <div className="no-data">Error: {error}</div>
      ) : fieldData ? (
        <div className="field-data">
          <p><strong>Sample Value:</strong> {fieldData.value || 'N/A'}</p>
          <p><strong>Occurrences:</strong> {fieldData.count || 0}</p>
        </div>
      ) : (
        <div className="no-data">No data available.</div>
      )}

      <hr className="divider1" />
      <p className="multi-title">Multi Fields</p>
      <div className="multi-keyword">
        <span className="keyword-badge">k</span>
        {field}.keyword
      </div>

      <hr className="divider1" />
      <button className="visualize-btn">Visualize</button>
    </div>
  );
};

export default FieldInfoCard;
