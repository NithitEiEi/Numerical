import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

  export const graphInter = (data: any, answer: any, curve: boolean) => {
    return (
      <>
        <div style={{ width: "100%", height: "100%", marginTop: 20 }}>
          <ResponsiveContainer>
            <LineChart>
              <XAxis type="number" dataKey="x"/>
              <YAxis dataKey="y" />
              <Line
                type={curve? "monotone": "linear"}
                dataKey="y"
                data={data}
                stroke="#F39C12"
                dot={true}
              />
              <Line
                type="monotone"
                dataKey="y"
                data={answer}
                stroke="#ff0000"
                fill="red"
                dot={true}
              />
              <Tooltip/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  };