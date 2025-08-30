
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InstrumentDataPoint } from '../../types';

interface DataChartProps {
  data: InstrumentDataPoint[];
  color: string;
}

const DataChart: React.FC<DataChartProps> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
        <XAxis dataKey="time" stroke="#888" style={{ fontSize: '10px' }} tick={{ fill: '#a0aec0' }} />
        <YAxis stroke="#888" style={{ fontSize: '10px' }} tick={{ fill: '#a0aec0' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(22, 27, 34, 0.8)',
            borderColor: '#30363d',
            color: '#c9d1d9',
          }}
          labelStyle={{ color: '#8b949e' }}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataChart;
