import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";

const graph = (data: any) => {
  return (
    <>
      <div style={{ width: "100%", height: "100%", marginTop: 20 }}>
        <ResponsiveContainer>
          <LineChart>
            <XAxis dataKey="x" type="number"/>
            <YAxis dataKey="y" />
            <Tooltip />
            <Line
              type="linear"
              dataKey="y"
              data={data}
              stroke="#8884d8"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
export default graph