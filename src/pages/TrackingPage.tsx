import { MapPin, Phone, FileText, Clock } from "lucide-react";

const steps = ["Reçue", "En préparation", "En livraison", "Livrée"] as const;
const currentStep = 2; // "En livraison"

export default function TrackingPage() {
  return (
    <div className="container py-6 max-w-lg mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-2">Suivi de commande</h1>
      <p className="text-muted-foreground mb-6">Référence : <strong className="text-foreground">CT-2026-001</strong></p>

      {/* Status timeline */}
      <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
        <div className="flex items-center justify-between mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                i <= currentStep ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              <span className={`text-[11px] text-center font-medium ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && (
                <div className={`absolute h-0.5 w-full ${i < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-primary rounded-full transition-all" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      {/* ETA */}
      <div className="bg-card rounded-xl p-4 shadow-card mb-4 flex items-center gap-3">
        <Clock className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm font-medium text-foreground">Estimation : 25 min</p>
          <p className="text-xs text-muted-foreground">Votre livreur est en route</p>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-muted rounded-xl h-48 flex items-center justify-center mb-4">
        <div className="text-center">
          <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Aperçu carte — position du livreur</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Phone className="w-4 h-4" /> Contacter le livreur
        </button>
        <button className="flex-1 bg-muted text-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-border transition-colors">
          <FileText className="w-4 h-4" /> Voir le reçu
        </button>
      </div>
    </div>
  );
}
