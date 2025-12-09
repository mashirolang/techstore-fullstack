import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/products">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image_url || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit mb-4">
              {product.category}
            </Badge>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                      }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
            </div>

            <div className="text-4xl font-bold text-primary mb-6">
              ${Number(product.price).toFixed(2)}
            </div>

            <p className="text-muted-foreground text-lg mb-8">
              {product.description}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-5 w-5 text-primary" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-5 w-5 text-primary" />
                <span>1-year warranty included</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0 && !product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {(product.stock > 0 || product.inStock) ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

            {(product.stock === 0 && !product.inStock) && (
              <p className="text-destructive text-sm mt-4">
                This item is currently out of stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
