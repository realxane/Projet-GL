import { useState } from "react";
import { sampleOrders, sampleReservations, sampleProducts } from "@/lib/data";
import { ShoppingCart, Calendar, TrendingUp, Eye, UserCheck, Check, X, Edit, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";

type Tab = "commandes" | "reservations" | "menu";

export default function GerantPage() {
  const [tab, setTab] = useState<Tab>("commandes");

  const stats = [
    { label: "Commandes du jour", value: "12", icon: ShoppingCart, color: "text-primary" },
    { label: "Réservations", value: "5", icon: Calendar, color: "text-accent" },
    { label: "Chiffre d'affaires", value: "186 000 FCFA", icon: TrendingUp, color: "text-success" },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "commandes", label: "Commandes" },
    { key: "reservations", label: "Réservations" },
    { key: "menu", label: "Menu" },
  ];

  return (
    <div className="container py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6">Tableau de bord — Gérant</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl p-5 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <s.icon className={`w-5 h-5 ${s.color}`} />
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "commandes" && (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Réf.</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Client</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Total</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium text-foreground">{o.ref}</td>
                    <td className="p-3 text-muted-foreground">{o.clientName}</td>
                    <td className="p-3 text-foreground font-medium">{o.total}</td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        o.status === "Livrée" ? "bg-success/10 text-success" :
                        o.status === "En livraison" ? "bg-primary/10 text-primary" :
                        o.status === "En préparation" ? "bg-accent/20 text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>{o.status}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Voir"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Affecter livreur"><UserCheck className="w-4 h-4 text-primary" /></button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Marquer comme prêt"><Check className="w-4 h-4 text-success" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "reservations" && (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Nom</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Heure</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Pers.</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleReservations.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium text-foreground">{r.nom}</td>
                    <td className="p-3 text-muted-foreground">{r.date}</td>
                    <td className="p-3 text-muted-foreground">{r.heure}</td>
                    <td className="p-3 text-muted-foreground">{r.personnes}</td>
                    <td className="p-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        r.status === "Confirmée" ? "bg-success/10 text-success" :
                        r.status === "Refusée" ? "bg-destructive/10 text-destructive" :
                        "bg-accent/20 text-accent-foreground"
                      }`}>{r.status}{r.table ? ` — ${r.table}` : ""}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Confirmer"><Check className="w-4 h-4 text-success" /></button>
                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Refuser"><X className="w-4 h-4 text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "menu" && (
        <div className="space-y-4">
          <button className="bg-gradient-primary text-primary-foreground font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Ajouter un produit
          </button>
          <div className="bg-card rounded-xl shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Produit</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Prix</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Catégorie</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Disponible</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProducts.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        {p.name}
                      </td>
                      <td className="p-3 text-muted-foreground">{p.priceLabel}</td>
                      <td className="p-3 text-muted-foreground">{p.category}</td>
                      <td className="p-3">
                        <button className="text-success">
                          {p.available ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Modifier"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                          <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Supprimer"><Trash2 className="w-4 h-4 text-destructive" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
