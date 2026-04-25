export interface LocalizedText {
  ja: string;
  en: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedText;
  price: number;
  description: string;
  image: string;
  tags: string[];
}

export interface TicketMachineStep {
  step: number;
  en: string;
  ja: string;
}

export interface TicketMachineGuide {
  steps: TicketMachineStep[];
}

export interface RestaurantFeatures {
  ticketMachine: boolean;
  englishMenu: boolean;
  vegOptions: boolean;
  halalFriendly: boolean;
  wifi: boolean;
  creditCard: boolean;
  soloCounter: boolean;
  noPork: boolean;
  noAlcohol: boolean;
}

export interface Restaurant {
  id: string;
  name: LocalizedText;
  tagline: { en: string };
  description: LocalizedText;
  tags: string[];
  area: string;
  address: string;
  hours: string;
  closed: string;
  nearestStation: string;
  heroImage: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  features: RestaurantFeatures;
  languages: string[];
  menu: MenuItem[];
  ticketMachineGuide: TicketMachineGuide | null;
}
