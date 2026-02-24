import { Product } from "@/lib/data";
import { Plus, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {!product.available && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="bg-card text-foreground text-sm font-semibold px-3 py-1 rounded-full">Épuisé</span>
            </div>
          )}
          {product.score && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" /> Recommandé — {product.score}
            </span>
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            {product.tags.map((tag) => (
              <span key={tag} className="bg-accent text-accent-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">{product.priceLabel}</span>
            {product.available && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(product);
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-lg transition-colors"
                aria-label="Ajouter"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <ProductModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
