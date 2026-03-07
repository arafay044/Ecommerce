import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const isNew =
    new Date() - new Date(product.created_at) <
    30 * 24 * 60 * 60 * 1000;

  return (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="glass-card group hover:glow-on-hover hover:-translate-y-2 transition-all duration-300 rounded-xl flex flex-col"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2 z-10">
          {isNew && (
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
          <ShoppingCart className="w-5 h-5 stroke-2 text-primary" />
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
  );
};

export default ProductCard;