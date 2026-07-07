import { MenuItem } from "./types";

// PLACEHOLDER PRICES — update with real prices before launch.
export const MENU: MenuItem[] = [
  {
    id: "taco-carne-asada",
    name: "Taco de Carne Asada",
    description: "Grilled steak taco with onion, cilantro, and salsa.",
    price: 3.5,
    category: "Tacos",
  },
  {
    id: "taco-birria",
    name: "Taco de Birria",
    description: "Slow-braised birria taco served with consomé for dipping.",
    price: 4.0,
    category: "Tacos",
  },
  {
    id: "quesabirria",
    name: "Quesabirria",
    description: "Cheese-stuffed birria taco, griddled crisp, consomé included.",
    price: 4.5,
    category: "Tacos",
  },
  {
    id: "tostada-ceviche",
    name: "Tostada de Ceviche",
    description: "Fresh shrimp ceviche piled on a crispy tostada.",
    price: 9.0,
    category: "Tostadas",
  },
  {
    id: "tostada-camaron",
    name: "Tostada de Camarón",
    description: "Shrimp tostada with pico de gallo and avocado.",
    price: 9.5,
    category: "Tostadas",
  },
  {
    id: "coctel-camaron",
    name: "Cóctel de Camarón",
    description: "Classic Mexican shrimp cocktail, served chilled.",
    price: 13.0,
    category: "Cocteles",
  },
  {
    id: "campechana",
    name: "Campechana",
    description: "Mixed seafood cocktail — shrimp, octopus, and more.",
    price: 15.0,
    category: "Cocteles",
  },
  {
    id: "ceviche-camaron",
    name: "Ceviche de Camarón (por libra)",
    description: "Fresh shrimp ceviche, made to order, sold by the pound.",
    price: 18.0,
    category: "Ceviche",
  },
];

export const CATEGORY_ORDER: MenuItem["category"][] = [
  "Tacos",
  "Tostadas",
  "Cocteles",
  "Ceviche",
  "Otros",
];
