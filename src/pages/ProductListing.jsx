import HorizontalLister from "../components/HorizontalLister";
import { listOfProducts } from "../constants";

const ProductListing = () => {
  return (
    <div className="px-4 sm:px-8 bg-neutral-900 text-white min-h-screen">
      <section className="border border-neutral-800 rounded-xl p-6 my-6 bg-neutral-950 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-gold mb-4 border-b border-neutral-800 pb-2">
          Category 1
        </h2>
        <HorizontalLister list={listOfProducts} />
      </section>
    </div>
  );
};

export default ProductListing;
