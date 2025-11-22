export type Category = "all" | "metal" | "wood" | "combined";

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  specs?: string;
  materials?: string;
  year?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "The Monolith Coffee Table",
    category: "metal",
    image: "/images/portfolio/metal-table.png",
    description:
      "A statement piece forged from solid steel with a matte black powder coat finish. Geometric lines meet industrial durability.",
    specs: '48" x 24" x 16"',
    materials: "Solid Steel, Powder Coat",
    year: "2024",
  },
  {
    id: "2",
    title: "Walnut Executive Desk",
    category: "wood",
    image: "/images/portfolio/wood-desk.png",
    description:
      "Hand-selected live edge walnut slab atop minimalist steel legs. Designed for the modern executive who values organic warmth.",
    specs: '72" x 30" x 30"',
    materials: "Black Walnut, Brushed Steel",
    year: "2023",
  },
  {
    id: "3",
    title: "Industrial Library Shelving",
    category: "combined",
    image: "/images/portfolio/shelf.png",
    description:
      "Floor-to-ceiling shelving unit combining blackened steel piping with reclaimed oak planks. Perfect for displaying curated collections.",
    specs: '96" x 12" x 108"',
    materials: "Blackened Steel Pipe, Reclaimed Oak",
    year: "2024",
  },
  {
    id: "4",
    title: "Cantilever Bedside Table",
    category: "metal",
    image: "/images/portfolio/metal-table.png", // Reusing for demo, ideally unique
    description:
      "Gravity-defying design featuring a single bent steel sheet. Minimalist, functional, and strikingly modern.",
    specs: '18" x 18" x 24"',
    materials: "Bent Steel",
    year: "2023",
  },
  {
    id: "5",
    title: "Oak Dining Table",
    category: "wood",
    image: "/images/portfolio/wood-desk.png", // Reusing for demo
    description:
      "A gathering place for generations. Solid oak top with traditional joinery and a durable oil finish.",
    specs: '96" x 40" x 30"',
    materials: "White Oak",
    year: "2024",
  },
  {
    id: "6",
    title: "Media Console",
    category: "combined",
    image: "/images/portfolio/shelf.png", // Reusing for demo
    description:
      "Sleek storage solution with perforated metal doors and a walnut casing. Hides cables while displaying style.",
    specs: '72" x 18" x 24"',
    materials: "Perforated Steel, Walnut",
    year: "2024",
  },
];
