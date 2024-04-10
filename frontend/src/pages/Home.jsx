import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";
import SportsFilter from "../components/SportsFilter.jsx";
import FiltersFilter from "../components/FiltersFilter.jsx";
import PriceFilter from "../components/PriceFilter.jsx";

const Home = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");

  const searchParams = {
    searchTerm: search.searchTerm,
    page: page.toString(),
    sports: selectedSports,
    filters: selectedFilters,
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

  const handleFiltersChange = (event) => {
    const filter = event.target.value;

    setSelectedFilters((prevFilter) =>
      event.target.checked
        ? [...prevFilter, filter]
        : prevFilter.filter((prevFilter) => prevFilter !== filter),
    );
  };

  return (
    <div className="flex grow flex-col items-center gap-5 px-5 lg:px-2">
      <span className="mt-5 w-full max-w-lg">
        <SearchBar />
      </span>

      <div className="grid h-full w-full max-w-[1900px] grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        <section className="top-16 h-fit rounded-lg border border-slate-300 p-5 lg:sticky">
          <div className="space-y-5">
            <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
              Filter nach:
            </h3>
            <SportsFilter
              selectedSports={selectedSports}
              onChange={handleSportsChange}
            />
            <FiltersFilter
              selectedFilters={selectedFilters}
              onChange={handleFiltersChange}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value) => setSelectedPrice(value)}
            />
          </div>
        </section>

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
