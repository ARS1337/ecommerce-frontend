import { useDispatch, useSelector } from "react-redux";
import HorizontalLister from "../components/HorizontalLister";
import { useEffect } from "react";
import { fetchCategoriesRequest } from "../redux/categories/categoryActions";
import { fetchProductsRequest } from "../redux/product/productActions";

const ProductListing = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories.data);
  const products = useSelector((state) => state.product.products); 

  useEffect(() => {
    dispatch(fetchCategoriesRequest({ limit: 6, offset: 0 }));  
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0) {
      categories.forEach((cat) => {
        dispatch(
          fetchProductsRequest({
            category: cat.name,
          })
        );
      });
    }
  }, [categories, dispatch]);

  return (
    <div className="px-4 sm:px-8 bg-neutral-900 text-white min-h-screen">
      {categories?.map((cat) => {
        console.log("qweqweqw products ",products)
        console.log("qweqweqw cat.name ",cat.name)
        const categoryProducts = products[cat.name]?.products || [];

        return (
          <section
            key={cat.name}
            className="border border-neutral-800 rounded-xl p-6 my-6 bg-neutral-950 shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-gold mb-4 border-b border-neutral-800 pb-2">
              {cat.name}
            </h2>
            <HorizontalLister list={categoryProducts} />
          </section>
        );
      })}
    </div>
  );
};

export default ProductListing;
