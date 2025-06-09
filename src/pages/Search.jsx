import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get("q")?.trim().toLowerCase() ?? "";

  // Replace with your own product list or fetch from state/store/api
  const allProducts = []; // You can replace this with useSelector or props
  const filtered = allProducts.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-6 font-mono text-white">
      <h2 className="text-2xl font-bold mb-4 border-b border-gold pb-2">
        Results for: <span className="text-gold">"{searchTerm}"</span>
      </h2>

      {filtered.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border-4 border-gold p-4 text-center bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover mb-2 border border-gold"
              />
              <p className="font-bold text-gold">{item.name}</p>
              <p className="text-sm">${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 italic">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
