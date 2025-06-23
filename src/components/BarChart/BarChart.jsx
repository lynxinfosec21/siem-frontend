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

// Corrected data array with timestamp
const data = [
  { timestamp: '00:00', count: 300 },
  { timestamp: '01:00', count: 500 },
  { timestamp: '02:00', count: 450 },
  { timestamp: '03:00', count: 600 },
  { timestamp: '04:00', count: 400 },
  { timestamp: '05:00', count: 550 },
  { timestamp: '06:00', count: 700 },
  { timestamp: '07:00', count: 350 },
  { timestamp: '08:00', count: 800 },
  { timestamp: '09:00', count: 650 },
  { timestamp: '10:00', count: 300 },
  { timestamp: '11:00', count: 450 },
  { timestamp: '12:00', count: 500 },
  { timestamp: '13:00', count: 600 },
  { timestamp: '14:00', count: 350 },
  { timestamp: '15:00', count: 550 },
  { timestamp: '16:00', count: 750 },
  { timestamp: '17:00', count: 400 },
  { timestamp: '18:00', count: 800 },
  { timestamp: '19:00', count: 650 },
  { timestamp: '20:00', count: 500 },
  { timestamp: '21:00', count: 600 },
  { timestamp: '22:00', count: 350 },
  { timestamp: '23:00', count: 550 },
];

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

const MyBarChart = () => {
  const barColor = ' #20B2AA'; // Green
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
