import { gymSports } from "../config/gym-options-config.js";

const SportsFilter = ({ selectedSports, onChange }) => {
  return (
    <>
      <div className="border-b border-slate-300 pb-5">
        <h4 className="mb-2 text-xl font-semibold">Sportarten</h4>
        <div>
          {gymSports.map((item, index) => (
            <div key={index} className="ml-2">
              <h3 className="mt-1 text-lg font-medium">{item.title}</h3>
              <div className="flex flex-col justify-center gap-1 text-center">
                {item.sports.map((sport, sportIndex) => (
                  <label
                    key={sportIndex}
                    className="ml-2 flex w-fit cursor-pointer select-none items-center justify-center gap-1 pr-3 text-center text-lg font-medium text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={sport}
                      checked={selectedSports.includes(sport)}
                      onChange={onChange}
                    />
                    {sport}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SportsFilter;
