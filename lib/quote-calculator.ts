// Pricing configuration for materials and project types

export interface MaterialOption {
  id: string;
  name: string;
  description: string;
  baseRate: number; // $ per sq ft or linear ft
  image: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  complexityMultiplier: number;
}

export const materials: MaterialOption[] = [
  {
    id: "steel",
    name: "Staal",
    description: "Duurzaam industrieel staal",
    baseRate: 45,
    image: "/images/portfolio/metal-table.png",
  },
  {
    id: "walnut",
    name: "Notenhout",
    description: "Premium hardhout",
    baseRate: 65,
    image: "/images/portfolio/wood-shelf.png",
  },
  {
    id: "oak",
    name: "Eikenhout",
    description: "Klassiek hardhout",
    baseRate: 50,
    image: "/images/portfolio/wood-shelf.png",
  },
  {
    id: "mixed",
    name: "Staal + Hout",
    description: "Gecombineerde materialen",
    baseRate: 75,
    image: "/images/portfolio/metal-table.png",
  },
];

export const projectTypes: ProjectType[] = [
  {
    id: "table",
    name: "Tafel",
    description: "Eet-, koffie- of bijzettafels",
    complexityMultiplier: 1.0,
  },
  {
    id: "shelf",
    name: "Planken",
    description: "Wandgemonteerd of vrijstaand",
    complexityMultiplier: 0.8,
  },
  {
    id: "desk",
    name: "Bureau",
    description: "Werkbureaus en -stations",
    complexityMultiplier: 1.2,
  },
  {
    id: "custom",
    name: "Op Maat Stuk",
    description: "Unieke op maat vervaardiging",
    complexityMultiplier: 1.5,
  },
];

export interface QuoteData {
  projectType: string;
  material: string;
  length: number;
  width: number;
  quantity: number;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export function calculateQuote(data: QuoteData): number {
  const material = materials.find((m) => m.id === data.material);
  const projectType = projectTypes.find((p) => p.id === data.projectType);

  if (!material || !projectType) return 0;

  const sqFt = (data.length * data.width) / 144; // convert sq inches to sq ft
  const materialCost = sqFt * material.baseRate;
  const laborCost = materialCost * 0.6; // 60% of material cost
  const subtotal =
    (materialCost + laborCost) * projectType.complexityMultiplier;
  const total = subtotal * data.quantity;

  return Math.round(total);
}

export function getQuoteRange(basePrice: number): { min: number; max: number } {
  return {
    min: Math.round(basePrice * 0.85),
    max: Math.round(basePrice * 1.15),
  };
}
