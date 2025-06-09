import React, { useState } from "react";
import { Star } from "lucide-react"; // star icon from lucide

const ProductDetails = () => {
  const product = {
    name: "Luxury Watch",
    images: ["https://placehold.co/300x300/ffffff/000000?text=BLACKBOX+PLATE&font=monospace", 
        "https://placehold.co/300x300/ffffff/000000?text=GLITCH+TEE&font=monospace",
         "https://placehold.co/300x300/ffffff/000000?text=404+SOCKS&font=monospace"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae ligula sed sem bibendum luctus at ut orci. Praesent sit amet convallis lectus. Suspendisse pretium enim ac tempor volutpat. In faucibus ex quis libero bibendum, quis rutrum justo rutrum. Suspendisse euismod velit accumsan quam fermentum, sit amet molestie lacus dictum. In hac habitasse platea dictumst. Sed in porta mauris, ac facilisis dolor. Nullam pretium sapien eros, aliquet rhoncus magna gravida at. In in mi eu urna bibendum tempor. Sed purus magna, aliquam in arcu sed, pretium venenatis ante. Ut at lacus lacinia, molestie risus ut, scelerisque lorem. Duis tristique leo elit, vitae venenatis orci ornare egestas. Cras molestie urna felis, nec gravida mauris pulvinar non.",
    rating: 4.5, // out of 5
    price: 499.99,
    discountedPrice: 399.99,
    tags: ["Luxury", "Watch", "Limited Edition"],
    category: "Accessories",
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  // Helper to render rating stars
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
    // Fill remaining with empty stars
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="inline-block text-gray-700" />);
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 rounded-lg border border-gold text-gold font-sans">
      <h1 className="text-4xl font-extrabold mb-6 border-b-2 border-gold pb-3 uppercase tracking-wide">
        {product.name}
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Images */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="border-4 border-gold rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-transform hover:scale-[1.02]"
            />
          </div>

          {/* Thumbnail images */}
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

        {/* Right: Details */}
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div>
            {/* Rating */}
            <div className="mb-4 flex items-center gap-2">
              {renderStars()}
              <span className="text-yellow-300 font-semibold ml-2">{product.rating.toFixed(1)}</span>
            </div>

            {/* Description */}
            <p className="mb-6 text-lg leading-relaxed">{product.description}</p>

            {/* Price */}
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

            {/* Category */}
            <p className="mb-2 uppercase tracking-wide text-sm text-yellow-400 font-semibold">
              Category: {product.category}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-700 bg-opacity-30 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-8 bg-gradient-to-r from-gold to-yellow-400 text-gray-900 font-bold py-3 rounded-lg shadow-lg hover:from-yellow-400 hover:to-gold transition"
            // onClick={... add to cart handler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
