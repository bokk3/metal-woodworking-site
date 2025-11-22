import { Hammer, Trees, Zap, PencilRuler } from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
  icon: any; // Lucide icon component type
}

export const services: ServiceItem[] = [
  {
    title: "Op Maat Metaalwerk",
    description:
      "Op maat gemaakte metaalbewerking inclusief poorten, leuningen en structurele elementen ontworpen volgens uw specificaties.",
    icon: Hammer,
  },
  {
    title: "Fijn Houtwerk",
    description:
      "Handgemaakte meubels en kasten met premium hardhout met aandacht voor nerf en detail.",
    icon: Trees,
  },
  {
    title: "Lassen & Vervaardiging",
    description:
      "Precisie TIG- en MIG-lassen voor staal-, aluminium- en roestvrijstalen projecten.",
    icon: Zap,
  },
  {
    title: "Ontwerpadvies",
    description:
      "Collaboratief ontwerpproces om uw visie tot leven te brengen met 3D-modellering en materiaalkeuze.",
    icon: PencilRuler,
  },
];
