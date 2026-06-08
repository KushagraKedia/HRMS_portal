import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function AttendanceChart() {
  const attendanceData = [
    { day: "Mon", present: 600, late: 50, absent: 90 },
    { day: "Tue", present: 300, late: 100, absent: 50 },
    { day: "Wed", present: 300, late: 50, absent: 130 },
    { day: "Thu", present: 700, late: 50, absent: 90 },
    { day: "Fri", present: 400, late: 100, absent: 130 },
    { day: "Sat", present: 600, late: 100, absent: 50 },
    { day: "Sun", present: 600, late: 100, absent: 130 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 flex gap-6">

      {/* Chart Area */}
      <div className="flex-1">

        {/* Top Stats */}
        <div className="flex gap-10 mb-3 ml-3">

          <div>
            <h2 className="text-3xl font-bold text-slate-900 ml-3">82</h2>
            <p className="text-gray-500">On-Time</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900">11</h2>
            <p className="text-gray-500 ml-1">Late</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 ml-3">6</h2>
            <p className="text-gray-500">Absent</p>
          </div>

        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" />

            <YAxis />

            <Bar
              dataKey="present"
              fill="#f97316"
              radius={[3, 3, 0, 0]}
            />

            <Bar
              dataKey="late"
              fill="#0f5f78"
              radius={[3, 3, 0, 0]}
            />

            <Bar
              dataKey="absent"
              fill="#facc15"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Right Cards */}
      <div className="w-52 flex flex-col gap-4">

        <div className="border rounded-lg p-5 text-center">
          <p className="text-gray-500 mb-2">
            Max Working Hours
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            8.4 hrs
          </h2>
        </div>

        <div className="border rounded-lg p-5 text-center">
          <p className="text-gray-500 mb-2">
            Missed Punches
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            12
          </h2>
        </div>

        <div className="border rounded-lg p-5 text-center">
          <p className="text-gray-500 mb-2">
            Weekly Avg
          </p>

          <h2 className="text-4xl font-bold text-slate-900">
            97.2%
          </h2>
        </div>

      </div>

    </div>
  );
}

export default AttendanceChart;