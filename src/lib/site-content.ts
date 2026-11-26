export const features = [
  {
    title: "Skin & lung safe",
    text: "No harsh fumes, chlorine or formaldehyde. Gentle enough for homes with kids and pets.",
  },
  {
    title: "Plant-based formulas",
    text: "Coconut-derived cleaners and essential oils replace petrochemical surfactants.",
  },
  {
    title: "Refillable packaging",
    text: "Bottles are made from recycled plastic and refill pouches cut packaging waste by 80%.",
  },
  {
    title: "Never tested on animals",
    text: "Every formula is cruelty-free and verified by independent third parties.",
  },
  {
    title: "Natural fragrance only",
    text: "Scents come from steam-distilled flowers, herbs and citrus peel, never synthetic perfume.",
  },
  {
    title: "Fair pricing",
    text: "We work directly with organic growers, so you get premium formulas without the markup.",
  },
] as const;

export const ingredientBullets = [
  "Lemon peel and apple cider vinegar for streak-free glass and steel",
  "Tea tree oil with powerful natural antibacterial action",
  "Lavender oil to keep housework calm and pleasant",
];

export const certificates = [
  { name: "Vegan", note: "Certified plant-based" },
  { name: "Cruelty Free", note: "Never tested on animals" },
  { name: "Biodegradable", note: "OECD 301 tested" },
  { name: "ISO 14001", note: "Environmental management" },
  { name: "Recycled PET", note: "100% recycled bottles" },
] as const;

export const faqs = [
  {
    q: "Are your cleaners safe around children and pets?",
    a: "Yes. Every formula is free of chlorine, ammonia and synthetic fragrance, and is dermatologically tested. As with any cleaner, store it out of reach and rinse food-contact surfaces.",
  },
  {
    q: "Do plant-based cleaners really cut grease?",
    a: "Yes. Our coconut-derived surfactants and citrus extracts dissolve heavy grease, even in cold water, without harsh solvents.",
  },
  {
    q: "How do refills work?",
    a: "Order a refill pouch, pour it into your existing bottle and recycle the pouch. It uses roughly 80% less plastic than a new bottle.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders ship within 24 hours. Standard delivery takes 3-5 business days and is free over $40.",
  },
] as const;

export const footerLinks = {
  services: ["Help center", "Shipping & payment", "Returns policy", "FAQ"],
  company: ["About us", "Contact us", "Our farms", "Sustainability report"],
} as const;
