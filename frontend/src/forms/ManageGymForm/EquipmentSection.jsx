import { gymSports, gymEquipment } from "../../config/gym-options-config.js";
import { useFormContext } from "react-hook-form";

const EquipmentSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Ausstattung</h2>
      <div>
        {gymEquipment.map((item, index) => (
          <div key={index} className="ml-2">
            <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
            <div className="flex flex-col gap-1">
              {item.equipment.map((equip, equipIndex) => (
                <label
                  key={equipIndex}
                  className="ml-2 flex w-fit cursor-pointer select-none gap-1 pr-3 text-lg font-semibold text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={equip}
                    {...register("equipment", {
                      validate: (equipment) => {
                        if (equipment && equipment.length > 0) {
                          return true;
                        } else {
                          return "Wähle mindestens ein Feld aus";
                        }
                      },
                    })}
                  />
                  {equip}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {errors.equipment && (
        <span className="input-error-message">{errors.equipment.message}</span>
      )}
    </div>
  );
};

export default EquipmentSection;
