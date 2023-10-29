import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

export const graphRegression = (data:any, ans:any) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
          >
            <CartesianGrid stroke="#f5f5f5" />

            <XAxis dataKey="x" type="number"/>
            <YAxis/>
            <Scatter data={data} dataKey="y" fill="#C659D8"  />
            <Line type="monotone" data={ans} dataKey="line" stroke="red" activeDot={false} fill='red'/>
          </ComposedChart>
        </ResponsiveContainer>
      );
}