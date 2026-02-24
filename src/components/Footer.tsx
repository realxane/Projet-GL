import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="px-4 sm:px-6 lg:px-8 w-full py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span className="bg-gradient-primary text-primary-foreground w-7 h-7 rounded-md flex items-center justify-center text-xs font-extrabold">DT</span>
          Doumini Teliman
        </div>
        <nav className="flex gap-6">
          <Link to="#" className="hover:text-foreground transition-colors">À propos</Link>
          <Link to="#" className="hover:text-foreground transition-colors">Contact</Link>
          <Link to="#" className="hover:text-foreground transition-colors">CGU</Link>
        </nav>
        <p>© 2026 Doumini Teliman. Tous droits réservés.</p>
      </div>
    </footer>
  );
}