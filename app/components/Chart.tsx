"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TChartData = { time: string; atom: string; ntrn: string };

interface IChart {
  chartData: TChartData[];
}

const Chart = ({ chartData }: IChart) => {
  const customTooltipFormatter = (value: string, name: string) => {
    return [`${name === "atom" ? "$ATOM" : "$NTRN"}: $${value}`];
  };

  const customLegendFormatter = (value: string) => {
    return value === "atom" ? "$ATOM" : "$NTRN";
  };

  const customYAxisFormatter = (value: string) => `$${value}`;

  return (
    <section className="w-full h-96">
      <ResponsiveContainer width={"100%"} height="100%">
        <LineChart
          title="7-day price chart of the $ATOM-$NTRN pair"
          width={800}
          height={500}
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="time"
            ticks={[chartData[chartData.length - 1].time]}
            tick={{ dy: 10, width: "90%" }}
            label={{ value: "Previous 7 days", position: "insideBottom" }}
          />
          <YAxis
            tickFormatter={customYAxisFormatter}
            label={{
              value: "Price USD",
              position: "insideLeft",
              offset: 0,
              angle: -90,
              dy: 50,
            }}
          />
          <Tooltip formatter={customTooltipFormatter} />
          <Legend formatter={customLegendFormatter} />
          <Line
            type="monotone"
            dataKey="atom"
            stroke="#8884d8"
            dot={{ r: 1 }}
          />
          <Line
            type="monotone"
            dataKey="ntrn"
            stroke="#82ca9d"
            dot={{ r: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Chart;
