import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardFooter } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image_url || product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {(product.stock === 0 && !product.inStock) && (
            <Badge className="absolute top-2 right-2" variant="destructive">
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </span>
        <Button
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={product.stock === 0 && !product.inStock}
          className="gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
