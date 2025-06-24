import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from 'recharts';

// Remove hardcoded data array
// const data = [...];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#333',
        color: '#fff',
        padding: '8px',
        borderRadius: '5px',
        fontSize: '0.9rem'
      }}>
        <strong>Time:</strong> {label} <br />
        <strong>Count:</strong> {payload[0].value}
      </div>
    );
  }
  return null;
};

const MyBarChart = ({ data = [] }) => {
  const barColor = ' #20B2AA'; 
  const backgroundColor = '#F4F4F4';
  const gridColor = '#CCCCCC';

  return (
    <div style={{
      background: backgroundColor,
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '10px', color: '#0D47A1' }}>
        Counts per Time Interval
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 5, bottom: 40 }}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }}>
            <Label value="Timestamp per 30 minutes" offset={-30} position="insideBottom" style={{ fill: '#0D47A1', fontSize: '14px' }} />
          </XAxis>
          <YAxis tick={{ fontSize: 12 }}>
            <Label value="Count" angle={-90} position="insideLeft" style={{ fill: '#0D47A1', fontSize: '14px' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
