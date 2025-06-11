import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseFromCart } from "../redux/cart/cartReducer"; // update the path if needed

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cart.items.find((i) => i.id === product?.id));

  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();

        // Normalize product structure
        const normalizedProduct = {
          ...data,
          images: [data.image, ...(data.extraImages || [])],
          price: parseFloat(data.price),
          discountedPrice: data.discountedPrice ? parseFloat(data.discountedPrice) : null,
          rating: data.rating ?? 0,
          category: data.Category?.name || "Uncategorized",
        };

        setProduct(normalizedProduct);
        setMainImage(normalizedProduct.images[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="inline-block text-gold" fill="#D4AF37" />);
    }
    if (halfStar) {
      stars.push(<Star key="half" className="inline-block text-gold" fill="url(#halfGradient)" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="inline-block text-gray-700" />);
    }
    return stars;
  };

  if (loading) return <div className="text-center text-white p-10">Loading...</div>;
  if (error) return <div className="text-center text-red-400 p-10">Error: {error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 rounded-lg border border-gold text-gold font-sans">
      <h1 className="text-4xl font-extrabold mb-6 border-b-2 border-gold pb-3 uppercase tracking-wide">
        {product.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="border-4 border-gold rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-transform hover:scale-[1.02]"
            />
          </div>
          <div className="flex gap-4 mt-2 overflow-x-auto">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-md overflow-hidden w-20 h-20 flex-shrink-0 ${
                  mainImage === img ? "border-gold" : "border-transparent"
                } transition`}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              {renderStars()}
              <span className="text-yellow-300 font-semibold ml-2">{product.rating.toFixed(1)}</span>
            </div>

            <p className="mb-6 text-lg leading-relaxed">{product.description}</p>

            <div className="mb-6">
              {product.discountedPrice ? (
                <>
                  <span className="text-2xl font-bold line-through text-red-600 mr-3">${product.price.toFixed(2)}</span>
                  <span className="text-3xl font-extrabold text-gold">${product.discountedPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-gold">${product.price.toFixed(2)}</span>
              )}
            </div>

            <p className="mb-2 uppercase tracking-wide text-sm text-yellow-400 font-semibold">
              Category: {product.category}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-700 bg-opacity-30 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {cartItem ? (
            <div className="mt-8 flex items-center justify-between border border-neutral-700 p-2 rounded-xl bg-neutral-800">
              <button
                onClick={() => dispatch(decreaseFromCart(product))}
                className="bg-neutral-950 text-gold px-3 py-1 font-bold rounded hover:bg-gold hover:text-black border border-gold transition"
              >
                −
              </button>
              <span className="px-4 text-lg font-semibold">{cartItem.quantity}</span>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-neutral-950 text-gold px-3 py-1 font-bold rounded hover:bg-gold hover:text-black border border-gold transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-8 w-full bg-gold text-black py-2 text-sm font-bold rounded-xl border border-gold hover:bg-neutral-900 hover:text-gold transition"
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
