function RecruitmentStatistics() {
  const recruitmentData = [
    {
      label: "Applications",
      percent: 40,
      employees: 57,
      color: "#F7651F",
    },
    {
      label: "Screening",
      percent: 20,
      employees: 36,
      color: "#0F566B",
    },
    {
      label: "Interview",
      percent: 23,
      employees: 64,
      color: "#F33CA2",
    },
    {
      label: "Hired",
      percent: 17,
      employees: 18,
      color: "#10C84A",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6">

      {/* Top Stats */}
      <div className="flex justify-between mb-2">

        <div className="text-center">
          <p className="text-gray-500 text-base">
            Applicants
          </p>

          <h2 className="text-lg font-bold text-slate-900">
            487
          </h2>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-base">
            Hired
          </p>

          <h2 className="text-lg font-bold text-slate-900">
            24
          </h2>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-base">
            Avg Time
          </p>

          <h2 className="text-lg font-bold text-slate-900">
            28 days
          </h2>
        </div>

      </div>

      {/* Progress Bar */}

      <div className="flex h-8 overflow-hidden rounded-full mb-2">

        {recruitmentData.map((item) => (
          <div
            key={item.label}
            style={{
              width: `${item.percent}%`,
              backgroundColor: item.color,
            }}
          />
        ))}

      </div>

      {/* Legend */}

      <div className="grid grid-cols-2 gap-y-1 gap-x-12">

        {recruitmentData.map((item) => (
          <div key={item.label}>

            <div className="flex items-center gap-1 mb-2 mt-2">

              <div
                className="w-1 h-6 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="font-semibold text-sm">
                {item.label}
              </span>

            </div>

            <p className="text-gray-500 text-sm">
              {item.percent}% - {item.employees} Employees
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecruitmentStatistics;