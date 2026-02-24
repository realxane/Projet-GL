export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
  score?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}

export interface Order {
  id: string;
  ref: string;
  items: CartItem[];
  total: string;
  status: "Reçue" | "En préparation" | "En livraison" | "Livrée";
  clientName: string;
  clientPhone: string;
  address: string;
  paymentMethod: string;
  montantAEncaisser?: string;
}

export interface Reservation {
  id: string;
  date: string;
  heure: string;
  personnes: number;
  nom: string;
  telephone: string;
  status: "En attente" | "Confirmée" | "Refusée";
  table?: string;
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Poulet Yassa",
    description: "Poulet mariné aux oignons caramélisés et citron, servi avec du riz blanc",
    price: 12000,
    priceLabel: "12 000 FCFA",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
    category: "Plats du jour",
    tags: ["Épicé"],
    available: true,
    score: 0.87,
  },
  {
    id: "2",
    name: "Pizza Teliman",
    description: "Pizza maison garnie de poulet grillé, poivrons et fromage fondant",
    price: 18000,
    priceLabel: "18 000 FCFA",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    category: "Pizzas",
    tags: ["Popularité"],
    available: true,
  },
  {
    id: "3",
    name: "Riz au gras",
    description: "Riz parfumé cuit dans un bouillon épicé avec légumes et viande",
    price: 10000,
    priceLabel: "10 000 FCFA",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    category: "Plats du jour",
    tags: [],
    available: true,
  },
  {
    id: "4",
    name: "Brochette mixte",
    description: "Brochettes de bœuf et poulet grillées au feu de bois, sauce piquante",
    price: 8000,
    priceLabel: "8 000 FCFA",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    category: "Grillades",
    tags: [],
    available: true,
  },
  {
    id: "5",
    name: "Jus de bissap",
    description: "Boisson rafraîchissante à base de fleurs d'hibiscus, sucrée à souhait",
    price: 2500,
    priceLabel: "2 500 FCFA",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    category: "Boissons",
    tags: [],
    available: true,
  },
  {
    id: "6",
    name: "Salade avocat",
    description: "Salade fraîche d'avocat, tomates cerises, oignons rouges et vinaigrette",
    price: 6000,
    priceLabel: "6 000 FCFA",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    category: "Entrées",
    tags: ["Végétarien"],
    available: true,
  },
];

export const sampleOrders: Order[] = [
  {
    id: "1",
    ref: "CT-2026-001",
    items: [],
    total: "22 000 FCFA",
    status: "En livraison",
    clientName: "Alassane Sow",
    clientPhone: "+223 72 56 75 55",
    address: "Badalabougou, Rue 24, Porte 112",
    paymentMethod: "Payer à la livraison",
    montantAEncaisser: "22 000 FCFA",
  },
  {
    id: "2",
    ref: "CT-2026-002",
    items: [],
    total: "18 000 FCFA",
    status: "Reçue",
    clientName: "Fatoumata Diallo",
    clientPhone: "+223 66 12 34 56",
    address: "Hamdallaye ACI 2000, Immeuble B",
    paymentMethod: "Mobile Money",
  },
  {
    id: "3",
    ref: "CT-2026-003",
    items: [],
    total: "30 000 FCFA",
    status: "En préparation",
    clientName: "Moussa Traoré",
    clientPhone: "+223 76 88 99 00",
    address: "Magnambougou, Rue 412",
    paymentMethod: "Payer à la livraison",
    montantAEncaisser: "30 000 FCFA",
  },
];

export const sampleReservations: Reservation[] = [
  {
    id: "1",
    date: "2026-02-16",
    heure: "19:30",
    personnes: 4,
    nom: "Alassane Sow",
    telephone: "+223 72 56 75 55",
    status: "En attente",
  },
  {
    id: "2",
    date: "2026-02-16",
    heure: "20:00",
    personnes: 2,
    nom: "Aminata Coulibaly",
    telephone: "+223 65 43 21 00",
    status: "Confirmée",
    table: "Table n°5",
  },
];

export const categories = ["Tous", "Plats du jour", "Pizzas", "Grillades", "Entrées", "Boissons"];
