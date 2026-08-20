import type { LocaleContent } from "./types";
import { site } from "./site";

/**
 * English copy for PT Pangan Masa Depan. Mirrors `id.ts` section for section.
 * `**bold**` inside a headline line renders as <b>.
 */
export const en: LocaleContent = {
  localeName: "ENG",

  nav: {
    home: "Home",
    about: "About Us",
    services: "Products",
    careers: "Careers",
    contact: "Contact",
  },

  meta: {
    home: {
      title: "PT Pangan Masa Depan",
      description:
        "PT Pangan Masa Depan turns farmers' paddy into quality rice — drying, husking, polishing and packing within a single integrated production chain.",
    },
    about: {
      title: "About Us | PT Pangan Masa Depan",
      description: "The vision, mission and working principles of an integrated rice processor.",
    },
    services: {
      title: "Products | PT Pangan Masa Depan",
      description:
        "Rice from medium to premium super, marketable milling by-products, and milling and farmer partnership services.",
    },
    careers: {
      title: "Careers | PT Pangan Masa Depan",
      description: "Opportunities to join the PT Pangan Masa Depan team.",
    },
    contact: {
      title: "Contact | PT Pangan Masa Depan",
      description: "Get in touch about paddy purchasing, rice orders and partnerships.",
    },
  },

  footer: { officeLabel: "Head Office", contactsLabel: "Contact" },

  home: {
    hero: {
      eyebrow: "PT PANGAN MASA DEPAN",
      headline: ["Modern, integrated rice milling —", "from paddy to packed rice."],
      body: "Two connected production units: drying and husking at PMD-1, polishing and packing at PMD-2. Every batch is recorded, from the farmer's paddy to the sack that leaves the gate.",
      image: { src: "/images/hero-home-desktop.jpg", alt: "Paddy fields close to harvest", width: 2000, height: 1200 },
      actions: [
        { label: "See our products", href: site.routes.en.services, variant: "solid" },
        { label: "Farmer partnership", href: site.routes.en.contact, variant: "outline" },
      ],
    },

    intro: {
      body: [
        "Rice quality is decided long before polishing — by the moisture content of the paddy on arrival, by how thoroughly it is dried, and by the precision of every separation stage. That is why we run the whole chain in our own facilities rather than handing it to third parties.",
        "Every paddy intake, milling output and by-product is recorded against a batch number, so a sack of rice can always be traced back to the paddy it came from.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Paddy drying on the drying floor", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Operator checking a milling machine", width: 1200, height: 900 },
      ],
    },

    stats: {
      items: [
        { value: "[FIGURE]", unit: "tonnes/day", label: "Milling capacity" },
        { value: "[FIGURE]", unit: "farmers", label: "Paddy supply partners" },
        { value: "4", unit: "tiers", label: "Medium through Premium Super" },
        { value: "5", unit: "by-products", label: "All batch numbered" },
      ],
    },

    products: {
      eyebrow: "PRODUCTS",
      headline: ["Three lines out of one chain"],
      link: { href: site.routes.en.services, label: "All products" },
      items: [
        {
          id: "rice",
          title: "Packed rice",
          body: "Four quality tiers, packed by varietal classification and brand — including a customer's own brand.",
          image: { src: "/images/gallery-7.jpg", alt: "Polished rice grain", width: 1000, height: 1000 },
          link: { href: site.routes.en.services, label: "Learn more" },
        },
        {
          id: "by-products",
          title: "By-products",
          body: "Bran, broken rice, fine grain, husk and rejects — batch numbered, carried in stock, available to buy.",
          image: { src: "/images/gallery-4.jpg", alt: "Workers spreading paddy on the drying floor", width: 1000, height: 700 },
          link: { href: site.routes.en.services, label: "Learn more" },
        },
        {
          id: "services",
          title: "Contract milling",
          body: "Drying, husking and packing under your own brand — reported with the milling yield in full.",
          image: { src: "/images/feature-polishing.jpg", alt: "Milling machinery at PMD-2", width: 1400, height: 900 },
          link: { href: site.routes.en.services, label: "Learn more" },
        },
      ],
    },

    process: {
      title: "How it runs",
      note: "Hover a stage; click to open its detail.",
      from: {
        label: "Paddy",
        image: { src: "/images/gallery-3.jpg", alt: "Paddy grain before milling", width: 1000, height: 700 },
      },
      moreLabel: "Detail",
      closeLabel: "Close",
      to: {
        label: "Packed rice",
        image: { src: "/images/gallery-7.jpg", alt: "Polished rice grain", width: 1000, height: 1000 },
      },
      steps: [
        {
          step: "01",
          title: "Paddy intake",
          body: "Weighed, moisture tested, batch numbered.",
          unit: "PMD-1",
          image: { src: "/images/about-mission-1.jpg", alt: "Paddy being unloaded at intake", width: 1000, height: 800 },
          detail: {
            body: [
              "Freshly harvested and pre-dried paddy alike is weighed in front of whoever delivered it, then sampled for moisture and cleanliness. That test sets the price and the handling that follows — not an estimate made in the yard.",
            ],
            points: [
              "Recorded: weight, moisture, variety, origin and batch number",
              "In: paddy from farmers and farmer groups",
            ],
          },
        },
        {
          step: "02",
          title: "Drying",
          body: "Down to a safe storage moisture level.",
          unit: "PMD-1",
          image: { src: "/images/intro-1.jpg", alt: "Paddy drying on the drying floor", width: 1200, height: 900 },
          detail: {
            body: [
              "Moisture is brought down in stages to a level safe for storage. Drying too fast cracks the grain and raises breakage during milling, so the rate is held steady rather than rushed.",
            ],
            points: [
              "Recorded: moisture in and out, drying time",
              "Aim: the highest possible share of whole grain downstream",
            ],
          },
        },
        {
          step: "03",
          title: "Husking",
          body: "The husk comes off; brown rice comes out.",
          unit: "PMD-1",
          image: { src: "/images/feature-milling.jpg", alt: "Paddy and machinery at PMD-1", width: 1400, height: 900 },
          detail: {
            body: [
              "The husk is removed, leaving brown rice. What comes off is not waste: husk enters stock as a product in its own right, like every other by-product.",
            ],
            points: [
              "Out: brown rice — the feedstock for PMD-2",
              "By-product: husk, batch numbered",
            ],
          },
        },
        {
          step: "04",
          title: "Polishing & grading",
          body: "Degree of milling set, grain sorted by quality.",
          unit: "PMD-2",
          image: { src: "/images/feature-polishing.jpg", alt: "Milling machinery at PMD-2", width: 1400, height: 900 },
          detail: {
            body: [
              "The outer layer is polished to the intended degree, then the grain is separated by how much of it is whole. The quality tier — Medium through Premium Super — is assigned after grading, so what the pack says is what was actually measured.",
            ],
            points: [
              "Recorded: degree of milling, whole-grain share, milling yield",
              "By-products: bran, broken rice, fine grain and rejects",
            ],
          },
        },
        {
          step: "05",
          title: "Packing",
          body: "Packed per brand, ready to ship.",
          unit: "PMD-2",
          image: { src: "/images/gallery-5.jpg", alt: "Sacks of rice being loaded onto a truck", width: 1000, height: 700 },
          detail: {
            body: [
              "Rice is packed by tier, varietal classification and brand — a customer's own brand included. The batch number travels with the sack, so a pack can always be traced back to the paddy it came from.",
            ],
            points: [
              "Out: packed rice per brand and size",
              "Traceable: batch number from intake to delivery",
            ],
          },
        },
      ],
    },

    gallery: {
      caption: "Click to Enlarge",
      images: [
        { src: "/images/gallery-1.jpg", alt: "Paddy plots seen from the air" },
        { src: "/images/gallery-2.jpg", alt: "Storage silos at the production site" },
        { src: "/images/gallery-3.jpg", alt: "Paddy grain before milling" },
        { src: "/images/gallery-4.jpg", alt: "Workers spreading paddy on the drying floor" },
        { src: "/images/gallery-5.jpg", alt: "Sacks of rice being loaded onto a truck" },
        { src: "/images/gallery-6.jpg", alt: "Aerial view of the paddy drying floor" },
        { src: "/images/gallery-7.jpg", alt: "Polished rice grain" },
      ],
    },

    cta: {
      headline: ["Selling paddy, or looking for", "a rice supplier?"],
      button: { href: site.routes.en.contact, label: "Talk to our team" },
    },
  },

  about: {
    hero: {
      headline: ["PT Pangan Masa Depan Turns **Paddy**", "Into **Food You Can Trust**"],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan is an agribusiness company processing paddy into rice. From receiving farmers' paddy to branded packed rice, every stage runs in our own facilities, with quality records kept against each batch.",

    vision: {
      eyebrow: "Our Vision",
      headline: ["To be the **most dependable** rice", "processor for farmers and customers alike."],
      body: [
        "We want farmers' paddy to be priced fairly and processed properly, so that the rice reaching consumers stays consistent from one delivery to the next.",
        "That dependability is built from simple things done repeatedly: honest weighing, sufficient drying, and careful record keeping.",
      ],
      media: [{ src: "/images/about-vision.jpg", alt: "Farmers winnowing harvested paddy", width: 1200, height: 900 }],
    },

    mission: {
      eyebrow: "Our Mission",
      headline: ["**Processing** the harvest", "in a way that is", "**accountable**"],
      body: [
        "Buy farmers' paddy with transparent weighing and quality assessment.",
        "Hold quality at every stage, from paddy intake through to packing.",
        "Put every by-product to use — bran, broken rice, fine grain, husk and rejects — so nothing is wasted.",
        "Grow our team through training and measurable working standards.",
      ],
      media: [
        { src: "/images/about-mission-1.jpg", alt: "Paddy being unloaded at intake", width: 1000, height: 800 },
        { src: "/images/about-mission-2.jpg", alt: "Sacks stacked in the storage warehouse", width: 1000, height: 800 },
        { src: "/images/about-mission-3.jpg", alt: "The team moving sacks on the plant floor", width: 1000, height: 800 },
      ],
      art: "/brand/closing-art.svg",
    },
  },

  services: {
    overview: {
      id: "overview",
      label: "Our Products",
      eyebrow: "Products & Services",
      headline: ["Our Products"],
      body: [
        "Rice is our main product, packed according to quality tier, varietal classification and brand. Alongside it, every milling by-product is treated as a product in its own right — batch numbered and carried in stock.",
        "Beyond selling products, we also take in contract milling work and partner directly with farmers and farmer groups to buy paddy.",
      ],
      image: { src: "/images/service-detail-1.jpg", alt: "Sorted rice grains", width: 1200, height: 800 },
    },

    categories: [
      {
        id: "rice",
        label: "Rice",
        panel: {
          id: "rice",
          label: "Rice",
          eyebrow: "Main Product",
          headline: ["Packed Rice"],
          body: [
            "Each pack of our rice is defined by three things: its quality tier, the varietal classification of the paddy used, and the brand on the packaging. Together they make up a distinct product.",
          ],
          image: { src: "/images/feature-polishing.jpg", alt: "Milling machinery at PMD-2", width: 1400, height: 900 },
        },
        children: [
          {
            id: "rice-grades",
            label: "Quality Tiers",
            headline: ["Quality Tiers"],
            body: [
              "Our four tiers are set by degree of milling and the proportion of whole grain: Medium, Medium Super, Premium and Premium Super.",
              "The tier is assigned after grading rather than before milling — so what the pack says is what was actually measured.",
            ],
            diagram: {
              base: { src: "/brand/process-pmd2-en.svg", alt: "The PMD-2 process", width: 1460, height: 460 },
              hotspots: [
                { id: "polishing", label: "Polishing", rect: [4.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-en-1.svg" },
                { id: "grading", label: "Grading", rect: [28.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-en-2.svg" },
                { id: "packing", label: "Packing", rect: [52.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-en-3.svg" },
                { id: "distribution", label: "Distribution", rect: [76.0, 39.1, 18.5, 41.3], preview: "/brand/process-pmd2-en-4.svg" },
              ],
            },
          },
          {
            id: "rice-brands",
            label: "Classification & Brands",
            headline: ["Classification & Brands"],
            body: [
              "Classification follows the paddy variety milled, which keeps the character of the cooked rice consistent within each classification.",
              "One combination of tier and classification can be packed under several brands, including a customer's own.",
            ],
            image: { src: "/images/gallery-7.jpg", alt: "Polished rice grain" },
          },
        ],
      },
      {
        id: "by-products",
        label: "By-products",
        panel: {
          id: "by-products",
          label: "By-products",
          eyebrow: "By-products",
          headline: ["Milling By-products"],
          body: [
            "We treat all five milling by-products as full products: rice bran, broken rice, fine broken grain, husk and rejected rice. Each is batch numbered, carried in stock, and available to buy.",
          ],
          image: { src: "/images/feature-byproducts.jpg", alt: "By-product sacks in the warehouse", width: 1400, height: 900 },
        },
        children: [
          {
            id: "by-products-feed",
            label: "Bran & Fine Grain",
            headline: ["Bran & Fine Grain"],
            body: [
              "Rice bran — the outer layer released during polishing — is largely taken up by the animal feed and food processing industries.",
              "Fine broken grain is commonly used for rice flour and as a raw material in food manufacturing.",
            ],
            image: { src: "/images/gallery-3.jpg", alt: "Paddy grain before milling" },
          },
          {
            id: "by-products-other",
            label: "Broken, Rejects & Husk",
            headline: ["Broken, Rejects & Husk"],
            body: [
              "Broken rice is separated out at the grading stage and sold apart from whole grain.",
              "Rejected rice is kept out of branded packs, while husk from PMD-1 is taken up as fuel, growing medium and industrial raw material.",
            ],
            image: { src: "/images/gallery-6.jpg", alt: "Aerial view of the paddy drying floor" },
          },
        ],
      },
      {
        id: "services",
        label: "Services",
        panel: {
          id: "services",
          label: "Services",
          eyebrow: "Services",
          headline: ["Partnership & Contract Milling"],
          body: [
            "Our drying and milling capacity is open to partners: farmers selling paddy, and businesses that want their rice processed and packed in our facilities.",
          ],
          image: { src: "/images/service-detail-2.jpg", alt: "The paddy drying floor at the production unit", width: 1200, height: 800 },
        },
        children: [
          {
            id: "services-partnership",
            label: "Farmer Partnership",
            headline: ["Farmer Partnership"],
            body: [
              "We buy both freshly harvested and pre-dried paddy directly from farmers and farmer groups, with weighing and quality assessment open to be witnessed.",
              "The diagram below follows the paddy once it has been received at PMD-1.",
            ],
            diagram: {
              base: { src: "/brand/process-pmd1-en.svg", alt: "The PMD-1 process", width: 1460, height: 460 },
              hotspots: [
                { id: "intake", label: "Paddy intake", rect: [4.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-en-1.svg" },
                { id: "drying", label: "Drying", rect: [28.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-en-2.svg" },
                { id: "husking", label: "Husking", rect: [52.1, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-en-3.svg" },
                { id: "brown-rice", label: "Brown rice", rect: [76.0, 39.1, 18.5, 41.3], preview: "/brand/process-pmd1-en-4.svg" },
              ],
            },
          },
          {
            id: "services-contract",
            label: "Contract Milling",
            headline: ["Contract Milling & Packing"],
            body: [
              "For owners of paddy or brown rice, we offer drying, husking, polishing and packing under your own brand.",
              "Every job is reported with its milling yield and a breakdown of the by-products recovered.",
            ],
            image: { src: "/images/gallery-5.jpg", alt: "Sacks of rice being loaded onto a truck" },
          },
        ],
      },
    ],
  },

  careers: {
    headline: ["**Join**", "Our Team"],
    body: [
      "Processing food demands care every single day. We are looking for people willing to hold that standard — on the plant floor, in the warehouse, in the quality lab and in the office.",
    ],
    emailLabel: "Send your application to",
    image: { src: "/images/careers.jpg", alt: "The PT Pangan Masa Depan team on the drying floor", width: 2000, height: 1000 },
  },

  contact: {
    headline: ["Let's", "start a", "conversation"],
    officeLabel: "Head Office",
  },
};
