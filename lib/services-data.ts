import { Hammer, Trees, Zap, PencilRuler } from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
  icon: any; // Lucide icon component type
}

export const services: ServiceItem[] = [
  {
    title: "Custom Metalwork",
    description:
      "Bespoke metal fabrication including gates, railings, and structural elements designed to your specifications.",
    icon: Hammer,
  },
  {
    title: "Fine Woodworking",
    description:
      "Handcrafted furniture and cabinetry using premium hardwoods with attention to grain and detail.",
    icon: Trees,
  },
  {
    title: "Welding & Fabrication",
    description:
      "Precision TIG and MIG welding for steel, aluminum, and stainless steel projects.",
    icon: Zap,
  },
  {
    title: "Design Consultation",
    description:
      "Collaborative design process to bring your vision to life with 3D modeling and material selection.",
    icon: PencilRuler,
  },
];
