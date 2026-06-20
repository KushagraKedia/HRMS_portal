// WorkHoursTimeline.jsx
function WorkHoursTimeline() {
  return (
    <div className="bg-white rounded-xl p-3 md:p-6">

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:flex md:justify-between gap-4 md:gap-0 mb-4 md:mb-2">

        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0"></div>
            <span className="text-gray-500 text-sm md:text-base">
              Total Working hours
            </span>
          </div>

          <div className="text-base md:text-lg font-bold text-slate-900 mt-1">
            12h 36m
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
            <span className="text-gray-500 text-sm md:text-base">
              Productive Hours
            </span>
          </div>

          <div className="text-base md:text-lg font-bold text-slate-900 mt-1">
            08h 36m
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
            <span className="text-gray-500 text-sm md:text-base">
              Break hours
            </span>
          </div>

          <div className="text-base md:text-lg font-bold text-slate-900 mt-1">
            22m 15s
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
            <span className="text-gray-500 text-sm md:text-base">
              Overtime
            </span>
          </div>

          <div className="text-base md:text-lg font-bold text-slate-900 mt-1">
            02h 15m
          </div>
        </div>

      </div>

      {/* Timeline — scrollable on mobile so the 18 time labels don't squish */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] md:min-w-0">
          <div className="bg-gray-50 rounded-full ">

            <div className="flex h-6 md:h-7 gap-2 md:gap-3">

              {/* Productive */}
              <div className="w-[14%] bg-green-500 rounded-md"></div>

              {/* Break */}
              <div className="w-[4%] bg-yellow-400 rounded-md"></div>

              {/* Productive */}
              <div className="w-[22%] bg-green-500 rounded-md"></div>

              {/* Break */}
              <div className="w-[13%] bg-yellow-400 rounded-md"></div>

              {/* Productive */}
              <div className="w-[18%] bg-green-500 rounded-md"></div>

              {/* Break */}
              <div className="w-[4%] bg-yellow-400 rounded-md"></div>

              {/* Overtime */}
              <div className="w-[2.5%] bg-blue-500 rounded-md"></div>

              {/* Overtime */}
              <div className="w-[2%] bg-blue-500 rounded-md"></div>

            </div>

          </div>

          {/* Time Labels */}
          <div className="flex justify-between mt-4 md:mt-6 text-gray-500 text-xs md:text-sm">

            <span>06:00</span>
            <span>07:00</span>
            <span>08:00</span>
            <span>09:00</span>
            <span>10:00</span>
            <span>11:00</span>
            <span>12:00</span>
            <span>01:00</span>
            <span>02:00</span>
            <span>03:00</span>
            <span>04:00</span>
            <span>05:00</span>
            <span>06:00</span>
            <span>07:00</span>
            <span>08:00</span>
            <span>09:00</span>
            <span>10:00</span>
            <span>11:00</span>

          </div>
        </div>
      </div>

    </div>
  );
}

export default WorkHoursTimeline;