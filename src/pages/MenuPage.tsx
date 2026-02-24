import { useState } from "react";
import { sampleProducts, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

export default function MenuPage() {
  const [category, setCategory] = useState("Tous");
  const [sort, setSort] = useState("popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [prefs, setPrefs] = useState<string[]>([]);

  const togglePref = (p: string) =>
    setPrefs((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  let filtered = category === "Tous" ? sampleProducts : sampleProducts.filter((p) => p.category === category);
  if (prefs.includes("Épicé")) filtered = filtered.filter((p) => p.tags.includes("Épicé"));
  if (prefs.includes("Végétarien")) filtered = filtered.filter((p) => p.tags.includes("Végétarien"));

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="container py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Notre Menu</h1>
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden p-2 rounded-lg bg-muted hover:bg-border transition-colors">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside className={`${filtersOpen ? "fixed inset-0 z-40 bg-foreground/40 lg:relative lg:bg-transparent" : "hidden lg:block"} lg:w-60 shrink-0`}>
          <div className={`${filtersOpen ? "absolute right-0 top-0 h-full w-72 bg-card p-6 shadow-xl animate-fade-in" : ""} lg:relative lg:w-auto lg:shadow-none lg:p-0`}>
            {filtersOpen && (
              <button onClick={() => setFiltersOpen(false)} className="lg:hidden absolute top-4 right-4 p-1 rounded hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Catégorie</h3>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === c ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Préférences</h3>
                {["Épicé", "Végétarien", "Sans gluten"].map((p) => (
                  <label key={p} className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefs.includes(p)}
                      onChange={() => togglePref(p)}
                      className="rounded border-border accent-primary"
                    />
                    {p}
                  </label>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Trier par</h3>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-muted rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="popularity">Popularité</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">Aucun plat trouvé pour ces filtres.</p>
          )}
        </div>
      </div>
    </div>
  );
}
