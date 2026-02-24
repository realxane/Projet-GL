import { Link } from "react-router-dom";
import { ShoppingCart, Calendar, ChevronRight, Star } from "lucide-react";
import { sampleProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";

const categories = [
  { name: "Pizzas", emoji: "🍕" },
  { name: "Plats du jour", emoji: "🍛" },
  { name: "Boissons", emoji: "🥤" },
  { name: "Grillades", emoji: "🍖" },
  { name: "Entrées", emoji: "🥗" },
];

export default function HomePage() {
  const featured = sampleProducts.slice(0, 4);
  const recommended = sampleProducts.filter((p) => p.score);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mx-4 mt-4 md:mx-6 md:mt-6">
        <img src={heroBg} alt="Plats africains" className="w-full h-[340px] md:h-[420px] object-cover" />
        <div className="absolute inset-0 bg-gradient-hero flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3 leading-tight">
            Doumini Teliman
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-md">
            Commandez à domicile ou réservez votre table en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/menu"
              className="bg-gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5" /> Commander
            </Link>
            <Link
              to="/reservation"
              className="bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground border border-primary-foreground/30 font-semibold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-primary-foreground/30 transition-colors"
            >
              <Calendar className="w-5 h-5" /> Réserver une table
            </Link>
          </div>
        </div>
      </section>

      <div className="container py-8 space-y-10">
        {/* Categories */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Catégories</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={`/menu?cat=${encodeURIComponent(c.name)}`}
                className="flex flex-col items-center gap-2 min-w-[90px] bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all"
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-xs font-medium text-foreground whitespace-nowrap">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Suggestions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Suggestions pour vous</h2>
            <Link to="/menu" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
              Voir tout <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold text-foreground">Recommandations</h2>
              <span className="text-sm text-muted-foreground">(Basées sur vos préférences)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
