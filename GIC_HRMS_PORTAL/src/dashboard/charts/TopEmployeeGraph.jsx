import person1 from "../../assets/person-m-1.webp"
import person2 from "../../assets/person-m-2.webp"
import person3 from "../../assets/person-m-3.webp"
import person4 from "../../assets/person-f-1.webp"
import person5 from "../../assets/person-f-2.webp"
import person6 from "../../assets/person-m-4.webp"
import person7 from "../../assets/person-m-5.webp"
import person8 from "../../assets/person-m-6.webp"
import person9 from "../../assets/person9.webp"
import person10 from "../../assets/person10.webp"

function TopEmployeeGraph() {
  const employees = [
    { id: 1, score: 100, image: person1 },
    { id: 2, score: 95, image: person2 },
    { id: 3, score: 102, image: person3 },
    { id: 4, score: 101, image: person4 },
    { id: 5, score: 100, image: person5 },
    { id: 6, score: 70, image: person6 },
    { id: 7, score: 45, image: person7 },
    { id: 8, score: 78, image: person8 },
    { id: 9, score: 75, image: person9 },
    { id: 10, score: 80, image: person10 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl">

      {/* Scale */}

      <div className="relative h-40 border-b border-gray-200">

        <div className="absolute top-0 left-0 right-0 border-t border-gray-200">
          <span className="absolute -left-6 -top-3 text-gray-400">
            110
          </span>
        </div>

        <div className="absolute top-12 left-0 right-0 border-t border-gray-200">
          <span className="absolute -left-4 -top-3 text-gray-400">
            50
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200">
          <span className="absolute -left-2 -top-3 text-gray-400">
            0
          </span>
        </div>

        {/* Graph */}

        <div className="flex justify-between items-end h-full px-4">

          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col items-center justify-end h-full"
            >

              {/* Line + Circle */}

              <div
                className="relative w-2 bg-slate-300 rounded-full"
                style={{
                  height: `${employee.score}px`,
                }}
              >

                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2
                             w-3 h-3 rounded-full bg-[#0D5A6A]"
                />
              </div>

              {/* Avatar */}

              <img
                src={employee.image}
                alt=""
                className="w-5 h-5 rounded-full object-cover mt-4"
              />

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default TopEmployeeGraph;