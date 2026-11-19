// Catalogue content shared by the listing, detail routes and sitemap.
// Originals live in /products images/. Framed display copies with consistent
// margins live in /product-display/ under the same file name; regenerate them
// with scripts/frame-product-photos.swift after adding or replacing a photo.
const BASE = "/products images/";
const DISPLAY = "/product-display/";
export const CATEGORIES = ["All", "Executive", "Task", "Visitor", "Sofa", "Training"];
export const SPEC_FIELDS = ["Dimensions", "Materials", "Adjustments", "Finishes", "Warranty"] as const;
// Session key the catalogue writes when a product is opened, so the detail
// page can link back to the same filter and tile.
export const CATALOGUE_RETURN_KEY = "nws:catalogue-return";

// Only add extraPhotos (up to two more originals) and specs once verified.
const CHAIRS: {
  name: string;
  sub: string;
  cat: string;
  img: string;
  extraPhotos?: string[];
  specs?: Partial<Record<(typeof SPEC_FIELDS)[number], string>>;
}[] = [
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

const DUPLICATE_NAMES = new Set(
  CHAIRS.map((chair) => chair.name).filter((name, i, all) => all.indexOf(name) !== i),
);

export const PRODUCTS = CHAIRS.map((chair) => {
  const duplicate = DUPLICATE_NAMES.has(chair.name);
  const style = chair.sub.toLowerCase();
  return {
    ...chair,
    slug: `${chair.name}${chair.cat === "Training" ? ` ${chair.sub}` : ""}`
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    // Models sharing a name are told apart by their catalogue style.
    title: duplicate ? `${chair.name} (${chair.sub})` : chair.name,
    // Catalogue style is the only verified attribute; show it when it adds
    // more than the category or a generic noun.
    highlight: !duplicate && style !== "chair" && !style.includes(chair.cat.toLowerCase()) ? chair.sub : null,
    display: displayPhoto(chair.img),
    images: [chair.img, ...(chair.extraPhotos ?? [])].slice(0, 3).map((src, i) => ({
      src,
      display: displayPhoto(src),
      alt: `${chair.name} — ${chair.sub}${i ? `, photo ${i + 1}` : ""}`,
      label: i ? `photo ${i + 1}` : "main photo",
    })),
    specs: chair.specs ?? {},
    description: `${chair.name} is part of the NWS ${chair.cat.toLowerCase()} seating collection. Explore the product photo and catalogue details, then contact our Chennai team to confirm specifications, pricing and availability.`,
  };
});

export function displayPhoto(src: string) {
  return src.replace(BASE, DISPLAY);
}

export function categoryName(cat: string) {
  return cat === "Sofa" ? "Lounge & sofas" : cat;
}

export function categoryTitle(cat: string) {
  return cat === "All" ? "All seating" : cat === "Sofa" ? "Lounge & sofas" : `${cat} chairs`;
}

export function resolveCategory(param: string | null): string {
  if (!param) return "All";
  const normalized = param.trim().toLowerCase();
  return CATEGORIES.find((cat) => cat.toLowerCase() === normalized || normalized.startsWith(cat.toLowerCase())) || "All";
}
