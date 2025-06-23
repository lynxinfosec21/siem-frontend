import React, { useState } from "react";
import './Sidebar.css';
import { ChevronDown, RotateCcw, Search, Plus } from "lucide-react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import FieldInfoCard from "../InfoCard/FieldInfoCard"; 

const fields = [
  "_index", "agent.id", "agent.ip", "agent.name", "data.action", "data.alert.action",
  "data.alert.category", "data.alert.gid", "data.alert.metadata.affected_product",
  "data.alert.metadata.attack_target", "data.alert.metadata.confidence",
  "data.alert.metadata.created_at", "data.alert.metadata.deployment",
  "data.alert.metadata.signature_severity",
];

const Sidebar = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

  const handleClick = (e, field) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSelectedField(field);
    setCardPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 10 + window.scrollX
    });
  };

  return (
    <div className="sidebar">
      <aside className="sidebar-container">
        {/* Top bar */}
        <div className="top-bar">
          <div className="input-group">
            <div className="select-wrapper">
              <select className="select">
                <option>wazuh-alerts-*</option>
              </select>
              <ChevronDown className="icon-chevron" size={14} />
            </div>
            <button className="btn-icon refresh-icon">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Search + Filter */}
        <div className="search-filter-row">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input className="search-input" type="text" placeholder="Search field" />
          </div>
          <button className="btn-filter equal-size">
            Filter by type
            <span className="badge">0</span>
          </button>
        </div>

        {/* Selected fields */}
        <div>
          <h3 className="section-title">Selected fields</h3>
          <div className="selected-field">
            <span className="dot"></span> _source
          </div>
        </div>

        {/* Available fields */}
        <div>
          <h3 className="section-title">Available fields</h3>
          <ul className="custom-fields-list">
            {fields.map((field) => (
              <li
                key={field}
                className="custom-field-item"
                onClick={(e) => handleClick(e, field)}
              >
                <div className="field-left">
                  <span className="field-icon-wrapper">
                    <span className="field-icon-t">t</span>
                    <BsGrid3X3GapFill className="field-icon-dots" />
                  </span>
                  <span className="field-name">{field}</span>
                </div>
                <div className="field-actions-hover">
                  <button className="btn-icon-hover">
                    <Search size={14} />
                  </button>
                  <button className="btn-icon-hover">
                    <Plus size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

     
      {selectedField && (
        <div
          style={{
            position: "absolute",
            top: `${cardPosition.top}px`,
            left: `${cardPosition.left}px`,
            zIndex: 999,
          }}
        >
          <FieldInfoCard
            field={selectedField}
            onClose={() => setSelectedField(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
