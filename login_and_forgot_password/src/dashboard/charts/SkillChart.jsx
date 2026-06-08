function SkillChart() {
  const skills = [
    { name: "Sales", percentage: 40 },
    { name: "Front End", percentage: 20 },
    { name: "React", percentage: 35 },
    { name: "UI", percentage: 10 },
  ];

  return (
    <div className="flex items-end gap-4 h-95 mt-5 mx-1">

      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
        >

          {/* Bar Container */}
          <div className="relative w-20 h-80 bg-gray-100 rounded-xl overflow-hidden">

            {/* Filled Part */}
            <div
              className="absolute bottom-0 w-full rounded-xl
                         bg-gradient-to-b
                         from-[#F4B48E]
                         to-[#FFF6F0]"
              style={{
                height: `${skill.percentage * 1.8}%`,
              }}
            />

            {/* Percentage */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold">
              {skill.percentage}%
            </div>

          </div>

          {/* Label */}
          <p className="mt-4 text-base font-medium">
            {skill.name}
          </p>

        </div>
      ))}

    </div>
  );
}

export default SkillChart;