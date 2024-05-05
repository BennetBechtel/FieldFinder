import { gymEquipment } from "../config/gym-options-config.js";

const EquipmentFilter = ({ selectedEquipment, onChange }) => {
  return (
    <>
      <div className="border-b border-slate-300 pb-5">
        <h4 className="mb-2 text-xl font-semibold">Ausstattung</h4>
        <div>
          {gymEquipment.map((item, index) => (
            <div key={index} className="ml-2">
              <h3 className="mt-1 text-lg font-medium">{item.title}</h3>
              <div className="flex flex-col gap-1">
                {item.equipment.map((equip, equipIndex) => (
                  <label
                    key={equipIndex}
                    className="ml-2 flex w-fit cursor-pointer select-none gap-1 pr-3 text-lg font-medium text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={equip}
                      checked={selectedEquipment.includes(equip)}
                      onChange={onChange}
                    />
                    {equip}
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

export default EquipmentFilter;
