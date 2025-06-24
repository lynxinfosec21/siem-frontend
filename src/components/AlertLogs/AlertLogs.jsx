import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import './AlertLogs.css';

const AlertLogs = ({ refreshTrigger = 0, maxHeight = '24rem' }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  
  const refreshIntervalRef = useRef(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:4000/api/search', {
        index: 'top_queries-*',
        query: {
          size: 100,
          query: {
            match_all: {}
          },
          
        }
      });

      const hits = response.data.hits?.hits || [];
      setLogs(hits);
      setLastFetchTime(new Date());
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err.message || 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  // Memoized log processing with timestamp formatting
  const processedLogs = useMemo(() => {
    return logs.map((hit, index) => {
      const source = hit._source || {};
      
      // Format timestamp to "Day month year" format with time
      const timestamp = source['@timestamp'] || new Date().toISOString();
      const date = new Date(timestamp);
      const formattedTime = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) + ' ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      // Just map over each field
      const sourceData = Object.entries(source)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' | ');

      return {
        id: hit._id || index,
        timestamp: formattedTime,
        source: sourceData,
        rawSource: source
      };
    });
  }, [logs]);

  // Memoized table rows
  const tableRows = useMemo(() => {
    return processedLogs.map((log) => (
      <tr key={log.id} className="table-row">
        <td className="table-cell time-cell">
          {log.timestamp}
        </td>
        <td className="table-cell source-cell">
          <code className="source-code">
            {log.source}
          </code>
        </td>
      </tr>
    ));
  }, [processedLogs]);

  // Auto-refresh effect
  useEffect(() => {
    // Clear existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    // Set up new interval (refresh every 30 seconds)
    refreshIntervalRef.current = setInterval(() => {
      fetchLogs();
    }, 30000);

    // Initial fetch
    fetchLogs();

    // Cleanup on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  // Manual refresh trigger
  useEffect(() => {
    if (refreshTrigger > 0) {
      fetchLogs();
    }
  }, [refreshTrigger]);

  return (
    <div className="alert-logs-container">
      <div className="alert-logs-header">
        <h3 className="alert-logs-title">Recent Alerts</h3>
        <div className="alert-logs-meta">
          {lastFetchTime && (
            <span className="last-updated">
              Last updated: {lastFetchTime.toLocaleTimeString()}
            </span>
          )}
          <button 
            className="refresh-button"
            onClick={fetchLogs}
            disabled={loading}
          >
            {loading ? '⏳' : '🔄'}
          </button>
        </div>
      </div>
      
      <div className="alert-logs-content" style={{ maxHeight }}>
        {loading && logs.length === 0 ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Loading alerts...</span>
          </div>
        ) : error ? (
          <div className="error-container">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
            <button 
              className="retry-button"
              onClick={fetchLogs}
            >
              Retry
            </button>
          </div>
        ) : processedLogs.length === 0 ? (
          <div className="empty-container">
            <span className="empty-icon">📋</span>
            <span className="empty-message">No alerts found</span>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th className="table-header time-col">Time</th>
                  <th className="table-header source-col">_source</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner small"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertLogs; 