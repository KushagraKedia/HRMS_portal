// SkillChart.jsx
function SkillChart() {
  const skills = [
    { name: "Sales", percentage: 40 },
    { name: "Front End", percentage: 20 },
    { name: "React", percentage: 35 },
    { name: "UI", percentage: 10 },
  ];

  return (
    <div className="flex items-end gap-2 md:gap-4 h-60 md:h-95 mt-5 mx-1">

      {skills.map((skill, index) => (
        <div key={index} className="flex flex-col items-center flex-1">

          {/* Bar Container */}
          <div className="relative w-full md:w-20 h-48 md:h-80 bg-gray-100 rounded-xl overflow-hidden">

            {/* Filled Part */}
            <div
              className="absolute bottom-0 w-full rounded-xl bg-gradient-to-b from-[#F4B48E] to-[#FFF6F0]"
              style={{ height: `${skill.percentage * 1.8}%` }}
            />

            {/* Percentage */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs md:text-sm font-semibold whitespace-nowrap">
              {skill.percentage}%
            </div>

          </div>

          {/* Label */}
          <p className="mt-2 md:mt-4 text-xs md:text-base font-medium text-center">
            {skill.name}
          </p>

        </div>
      ))}

    </div>
  );
}

export default SkillChart;