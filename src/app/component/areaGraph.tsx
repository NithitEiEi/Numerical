import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";

const AreaGraph = (data: any, curve: boolean) => {
  return (
    <>
      <div style={{ width: "100%", height: "100%", marginTop: 20 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis dataKey="x" type="number" />
            <YAxis dataKey="y" />
            <Tooltip />
            <Area
              type={curve ? "monotone" : "linear"}
              dataKey="y"
              stroke="#C952D1"
              dot={true}
              fill="#DFA5E3"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AreaGraph;
