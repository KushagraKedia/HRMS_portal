// AttendenceGraph.jsx
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
    <div className="bg-white rounded-xl p-3 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">

      {/* Chart Area */}
      <div className="flex-1">

        {/* Top Stats */}
        <div className="flex gap-6 md:gap-10 mb-3 ml-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 ml-3">82</h2>
            <p className="text-gray-500 text-sm md:text-base">On-Time</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">11</h2>
            <p className="text-gray-500 text-sm md:text-base ml-1">Late</p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 ml-3">6</h2>
            <p className="text-gray-500 text-sm md:text-base">Absent</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Bar dataKey="present" fill="#f97316" radius={[3, 3, 0, 0]} />
            <Bar dataKey="late" fill="#0f5f78" radius={[3, 3, 0, 0]} />
            <Bar dataKey="absent" fill="#facc15" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Right Cards — row on mobile, column on desktop */}
      <div className="flex flex-row md:flex-col md:w-52 gap-3 md:gap-4">

        <div className="border rounded-lg p-3 md:p-5 text-center flex flex-col w-[33%] items-center justify-center">
          <p className="text-gray-500 mb-1 md:mb-2 text-xs md:text-sm ">
            Max Working Hours
          </p>
          <h2 className="md:text-2xl md:text-4xl font-bold text-slate-900 text-xl">
            8.4 hrs
          </h2>
        </div>

        <div className="border rounded-lg p-3 md:p-5 text-center flex flex-col w-[33%] items-center justify-center">
          <p className="text-gray-500 mb-1 md:mb-2 text-xs md:text-sm ">
            Missed Punches
          </p>
          <h2 className="md:text-2xl md:text-4xl font-bold text-slate-900 text-xl">
            12
          </h2>
        </div>

        <div className="border rounded-lg p-3 md:p-5 text-center flex flex-col items-center justify-center w-[33%]">
          <p className="text-gray-500 mb-1 md:mb-2 text-xs md:text-sm">
            Weekly Avg
          </p>
          <h2 className="md:text-2xl md:text-4xl font-bold text-slate-900 text-xl">
            97.2%
          </h2>
        </div>

      </div>

    </div>
  );
}

export default AttendanceChart;