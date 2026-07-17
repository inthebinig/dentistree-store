// ---------------------------------------------------------------------------
// PRODUCT CATALOG
// ---------------------------------------------------------------------------
// A category only shows up as a shop tab once it has at least one product
// with `available: true` — so it's safe to leave the full category list
// below even before you've stocked every line.
//
// To add a product: copy an existing entry, give it a unique `id`, a
// `category` from CATEGORIES, a `price` (in dollars, e.g. 24.00), and set
// `available: true`. Add `image: "/products/your-photo.jpg"` once you have
// a real photo — drop the file in /public/products/. Until then it shows a
// neutral placeholder so the grid still looks tidy.
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  "Endodontic Files",
  "Lubricants & Glides",
  "Alginates & Impression",
  "Alloys & Amalgam",
  "Articulating Paper & Film",
  "Cements",
  "Composites",
  "Orthodontics",
  "Polishing Strips",
  "Pumice",
  "Typodonts",
  "Other",
];

export const PRODUCTS = [
  {
    id: "f1",
    category: "Endodontic Files",
    name: "K-File Hand Set",
    size: "21mm · Sizes 08–40",
    price: 24.0,
    sku: "DT-KF-21",
    desc: "Stainless steel hand files for canal negotiation and shaping. Full assorted set.",
    image: null,
    available: true,
  },
  {
    id: "f2",
    category: "Endodontic Files",
    name: "NiTi Rotary File Kit",
    size: "6 files per pack",
    price: 145.0,
    sku: "DT-NT-06",
    desc: "Flexible nickel-titanium rotary files for consistent taper and reduced canal transportation.",
    image: null,
    available: true,
  },
  {
    id: "f3",
    category: "Endodontic Files",
    name: "ProTaper-Style File Set",
    size: "Sx–F5 · 25mm",
    price: 89.0,
    sku: "DT-PT-25",
    desc: "Progressive taper design for efficient shaping in fewer strokes.",
    image: null,
    available: true,
  },
  {
    id: "l1",
    category: "Lubricants & Glides",
    name: "EDTA Lubricating Gel",
    size: "5ml syringe",
    price: 12.5,
    sku: "DT-EDTA-05",
    desc: "Chelating gel that softens dentin and eases file passage through curved canals.",
    image: null,
    available: true,
  },
  {
    id: "l2",
    category: "Lubricants & Glides",
    name: "Chelating Lubricant Kit",
    size: "Box of 10 syringes",
    price: 18.0,
    sku: "DT-CL-10",
    desc: "Ready-to-use canal glide that reduces file-breakage risk during instrumentation.",
    image: null,
    available: true,
  },
];

export const money = (n) => `$${n.toFixed(2)}`;
