import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";

const Home = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);

  const searchParams = {
    searchTerm: search.searchTerm,
    page: page.toString(),
  };

  const { data: gymData } = useQuery(["searchGyms", searchParams], () =>
    apiClient.searchGyms(searchParams),
  );

  return (
    <div className="flex grow flex-col items-center gap-5 px-5 lg:px-2">
      <span className="mt-5 w-full max-w-lg">
        <SearchBar />
      </span>

      <div className="grid max-w-[1900px] grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        <section className="top-10 h-fit rounded-lg border border-slate-300 p-5 lg:sticky">
          <div className="space-y-5">
            <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
              Filter nach:
            </h3>
            Filter
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <span className="text-xl font-bold">
            {gymData?.pagination.total} Sporthallen{" "}
            {search.searchTerm
              ? `in ${search.searchTerm[0].toUpperCase() + search.searchTerm.slice(1).toLowerCase()}`
              : ""}{" "}
            gefunden
          </span>

          <span className="flex justify-center">
            <div className="3xl:grid-cols-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gymData?.data.map((gym, index) => (
                <SearchResultCard gym={gym} key={index} />
              ))}
            </div>
          </span>
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
