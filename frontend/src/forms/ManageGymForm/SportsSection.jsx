import { gymSports } from "../../config/gym-options-config.js";
import { useFormContext } from "react-hook-form";

const SportsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Sportarten</h2>
      <div>
        {gymSports.map((item, index) => (
          <div key={index} className="ml-2">
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <div className="flex flex-col gap-1">
              {item.sports.map((sport, sportIndex) => (
                <label
                  key={sportIndex}
                  className="ml-2 flex w-fit cursor-pointer select-none gap-1 pr-3 text-lg font-semibold text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={sport}
                    {...register("sports", {
                      validate: (sports) => {
                        if (sports && sports.length > 0) {
                          return true;
                        } else {
                          return "Wähle mindestens einen Sport aus";
                        }
                      },
                    })}
                  />
                  {sport}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {errors.sports && (
        <span className="input-error-message">{errors.sports.message}</span>
      )}
    </div>
  );
};

export default SportsSection;
