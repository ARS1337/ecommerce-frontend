// src/pages/SearchPage.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchCategoriesRequest } from "../redux/categories/categoryActions";
import { searchRequest } from "../redux/search/searchActions";
import ListItem from "../components/ListItem";

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = useSelector((state) => state.categories.categories.data);
  const { data: searchData, loading, error, filters } = useSelector((state) => state.search);

  const products = searchData?.data || [];
  const total = searchData?.count || 0;

  // Sync filters from URL on first load
useEffect(() => {
  const priceGT = searchParams.get("priceGT") || "";
  const priceLT = searchParams.get("priceLT") || "";
  const category = searchParams.get("category") || "";
  const limit = parseInt(searchParams.get("limit")) || 12;
  const offset = parseInt(searchParams.get("offset")) || 0;

  const debounceTimer = setTimeout(() => {
    dispatch(
      searchRequest({
        priceGT,
        priceLT,
        category,
        limit,
        offset,
      })
    );
  }, 500); // Adjust debounce delay as needed

  return () => clearTimeout(debounceTimer);
}, [
  searchParams.get("priceGT"),
  searchParams.get("priceLT"),
  searchParams.get("category"),
  searchParams.get("limit"),
  searchParams.get("offset"),
  dispatch,
]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (name === "category" && value === "") {
        newParams.delete("category"); // Don't include category if "All"
      } else if (value) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }

      newParams.set("offset", 0); // Reset to first page
      return newParams;
    });
  };

  const handlePagination = (newOffset) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("offset", newOffset);
    setSearchParams(updatedParams);
  };

  const offset = parseInt(searchParams.get("offset")) || 0;
  const limit = parseInt(searchParams.get("limit")) || 12;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-900 text-white p-4 sm:p-8">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-1/4 mb-6 lg:mb-0 lg:mr-6 bg-neutral-950 p-6 rounded-xl border border-neutral-800 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gold">Filters</h2>


        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={searchParams.get("category") || ""}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
          >
            <option value="">All</option>
            {categories?.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Price Greater Than</label>
          <input
            type="number"
            name="priceGT"
            value={searchParams.get("priceGT") || ""}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Price Less Than</label>
          <input
            type="number"
            name="priceLT"
            value={searchParams.get("priceLT") || ""}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
          />
        </div>
      </aside>

      {/* Results */}
      <main className="flex-1">
        <h2 className="text-2xl font-semibold mb-4 text-gold">Results</h2>

        {loading && <p className="text-gray-400">Loading products...</p>}
        {error && <p className="text-red-400">Error: {error}</p>}
        {!loading && !error && products.length === 0 && <p className="text-gray-400">No products found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-neutral-800 rounded-xl p-4 shadow hover:shadow-lg transition">
              <ListItem item={product} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2 items-center">
            {/* Prev Button */}
            <button
              onClick={() => handlePagination((currentPage - 2) * limit)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded bg-neutral-800 text-white disabled:opacity-50"
            >
              Prev
            </button>

            {/* Pagination Numbers */}
            {(() => {
              const buttons = [];
              const maxPageButtons = 3;

              const startPage = Math.max(
                1,
                Math.min(currentPage - Math.floor(maxPageButtons / 2), totalPages - maxPageButtons + 1)
              );
              const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

              if (startPage > 1) {
                buttons.push(
                  <button
                    key={1}
                    onClick={() => handlePagination(0)}
                    className="px-3 py-2 rounded bg-neutral-800 text-white"
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  buttons.push(
                    <span key="start-ellipsis" className="px-2 text-white">
                      ...
                    </span>
                  );
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                const pageOffset = (i - 1) * limit;
                buttons.push(
                  <button
                    key={i}
                    onClick={() => handlePagination(pageOffset)}
                    className={`px-3 py-2 rounded ${
                      i === currentPage ? "bg-gold text-black font-bold" : "bg-neutral-700 text-white"
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  buttons.push(
                    <span key="end-ellipsis" className="px-2 text-white">
                      ...
                    </span>
                  );
                }
                buttons.push(
                  <button
                    key={totalPages}
                    onClick={() => handlePagination((totalPages - 1) * limit)}
                    className="px-3 py-2 rounded bg-neutral-800 text-white"
                  >
                    {totalPages}
                  </button>
                );
              }

              return buttons;
            })()}

            {/* Next Button */}
            <button
              onClick={() => handlePagination(currentPage * limit)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded bg-neutral-800 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
