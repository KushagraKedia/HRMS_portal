function Dounet_chart() {
  return (
    <div className="relative w-42 h-42">

      <svg
        viewBox="0 0 160 160"
        className="w-full h-full -rotate-90"
      >
        {/* White Center */}
        <circle
          cx="80"
          cy="80"
          r="50"
          fill="white"
        />

        {/* Background Ring */}
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke="#E5E7EB"
          strokeWidth="10"
          fill="none"
        />

        {/* Progress Ring */}
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke="#16C15A"
          strokeWidth="10"
          fill="none"
          strokeDasharray="377"
          strokeDashoffset="94"
          strokeLinecap="round"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-gray-500 text-sm">
          Total Hours
        </span>

        <span className="text-xl font-bold text-slate-800">
          5:45:32
        </span>
      </div>

    </div>
  );
}

export default Dounet_chart;