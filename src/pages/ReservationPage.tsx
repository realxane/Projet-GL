import { useState } from "react";
import { Calendar, Clock, Users, User, Phone, CheckCircle } from "lucide-react";

export default function ReservationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ date: "", heure: "", personnes: "2", nom: "", telephone: "" });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (submitted) {
    return (
      <div className="container py-20 text-center animate-slide-up">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Réservation envoyée</h1>
        <p className="text-muted-foreground">En attente de confirmation</p>
      </div>
    );
  }

  return (
    <div className="container py-6 max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Réserver une table</h1>
      <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Date</label>
          <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Heure</label>
          <input type="time" value={form.heure} onChange={(e) => update("heure", e.target.value)} className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Nombre de personnes</label>
          <select value={form.personnes} onChange={(e) => update("personnes", e.target.value)} className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Nom</label>
          <input type="text" value={form.nom} onChange={(e) => update("nom", e.target.value)} placeholder="Votre nom" className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Téléphone</label>
          <input type="tel" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} placeholder="Entrez votre numéro de téléphone" className="w-full bg-muted rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button onClick={() => setSubmitted(true)} className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mt-2">
          Demander une réservation
        </button>
      </div>
    </div>
  );
}
