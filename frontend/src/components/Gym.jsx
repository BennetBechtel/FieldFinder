const Gym = ({ name, city, zip_code, address, img_url }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto mb-auto w-[320px]">
      <img
        className="w-full h-48 object-cover object-center"
        src={img_url}
        alt="Halle"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600 mb-2">{city}</p>
        <div className="flex items-center justify-between">
          <section className="flex flex-col">
            <p className="text-gray-800 font-semibold">{address}</p>
            <p className="text-gray-800 font-medium text-xs">{zip_code}</p>
            <p></p>
          </section>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700">
            Jetzt mieten
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gym;
