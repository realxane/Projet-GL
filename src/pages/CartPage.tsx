import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [promo, setPromo] = useState("");
  const [payment, setPayment] = useState("delivery");
  const [confirmed, setConfirmed] = useState(false);

  const deliveryFee = 1500;
  const total = totalPrice + deliveryFee;

  if (confirmed) {
    return (
      <div className="container py-20 text-center animate-slide-up">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Commande reçue</h1>
        <p className="text-muted-foreground mb-1">Référence : <strong className="text-foreground">CT-2026-001</strong></p>
        <p className="text-muted-foreground mb-6">Merci pour votre commande !</p>
        <Link to="/suivi" className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity inline-block">
          Suivre ma commande
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center animate-fade-in">
        <p className="text-muted-foreground mb-4">Votre panier est vide.</p>
        <Link to="/menu" className="text-primary font-medium hover:underline">Voir le menu</Link>
      </div>
    );
  }

  return (
    <div className="container py-6 animate-fade-in">
      <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Retour au menu
      </Link>
      <h1 className="text-2xl font-bold text-foreground mb-6">Votre panier</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="bg-card rounded-xl p-4 shadow-card flex gap-4 items-center">
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">{item.product.priceLabel}</p>
              </div>
              <div className="flex items-center bg-muted rounded-lg">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-border rounded-l-lg"><Minus className="w-3.5 h-3.5" /></button>
                <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-border rounded-r-lg"><Plus className="w-3.5 h-3.5" /></button>
              </div>
              <span className="font-semibold text-foreground text-sm w-24 text-right">{(item.product.price * item.quantity).toLocaleString("fr-FR")} FCFA</span>
              <button onClick={() => removeItem(item.product.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-6 shadow-card h-fit space-y-4">
          <h2 className="font-bold text-foreground">Résumé</h2>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Sous-total</span><span className="text-foreground">{totalPrice.toLocaleString("fr-FR")} FCFA</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Frais de livraison</span><span className="text-foreground">1 500 FCFA</span></div>

          <div className="flex gap-2">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Code promo" className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button className="bg-muted hover:bg-border px-3 py-2 rounded-lg text-sm font-medium transition-colors">Appliquer</button>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">{total.toLocaleString("fr-FR")} FCFA</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Paiement</p>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="radio" name="pay" checked={payment === "now"} onChange={() => setPayment("now")} className="accent-primary" />
              Payer maintenant (Mobile Money / Carte)
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="radio" name="pay" checked={payment === "delivery"} onChange={() => setPayment("delivery")} className="accent-primary" />
              Payer à la livraison
            </label>
          </div>

          <button onClick={() => { setConfirmed(true); clearCart(); }} className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
            Confirmer la commande
          </button>
        </div>
      </div>
    </div>
  );
}
