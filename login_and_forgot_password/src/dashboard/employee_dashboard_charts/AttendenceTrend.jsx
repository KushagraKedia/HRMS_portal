import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AttendanceTrend() {
  const data = [
    { month: "Jan", value: 20000 },
    { month: "Feb", value: 20000 },
    { month: "Mar", value: 35000 },
    { month: "Apr", value: 35000 },
    { month: "May", value: 40000 },
    { month: "Jun", value: 60000 },
    { month: "Jul", value: 60000 },
  ];

  return (
    <div className="w-full h-[280px] bg-white rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          
          <defs>
            <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.10} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#E5E7EB"
            strokeDasharray="0"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 16 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[10000, 20000, 30000, 40000, 50000, 60000]}
            tickFormatter={(value) => `${value / 1000}K`}
          />

          <Area
            type="linear"
            dataKey="value"
            stroke="#16C15A"
            strokeWidth={5}
            fill="url(#greenFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceTrend;