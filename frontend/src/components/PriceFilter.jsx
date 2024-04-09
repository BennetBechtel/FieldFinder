const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <>
      <div className="border-b border-slate-300 pb-5">
        <h4 className="mb-2 text-xl font-semibold">Max. Preis</h4>
        <select
          value={selectedPrice}
          onChange={(event) =>
            onChange(
              event.target.value ? parseInt(event.target.value) : undefined,
            )
          }
          className="w-full rounded-md border p-2"
        >
          <option value="">Preis auswählen</option>
          {[10, 20, 30, 40, 50].map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PriceFilter;
