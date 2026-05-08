// Centralized content for OLEA — Boutique Hotel & Restaurant
// All imagery sourced from Unsplash (CDN-served, no local hosting needed).

export const brand = {
  name: "OLEA",
  tagline: "A quiet luxury, slowly lived.",
  location: "Val d'Orcia · Tuscany",
  established: "Est. MMXII",
  short:
    "A nine-suite countryside retreat surrounded by olive groves, with a chef's table for thirty.",
};

export const rooms = [
  {
    id: "olive-suite",
    name: "Olive Suite",
    type: "Garden Suite",
    sleeps: 2,
    size: "48 m²",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    cover:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    short:
      "A serene ground-floor suite opening onto the olive grove, with a private soaking terrace.",
    features: [
      "Soaking terrace",
      "Hand-loomed linens",
      "Travertine bath",
      "Olive grove view",
    ],
  },
  {
    id: "fienile",
    name: "Il Fienile",
    type: "Loft Suite",
    sleeps: 2,
    size: "62 m²",
    price: 620,
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
    cover:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    short:
      "A restored hayloft beneath chestnut beams, anchored by a sculptural copper tub.",
    features: [
      "Chestnut beams",
      "Copper soaking tub",
      "Reading nook",
      "Cypress view",
    ],
  },
  {
    id: "villa-alba",
    name: "Villa Alba",
    type: "Villa",
    sleeps: 4,
    size: "120 m²",
    price: 1180,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    cover:
      "https://images.unsplash.com/photo-1551776235-dde6d482980b?auto=format&fit=crop&w=1600&q=80",
    short:
      "Our flagship two-bedroom villa with a private vine-shaded loggia and plunge pool.",
    features: [
      "Two bedrooms",
      "Private loggia",
      "Plunge pool",
      "In-villa dining",
    ],
  },
  {
    id: "atelier",
    name: "L'Atelier",
    type: "Studio",
    sleeps: 2,
    size: "36 m²",
    price: 360,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
    cover:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1600&q=80",
    short:
      "An intimate studio for two, finished in lime-washed plaster and reclaimed oak.",
    features: [
      "Lime-washed walls",
      "Reclaimed oak",
      "Rainfall shower",
      "Garden view",
    ],
  },
];

export const menu = {
  intro:
    "A six-course tasting menu, written each morning in pencil from what the garden, butcher and sea offered before sunrise.",
  sections: [
    {
      title: "To Begin",
      number: "01",
      items: [
        {
          name: "Bread, butter, salt",
          desc: "Sourdough baked at five, cultured cream butter, Cervia sea salt.",
          price: 12,
        },
        {
          name: "Crudo of red prawn",
          desc: "Sicilian red prawn, citrus oil, fennel pollen, almond.",
          price: 28,
        },
        {
          name: "Buffalo & summer melon",
          desc: "Mozzarella di bufala, charred melon, basil seed, aged balsamic.",
          price: 24,
        },
      ],
    },
    {
      title: "From the Garden",
      number: "02",
      items: [
        {
          name: "Heirloom tomato",
          desc: "Twelve varieties, smoked ricotta, sourdough crumb, oregano oil.",
          price: 22,
        },
        {
          name: "Charred courgette",
          desc: "Slow-charred courgette, miso butter, hazelnut, marigold.",
          price: 21,
        },
        {
          name: "Garden minestra",
          desc: "Field pea broth, pistou, shaved pecorino, late summer beans.",
          price: 19,
        },
      ],
    },
    {
      title: "Pasta & Grains",
      number: "03",
      items: [
        {
          name: "Pici cacio e pepe",
          desc: "Hand-rolled pici, Tellaro pepper, twenty-four-month pecorino.",
          price: 26,
        },
        {
          name: "Tortello of guinea fowl",
          desc: "Slow-braised guinea fowl, brown butter, sage, parmesan crust.",
          price: 32,
        },
        {
          name: "Risotto of saffron & marrow",
          desc: "Carnaroli, San Gimignano saffron, bone marrow, gremolata.",
          price: 34,
        },
      ],
    },
    {
      title: "Mains",
      number: "04",
      items: [
        {
          name: "Aged Chianina sirloin",
          desc: "Sixty-day dry-aged, ember-grilled, smoked bone jus, watercress.",
          price: 58,
        },
        {
          name: "Adriatic turbot",
          desc: "Whole turbot for two, capers, lemon, brown butter, samphire.",
          price: 96,
        },
        {
          name: "Roasted celeriac",
          desc: "Whole-roasted celeriac, hazelnut praline, black truffle, brown butter.",
          price: 36,
        },
      ],
    },
    {
      title: "To Finish",
      number: "05",
      items: [
        {
          name: "Olive oil cake",
          desc: "Estate olive oil, sea salt, citrus, crème fraîche, candied peel.",
          price: 14,
        },
        {
          name: "Tiramisù 2012",
          desc: "Our original — the one we wrote on the first menu, twelve years ago.",
          price: 16,
        },
        {
          name: "Cheese, three ways",
          desc: "A small board of Tuscan and Piedmontese cheeses, mostarda, walnut bread.",
          price: 22,
        },
      ],
    },
  ],
};

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
    span: "tall",
    alt: "Hotel suite at dawn",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    span: "wide",
    alt: "Restaurant table setting",
  },
  {
    src: "https://images.unsplash.com/photo-1568376794508-ae52c6ab3929?auto=format&fit=crop&w=1400&q=80",
    span: "default",
    alt: "Olive grove",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80",
    span: "default",
    alt: "Plated dish",
  },
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    span: "tall",
    alt: "Bedroom with linen",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    span: "default",
    alt: "Pasta detail",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
    span: "wide",
    alt: "Outdoor dining",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
    span: "default",
    alt: "Bath detail",
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1400&q=80",
    span: "default",
    alt: "Wine pour",
  },
  {
    src: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1400&q=80",
    span: "tall",
    alt: "Pool view",
  },
  {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    span: "default",
    alt: "Tuscan landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    span: "wide",
    alt: "Lobby seating",
  },
];

export const press = [
  { name: "Condé Nast Traveler", note: "Hot List 2024" },
  { name: "Michelin Guide", note: "One Star · Recommended Stay" },
  { name: "The World's 50 Best", note: "Discovery 2023" },
  { name: "Monocle", note: "Quality of Life" },
  { name: "T Magazine", note: "Editor's Pick" },
  { name: "Wallpaper*", note: "Design Awards" },
];

export const story = {
  intro:
    "OLEA began as a single olive tree, and a question worth answering slowly.",
  paragraphs: [
    "In 2012 we bought a quiet hectare of Val d'Orcia from a family that had farmed it for four generations. There were two-hundred-and-eleven olive trees, a roofless barn, and a long table under a fig that hadn't fruited in years.",
    "We did not set out to build a hotel. We set out to make a place we would want to come home to — somewhere unhurried, where the light moved across the day, and where dinner mattered.",
    "Twelve years on, OLEA is nine suites, a restaurant of thirty seats, and a working olive farm. Most of what we serve we grow, raise, or have known by name for years. The rest we have learned to wait for.",
  ],
  signature: "— Elena & Tomás Vasari, Founders",
};

export const contact = {
  address: ["Strada del Cipresso 4", "53024 Pienza, SI", "Italia"],
  phone: "+39 0578 555 014",
  email: "buongiorno@olea.com",
  hours: [
    { label: "Reception", value: "24 hours" },
    { label: "Restaurant · Lunch", value: "12:30 – 14:30" },
    { label: "Restaurant · Dinner", value: "19:30 – 22:30" },
    { label: "Spa & Pool", value: "07:00 – 21:00" },
  ],
};
