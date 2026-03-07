import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductSlider = ({ title, products }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity : 1 }));
  };

  return (
    <section className="py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>

        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 glass-card hover:glow-on-hover transition"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="p-2 glass-card hover:glow-on-hover transition"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex flex-col shrink-0 w-80 glass-card hover:glow-on-hover hover:-translate-y-2 transition-all duration-300 group rounded-xl"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {new Date() - new Date(product.created_at) <
                  30 * 24 * 60 * 60 * 1000 && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                    NEW
                  </span>
                )}

                {product.ratings >= 4.5 && (
                  <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded">
                    TOP RATED
                  </span>
                )}
              </div>

              {/* Quick Add Button */}
              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={product.stock === 0}
                 className={`absolute bottom-3 right-3 z-20 p-2 rounded-full shadow-md border transition-all duration-300
            ${
              product.stock === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                : "bg-background dark:bg-card border-border text-primary opacity-0 group-hover:opacity-100 hover:scale-110"
            }`}
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>

              {/* Ratings */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.ratings)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.review_count})
                </span>
              </div>

              {/* Price */}
              <div className="text-xl font-bold text-primary mb-3">
                ${product.price}
              </div>

              {/* Stock Status */}
              <span
                className={`text-xs px-2 py-1 rounded w-fit ${
                  product.stock > 5
                    ? "bg-green-500/20 text-green-400"
                    : product.stock > 0
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {product.stock > 5
                  ? "In Stock"
                  : product.stock > 0
                  ? "Limited Stock"
                  : "Out of Stock"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductSlider;