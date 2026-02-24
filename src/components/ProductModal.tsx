import { Product } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { X, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, open, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  if (!open) return null;

  const handleAdd = () => {
    addItem(product, qty, note);
    setQty(1);
    setNote("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div
        className="relative bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 z-10 p-2 bg-card/80 rounded-full hover:bg-muted transition-colors" aria-label="Fermer">
          <X className="w-5 h-5" />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-t-2xl" />
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
            <span className="font-bold text-primary text-lg">{product.priceLabel}</span>
          </div>
          {product.score && (
            <p className="text-sm text-primary flex items-center gap-1 mb-2">
              <Star className="w-3.5 h-3.5" /> Recommandé pour vous — score {product.score}
            </p>
          )}
          <p className="text-muted-foreground mb-4">{product.description}</p>

          {product.score && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Pourquoi :</strong> vous avez aimé Poulet Yassa et évitez les plats contenant noix.
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-foreground block mb-1">Note pour la cuisine</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="ex : sans oignon"
              className="w-full bg-muted rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-foreground">Quantité</span>
            <div className="flex items-center bg-muted rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-border rounded-l-lg transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-semibold text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-border rounded-r-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.available}
            className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Ajouter au panier — {(product.price * qty).toLocaleString("fr-FR")} FCFA
          </button>
        </div>
      </div>
    </div>
  );
}
