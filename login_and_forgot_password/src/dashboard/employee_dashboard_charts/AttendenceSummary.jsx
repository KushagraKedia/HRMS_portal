import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function AttendanceSummary() {
  const [checked, setChecked] = useState(false);

  const data = [
    { name: "On Time", value: 1254, color: "#0E566A" },
    { name: "Late Attendance", value: 32, color: "#10C850" },
    { name: "Work From Home", value: 658, color: "#F97316" },
    { name: "Absent", value: 14, color: "#FF0000" },
    { name: "Sick Leave", value: 68, color: "#F4B400" },
  ];

  return (
    <div className="bg-white p-3 rounded-xl flex justify-between items-center">

      {/* Left Side */}
      <div className="flex flex-col justify-between h-full">

        <div className="space-y-6">

          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-0.5">

              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-lg font-bold text-slate-900">
                {item.value}
              </span>

              <span className="text-gray-500">
                {item.name}
              </span>

            </div>
          ))}

        </div>

        {/* Clickable Checkbox */}
        <div className="flex items-center gap-2 mt-4">

          <button
            onClick={() => setChecked(!checked)}
            className={`w-5 h-5 border rounded-md flex items-center justify-center transition-all
              ${
                checked
                  ? "bg-orange-500 text-white"
                  : "border-gray-300 bg-white"
              }`}
          >
            {checked && "✓"}
          </button>

          <span className="text-gray-600 text-sm">
            Better than 85% of Employees
          </span>

        </div>

      </div>

      {/* Right Side Donut Chart */}
      <div className="w-[169px] h-[169px]">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
              }}
            />

            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              stroke="white"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AttendanceSummary;