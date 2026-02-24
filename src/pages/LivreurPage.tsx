import { useState } from "react";
import { MapPin, Phone, Camera, Check, ToggleLeft, ToggleRight, Truck, DollarSign } from "lucide-react";
import { sampleOrders } from "@/lib/data";

export default function LivreurPage() {
  const [available, setAvailable] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const getStatus = (id: string) => statuses[id] || "pending";
  const setStatus = (id: string, s: string) => setStatuses((p) => ({ ...p, [id]: s }));

  const deliveries = sampleOrders.filter((o) => o.status === "En livraison" || o.status === "Reçue" || o.status === "En préparation");

  return (
    <div className="container py-6 max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Espace Livreur</h1>
          <p className="text-sm text-muted-foreground">Gérez vos livraisons</p>
        </div>
        <button
          onClick={() => setAvailable(!available)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors ${
            available ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {available ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          {available ? "Disponible" : "Indisponible"}
        </button>
      </div>

      {!available && (
        <div className="bg-muted rounded-xl p-8 text-center text-muted-foreground">
          Vous êtes actuellement indisponible. Activez votre disponibilité pour recevoir des livraisons.
        </div>
      )}

      {available && (
        <div className="space-y-4">
          {deliveries.map((order) => (
            <div key={order.id} className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-foreground">Commande {order.ref}</p>
                    <p className="text-sm text-muted-foreground">{order.clientName}</p>
                  </div>
                  <span className="bg-accent/20 text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">{order.status}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <MapPin className="w-3.5 h-3.5" /> {order.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Phone className="w-3.5 h-3.5" /> {order.clientPhone}
                </div>
                {order.montantAEncaisser && (
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground mt-2">
                    <DollarSign className="w-3.5 h-3.5 text-accent" /> Montant à encaisser : {order.montantAEncaisser}
                  </div>
                )}
              </div>

              {selectedOrder === order.id ? (
                <div className="border-t p-4 space-y-3 bg-muted/50 animate-fade-in">
                  {getStatus(order.id) === "pending" && (
                    <button onClick={() => setStatus(order.id, "en-route")} className="w-full bg-gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Truck className="w-4 h-4" /> En route
                    </button>
                  )}
                  {getStatus(order.id) === "en-route" && (
                    <button onClick={() => setStatus(order.id, "delivered")} className="w-full bg-success text-success-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" /> Livré (prendre une photo)
                    </button>
                  )}
                  {getStatus(order.id) === "delivered" && (
                    <div className="space-y-3">
                      <button className="w-full bg-muted text-foreground font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-border transition-colors">
                        <Camera className="w-4 h-4" /> Prendre une photo de la preuve
                      </button>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Montant encaissé</label>
                        <input placeholder="Entrer le montant" className="w-full bg-muted rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                      <p className="text-sm text-success font-semibold text-center">✓ Livraison marquée comme livrée</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-t p-4">
                  <button
                    onClick={() => setSelectedOrder(order.id)}
                    className="w-full bg-gradient-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Prendre en charge
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
