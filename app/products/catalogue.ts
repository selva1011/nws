// Catalogue content shared by the listing, detail routes and sitemap.
// Add verified alternate photos to each product's images array (maximum three).
const BASE = "/products images/";
export const CATEGORIES = ["All", "Executive", "Task", "Visitor", "Sofa", "Training"];

const CHAIRS = [
  {
    name: "8024-D Visitor",
    sub: "Visitor",
    cat: "Visitor",
    img: BASE + "8024-D Visitor.jpeg",
  },
  {
    name: "803 NETTED MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "803-NETTED-MB.jpeg",
  },
  {
    name: "804 VC",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "804-VC.JPEG",
  },
  {
    name: "805 MESH",
    sub: "Mesh Chair",
    cat: "Task",
    img: BASE + "805-MESH.JPEG",
  },
  {
    name: "805 NETTED MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "805-NETTED-MB.jpeg",
  },
  {
    name: "Accord MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "Accord MB.jpeg",
  },
  {
    name: "BUTTERFLY HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "BUTTERFLY-HB.jpeg",
  },
  {
    name: "BUTTERFLY MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "BUTTERFLY-MB.jpeg",
  },
  {
    name: "ECCO MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "ECCO-MB.jpeg",
  },
  {
    name: "EV-05 Visitor",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "EV-05 Visitor.jpeg",
  },
  {
    name: "FLASH MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "FLASH-MB.jpeg",
  },
  {
    name: "Flip Training Chair",
    sub: "With Pad",
    cat: "Training",
    img: BASE + "FLIPTRAININGCHAIR-WITHPADWITHOUTWHEEL-SIDE.JPEG",
  },
  {
    name: "Flip Training Chair",
    sub: "Without Pad",
    cat: "Training",
    img: BASE + "FLIP_TRAINING_CHAIR_-_WITH_OUT_WHEEL_WITHOUT_PAD_-_SIDE.JPEG",
  },
  {
    name: "GILMA VC",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "GILMA-VC-SIDE.JPEG",
  },
  {
    name: "HILITE HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "HILITE-HB.jpeg",
  },
  {
    name: "HILITE MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "HILITE-MB.jpeg",
  },
  {
    name: "J-118-2",
    sub: "Chair",
    cat: "Task",
    img: BASE + "J-118-2.JPEG",
  },
  {
    name: "JAZZ HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "JAZZ-HB.jpeg",
  },
  {
    name: "JAZZ MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "JAZZ-MB.jpeg",
  },
  {
    name: "KAABLE CHAIR",
    sub: "Chair",
    cat: "Task",
    img: BASE + "KAABLE-CHAIR.jpeg",
  },
  {
    name: "Kaable-Mesh Visitor",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "Kaable-Mesh Visitor.jpeg",
  },
  {
    name: "METRO SOFA",
    sub: "Sofa",
    cat: "Sofa",
    img: BASE + "METRO_SOFA.jpeg",
  },
  {
    name: "OSLO HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "OSLO-HB.jpeg",
  },
  {
    name: "OSLO MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "OSLO-MB.jpeg",
  },
  {
    name: "SOLITAIRE VC",
    sub: "Visitor Chair",
    cat: "Visitor",
    img: BASE + "SOLITAIRE-VC.jpeg",
  },
  {
    name: "SPENCER",
    sub: "Chair",
    cat: "Task",
    img: BASE + "SPENCER.jpeg",
  },
  {
    name: "VENTO HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "VENTO-HB.jpeg",
  },
  {
    name: "VENTO MB",
    sub: "Medium Back",
    cat: "Task",
    img: BASE + "VENTO-MB.jpeg",
  },
  {
    name: "VS 6009-1",
    sub: "Chair",
    cat: "Task",
    img: BASE + "VS 6009-1.JPEG",
  },
  {
    name: "Visitor 3 Seater Sky Sofa",
    sub: "Sofa",
    cat: "Sofa",
    img: BASE + "Visitor 3 Seater Sky Sofa.jpeg",
  },
  {
    name: "Visitor 3 Seater Sofa",
    sub: "Sofa",
    cat: "Sofa",
    img: BASE + "Visitor 3 Seater Sofa.jpg.jpeg",
  },
  {
    name: "ZOOM HB",
    sub: "High Back",
    cat: "Executive",
    img: BASE + "ZOOM-HB.jpeg",
  },
];

export const PRODUCTS = CHAIRS.map((chair) => ({
  ...chair,
  slug: `${chair.name}${chair.cat === "Training" ? ` ${chair.sub}` : ""}`
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  images: [{ src: chair.img, alt: `${chair.name} — ${chair.sub}`, label: "Product photo" }],
  description: `${chair.name} is part of the NWS ${chair.cat.toLowerCase()} seating collection. Explore the product photo and catalogue details, then contact our Chennai team to confirm specifications, pricing and availability.`,
}));

export function resolveCategory(param: string | null): string {
  if (!param) return "All";
  const normalized = param.trim().toLowerCase();
  return CATEGORIES.find((cat) => cat.toLowerCase() === normalized || normalized.startsWith(cat.toLowerCase())) || "All";
}
