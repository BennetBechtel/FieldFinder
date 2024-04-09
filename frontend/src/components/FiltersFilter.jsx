import { gymFilters } from "../config/gym-options-config.js";

const FiltersFilter = ({ selectedFilters, onChange }) => {
  return (
    <>
      <div className="border-b border-slate-300 pb-5">
        <h4 className="mb-2 text-xl font-semibold">Ausstattung</h4>
        <div>
          {gymFilters.map((item, index) => (
            <div key={index} className="ml-2">
              <h3 className="mt-1 text-lg font-medium">{item.title}</h3>
              <div className="flex flex-col gap-1">
                {item.filters.map((filter, filterIndex) => (
                  <label
                    key={filterIndex}
                    className="ml-2 flex w-fit cursor-pointer select-none gap-1 pr-3 text-lg font-medium text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={filter}
                      checked={selectedFilters.includes(filter)}
                      onChange={onChange}
                    />
                    {filter}
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

export default FiltersFilter;
