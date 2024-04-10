import SportsFilter from "../components/SportsFilter.jsx";
import FiltersFilter from "../components/FiltersFilter.jsx";
import PriceFilter from "../components/PriceFilter.jsx";

const HomeFilters = ({
  isFiltersOpen,
  selectedSports,
  handleSportsChange,
  selectedFilters,
  handleFiltersChange,
  selectedPrice,
  setSelectedPrice,
}) => {
  return (
    <>
      <section className="inline lg:hidden">
        {isFiltersOpen && (
          <>
            <section className="top-16 h-fit rounded-lg border border-slate-300 p-5 lg:sticky">
              <div className="space-y-5">
                <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
                  Filter nach:
                </h3>
                <span className="space-y-5">
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
                </span>
              </div>
            </section>
          </>
        )}
      </section>

      <section className="hidden lg:inline">
        <section className="top-16 h-fit rounded-lg border border-slate-300 p-5 lg:sticky">
          <div className="space-y-5">
            <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">
              Filter nach:
            </h3>
            <span className="space-y-5">
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
            </span>
          </div>
        </section>
      </section>
    </>
  );
};

export default HomeFilters;
