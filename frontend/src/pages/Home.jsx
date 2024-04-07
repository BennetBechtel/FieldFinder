import { useSearchContext } from "../contexts/SearchContext.jsx";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.js";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

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
    <div className="flex grow flex-col items-center gap-5 px-1">
      <span className="mt-5 flex w-1/2 justify-center">
        <SearchBar />
      </span>

      <div className="grid min-w-full grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
        <div className="sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
          <div className="space-y-5">
            <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
              Filter nach:
            </h3>
            Filter
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-xl font-bold">
            {gymData?.pagination.total} Sporthallen{" "}
            {search.searchTerm
              ? `in ${search.searchTerm[0].toUpperCase() + search.searchTerm.slice(1).toLowerCase()}`
              : ""}{" "}
            gefunden
          </span>
          {/*  </div>
        {gymData?.data.map((gym) => (
          <SearchResultsCard hotel={gym} />
        ))}
        <div>
          <Pagination
            page={gymData?.pagination.page || 1}
            pages={gymData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div> */}
          <div className="flex grow flex-col gap-5">
            {gymData?.data.map((gym, index) => (
              <SearchResultCard gym={gym} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
