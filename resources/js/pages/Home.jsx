import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Zap, Shield } from "lucide-react";
import { Button } from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import heroBackground from "@/assets/hero-background.jpg";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90"></div>
        </div>

        {/* Content */}
        <div className="container relative mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Discover Amazing Tech Products
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/95 drop-shadow-md">
              Shop the latest gadgets and electronics at unbeatable prices. Quality products, fast shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="gap-2 group text-lg px-8 py-6 shadow-elegant">
                  Shop Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-soft transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">Get your orders delivered quickly and safely</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-soft transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">100% secure transactions with buyer protection</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-soft transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy on all products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Handpicked items just for you</p>
          </div>

          {loading ? (
            <div className="text-center">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
