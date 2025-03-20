import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SalesDataPoint {
  date: string;
  sales: number;
}

interface RecentSalesChartProps {
  data?: SalesDataPoint[];
  title?: string;
}

const defaultData: SalesDataPoint[] = [
  { date: "Jan 1", sales: 1200 },
  { date: "Jan 2", sales: 1800 },
  { date: "Jan 3", sales: 1400 },
  { date: "Jan 4", sales: 2200 },
  { date: "Jan 5", sales: 1900 },
  { date: "Jan 6", sales: 2400 },
  { date: "Jan 7", sales: 2100 },
  { date: "Jan 8", sales: 2800 },
  { date: "Jan 9", sales: 2600 },
  { date: "Jan 10", sales: 3100 },
  { date: "Jan 11", sales: 2900 },
  { date: "Jan 12", sales: 3300 },
  { date: "Jan 13", sales: 3200 },
  { date: "Jan 14", sales: 3600 },
];

const weeklyData: SalesDataPoint[] = [
  { date: "Week 1", sales: 8500 },
  { date: "Week 2", sales: 10200 },
  { date: "Week 3", sales: 12400 },
  { date: "Week 4", sales: 11800 },
];

const monthlyData: SalesDataPoint[] = [
  { date: "Jan", sales: 42000 },
  { date: "Feb", sales: 38000 },
  { date: "Mar", sales: 45000 },
  { date: "Apr", sales: 48000 },
  { date: "May", sales: 51000 },
  { date: "Jun", sales: 55000 },
];

const RecentSalesChart = ({
  data = defaultData,
  title = "Recent Sales",
}: RecentSalesChartProps) => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );

  const displayData = {
    daily: defaultData,
    weekly: weeklyData,
    monthly: monthlyData,
  };

  return (
    <Card className="w-full max-w-[780px] h-[350px] bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Tabs
            defaultValue="daily"
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as "daily" | "weekly" | "monthly")
            }
            className="w-[300px]"
          >
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-2 h-[270px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={displayData[timeRange]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Sales"]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{
                r: 6,
                stroke: "#8884d8",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RecentSalesChart;
