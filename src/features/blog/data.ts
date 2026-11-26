import { images } from "@/lib/assets";

export type BlogPost = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  category: string;
};

const blogImages = [images.blog1, images.blog2, images.blog3];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    date: "2026-11-22",
    title: "How to disinfect your home without harsh chemicals",
    excerpt:
      "Wiping surfaces with plant essences and simple pantry staples can noticeably improve the air quality inside your home...",
    content: [
      "Many popular disinfectants contain chlorine, ammonia and volatile compounds that, over time, irritate the respiratory system. The good news is that a few natural ingredients can deliver the same level of clean without the side effects.",
      "White vinegar and lemon juice are acidic enough to kill many bacteria and some moulds. Adding a few drops of tea tree oil multiplies the antibacterial effect and leaves a gentle, fresh scent.",
      "For high-touch surfaces like door handles and light switches, a simple spray of water, vinegar and tea tree oil can be used daily with no chemical fumes lingering in your air.",
    ],
    image: blogImages[0],
    author: "Leafwash Team",
    category: "Natural Cleaning",
  },
  {
    id: "b2",
    date: "2026-11-15",
    title: "The secret to washing baby clothes without skin reactions",
    excerpt:
      "A child's skin is extremely sensitive. Here are the detergent ingredients to avoid and what to look for instead...",
    content: [
      "Infant and toddler skin is thinner and more permeable than adult skin, so detergent residue left on fabric can easily trigger irritation.",
      "Sulfates, synthetic dyes and strong fragrances are the most common culprits. Choosing a plant-based formula free of these is the first step to prevention.",
      "After washing, an extra rinse cycle helps remove every trace of detergent. It is a simple tip many parents overlook.",
    ],
    image: blogImages[1],
    author: "Leafwash Team",
    category: "Family Care",
  },
  {
    id: "b3",
    date: "2026-11-08",
    title: "10 creative ways to clean your kitchen with white vinegar",
    excerpt:
      "White vinegar is one of the strongest natural grease cutters. Make your kitchen sparkle like day one with these tricks...",
    content: [
      "Thanks to its acidity, white vinegar is one of the cheapest and most accessible natural cleaners for the kitchen and often replaces heavy chemical products.",
      "To shine taps and a stainless steel sink, dilute vinegar with a little water, spray the surface, wait a few minutes and wipe with a soft cloth until water spots vanish.",
      "Run a rinse cycle with diluted vinegar through the microwave bowl and dishwasher to lift built-up grease and stale smells without strong chemicals.",
    ],
    image: blogImages[2],
    author: "Leafwash Team",
    category: "Kitchen Tips",
  },
  {
    id: "b4",
    date: "2026-11-01",
    title: "Why you should choose phosphate-free detergents",
    excerpt:
      "Phosphates from some detergents cause runaway algae growth once they reach surface water. Here is why phosphate-free matters...",
    content: [
      "Phosphates once helped soften city water, but when wastewater reaches rivers and lakes the same compound triggers explosive algae growth and drains oxygen from the water.",
      "This process, called eutrophication, directly harms aquatic life and upsets the whole ecosystem, which is why many countries restrict phosphates in household detergents.",
      "Plant-based, phosphate-free detergents keep the same cleaning power without the environmental cost.",
    ],
    image: blogImages[0],
    author: "Leafwash Team",
    category: "Environment",
  },
  {
    id: "b5",
    date: "2026-10-25",
    title: "Biodegradable packaging: why our choice is different",
    excerpt:
      "Many plastic bottles stay in nature for hundreds of years. Biodegradable packaging can break that cycle...",
    content: [
      "Ordinary plastics can take several hundred years to break down and gradually turn into microplastics that enter the food chain.",
      "Biodegradable and recycled packaging decomposes in a much shorter time and leaves a smaller environmental footprint.",
      "Choosing products in green packaging is a small but effective step for every household cutting plastic waste.",
    ],
    image: blogImages[1],
    author: "Leafwash Team",
    category: "Environment",
  },
  {
    id: "b6",
    date: "2026-10-18",
    title: "Streak-free windows: grandma's golden tricks",
    excerpt:
      "Stubborn streaks usually come from using the wrong cleaning technique. Try these simple tricks...",
    content: [
      "Paper towels and linty cloths are usually what leave streaks on glass; crumpled newspaper or a microfibre cloth is a better choice.",
      "A solution of water, vinegar and a few drops of plant-based dish soap lifts grease and dust from glass beautifully.",
      "Clean windows on cloudy days or in the shade so the solution does not dry too quickly and leave marks.",
    ],
    image: blogImages[2],
    author: "Leafwash Team",
    category: "Kitchen Tips",
  },
  {
    id: "b7",
    date: "2026-10-11",
    title: "How to remove shoe and wardrobe odours naturally",
    excerpt:
      "Chemical air fresheners usually mask smells rather than remove them. Learn natural ways to truly neutralise odours...",
    content: [
      "Baking soda is one of the best natural absorbers of moisture and odour; a small pouch inside a shoe or wardrobe reduces bad smells within hours.",
      "A few drops of lavender or tea tree oil on the pouch add a gentle, lasting fragrance on top of the moisture absorption.",
      "Airing the wardrobe regularly and drying shoes fully before storing them also prevents the smell from coming back.",
    ],
    image: blogImages[0],
    author: "Leafwash Team",
    category: "Kitchen Tips",
  },
  {
    id: "b8",
    date: "2026-10-04",
    title: "Are plant-based detergents as powerful as chemical ones?",
    excerpt:
      "One of the most common doubts about organic products is cleaning power. Here is a science-based look...",
    content: [
      "A detergent's cleaning power depends on the surfactants it uses, not on whether they are plant-derived or synthetic.",
      "Modern plant-based surfactants, especially in newer formulas, remove grease and dirt as effectively as conventional detergents.",
      "The main difference is the aftermath: plant-based detergents usually biodegrade faster and leave a smaller toxic load.",
    ],
    image: blogImages[1],
    author: "Leafwash Team",
    category: "Natural Cleaning",
  },
  {
    id: "b9",
    date: "2026-09-27",
    title: "A guide to choosing dish soap for sensitive skin",
    excerpt:
      "If your hands feel dry or irritated after washing up, it may be time to change your dish soap...",
    content: [
      "Many standard dish soaps rely on strong, sulfate-based surfactants that strip the natural oils from your hands.",
      "Plant-based dish soaps with a gentler base clean grease effectively while preserving skin moisture, making them better for daily use.",
      "Wearing gloves during long washing sessions is still recommended, even with mild detergents, especially for very sensitive skin.",
    ],
    image: blogImages[2],
    author: "Leafwash Team",
    category: "Family Care",
  },
  {
    id: "b10",
    date: "2026-09-20",
    title: "5 common laundry mistakes that damage your clothes",
    excerpt:
      "Using the wrong amount of detergent or the wrong temperature can shorten the life of your clothes dramatically...",
    content: [
      "Using too much detergent leaves foam and chemical residue on the fibres, slowly damaging the colour and texture of your clothes.",
      "Washing delicate fabrics in hot water at a high spin speed weakens the fibres and shortens the life of the garment.",
      "Overloading the washing machine prevents a full rinse, leaving clothes smelling off or not properly clean.",
    ],
    image: blogImages[0],
    author: "Leafwash Team",
    category: "Family Care",
  },
  {
    id: "b11",
    date: "2026-09-13",
    title: "Why green housekeeping is good for the family budget too",
    excerpt:
      "Natural, refillable products look pricier at first glance, but over time they reduce a household's costs...",
    content: [
      "Concentrated natural detergents are usually diluted more, meaning one bottle lasts longer than thinner alternatives.",
      "Gentler ingredients mean less damage to fabrics, dishes and surfaces, which lowers replacement and repair costs over time.",
      "Investing in recyclable packaging and refillable containers also removes the recurring cost of buying new packaging.",
    ],
    image: blogImages[1],
    author: "Leafwash Team",
    category: "Lifestyle",
  },
];
