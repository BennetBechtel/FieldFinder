const Home = () => {
  return <div>Home Page</div>;
};

export default Home;

/*
<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gymData.map((gym) => (
          <>
            <div className="mx-auto max-w-md transform overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img
                src={gym.imageUrls[0]}
                alt={gym.name}
                className="h-64 w-full object-cover"
              />
              <div className="px-6 py-4">
                <div className="mb-2 text-xl font-bold">{gym.name}</div>
                <p className="mb-2 text-sm text-gray-600">
                  {gym.address}, {gym.zipCode} {gym.city}
                </p>
                <p className="mb-2 text-lg text-gray-800">
                  ${gym.pricePerHour} per hour
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
*/
