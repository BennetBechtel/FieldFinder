import { gymFilters } from "../../config/gym-options-config.js";
import { useFormContext } from "react-hook-form";

const FilterSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Filter</h2>

      <div>
        {gymFilters.map((item, index) => (
          <div key={index} className="ml-2">
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <div className="flex flex-col gap-1">
              {item.filters.map((filter, filterIndex) => (
                <label
                  key={filterIndex}
                  className="ml-2 flex w-fit cursor-pointer select-none gap-1 pr-3 text-lg font-semibold text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={filter}
                    {...register("filters", {
                      validate: (filters) => {
                        if (filters && filters.length > 0) {
                          return true;
                        } else {
                          return "Wähle mindestens einen Filter aus";
                        }
                      },
                    })}
                  />
                  {filter}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {errors.filters && (
        <span className="input-error-message">{errors.filters.message}</span>
      )}
    </div>
  );
};

export default FilterSection;
