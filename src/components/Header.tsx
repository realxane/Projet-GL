import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Bell, Search, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/menu", label: "Menu" },
    { to: "/reservation", label: "Réservation" },
    { to: "/suivi", label: "Suivi" },
    { to: "/livreur", label: "Livreur" },
    { to: "/gerant", label: "Gérant" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-primary text-primary-foreground w-9 h-9 rounded-lg flex items-center justify-center text-sm font-extrabold">DT</span>
          <span className="hidden sm:inline text-foreground">Doumini <span className="text-gradient-brand">Teliman</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search (desktop) */}
        <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2 gap-2 w-64">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un plat ou une catégorie"
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative" aria-label="Notifications">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
          <Link to="/panier" className="p-2 rounded-lg hover:bg-muted transition-colors relative" aria-label="Panier">
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Compte">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t bg-card p-4 animate-fade-in">
          <div className="flex items-center bg-muted rounded-lg px-3 py-2 gap-2 mb-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Rechercher..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}