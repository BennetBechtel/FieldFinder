import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";
import { TbFilterSearch } from "react-icons/tb";
import HomeFilters from "../components/HomeFilters.jsx";

const Home = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const searchParams = {
    searchTerm: search.searchTerm,
    page: page.toString(),
    sports: selectedSports,
    equipment: selectedEquipment,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: gymData } = useQuery(["searchGyms", searchParams], () =>
    apiClient.searchGyms(searchParams),
  );

  const handleSportsChange = (event) => {
    const sport = event.target.value;

    setSelectedSports((prevSports) =>
      event.target.checked
        ? [...prevSports, sport]
        : prevSports.filter((prevSport) => prevSport !== sport),
    );
  };

  const handleEquipmentChange = (event) => {
    const equip = event.target.value;

    setSelectedEquipment((prevEquip) =>
      event.target.checked
        ? [...prevEquip, equip]
        : prevEquip.filter((prevEquip) => prevEquip !== equip),
    );
  };

  return (
    <div className="flex grow flex-col items-center gap-5 px-3">
      <span className="mt-5 flex w-full max-w-lg flex-row items-center gap-3">
        <span className="grow">
          <SearchBar />
        </span>

        <span
          onClick={() => {
            toggleFilters();
          }}
          className="flex size-11 flex-row items-center justify-center rounded-full bg-zinc-300 p-[10px] lg:hidden"
        >
          <TbFilterSearch className="size-10" />
        </span>
      </span>

      <div className="grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        <HomeFilters
          isFiltersOpen={isFiltersOpen}
          selectedSports={selectedSports}
          handleSportsChange={handleSportsChange}
          selectedEquipment={selectedEquipment}
          handleEquipmentChange={handleEquipmentChange}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />

        <section className="flex flex-col gap-5">
          <div>
            {!gymData ? (
              <>
                <p className="text-xl font-bold">
                  Fehler beim Laden der Sporthallen
                </p>
              </>
            ) : (
              <>
                <span className="flex flex-col justify-between gap-2 text-center lg:flex-row">
                  <span className="flex flex-row gap-1 text-xl font-bold">
                    <p>{gymData?.pagination.total}</p>
                    {gymData?.pagination.total > 1 ? (
                      <p>Sporthallen gefunden</p>
                    ) : (
                      <p>Sporthalle gefunden</p>
                    )}
                  </span>
                  <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                    className="cursor-pointer rounded-md border p-2"
                  >
                    <option value="">Sortiere nach</option>
                    <option value="pricePerHourAsc">Preis aufsteigend</option>
                    <option value="pricePerHourDesc">Preis absteigend</option>
                  </select>
                </span>
              </>
            )}
          </div>

          {gymData?.pagination.total > 0 && (
            <>
              <span className="flex justify-center">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
                  {gymData?.data.map((gym, index) => (
                    <SearchResultCard gym={gym} key={index} />
                  ))}
                </div>
              </span>
            </>
          )}
        </section>
      </div>
      <div>
        <Pagination
          page={gymData?.pagination.page || 1}
          pages={gymData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Home;
