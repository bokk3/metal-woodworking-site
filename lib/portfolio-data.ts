export type Category = "all" | "metal" | "wood" | "combined";

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Industrial Steel Table",
    category: "metal",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop",
    description: "Custom welded steel dining table with industrial finish.",
  },
  {
    id: "2",
    title: "Walnut Live Edge Desk",
    category: "wood",
    image:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
    description: "Handcrafted walnut desk with natural live edge details.",
  },
  {
    id: "3",
    title: "Steel & Oak Shelving",
    category: "combined",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    description:
      "Floor-to-ceiling shelving unit mixing blackened steel and white oak.",
  },
  {
    id: "4",
    title: "Modern Metal Railing",
    category: "metal",
    image:
      "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1000&auto=format&fit=crop",
    description: "Sleek horizontal bar railing for a contemporary staircase.",
  },
  {
    id: "5",
    title: "Reclaimed Wood Coffee Table",
    category: "wood",
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1000&auto=format&fit=crop",
    description: "Rustic coffee table built from 100-year-old barn wood.",
  },
  {
    id: "6",
    title: "Floating Staircase",
    category: "combined",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop",
    description:
      "Architectural floating stairs with steel stringer and wood treads.",
  },
  {
    id: "7",
    title: "Custom Steel Gates",
    category: "metal",
    image:
      "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?q=80&w=1000&auto=format&fit=crop",
    description: "Ornamental driveway gates with automated entry system.",
  },
  {
    id: "8",
    title: "Mahogany Conference Table",
    category: "wood",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop",
    description: "12-foot solid mahogany table for a corporate boardroom.",
  },
  {
    id: "9",
    title: "Industrial Bar Stools",
    category: "combined",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1000&auto=format&fit=crop",
    description: "Adjustable height stools with leather seats and metal bases.",
  },
];
