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
        "Rice from medium to premium super, marketable milling by-products, plus farmer partnerships, strategic partnerships and contract milling.",
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
      body: "Integrating advanced processing technology with full traceability, dedicated to uncompromising quality from the harvest of the Indonesian archipelago.",
      image: { src: "/images/facility-mill.jpg", alt: "The milling floor at PT Pangan Masa Depan", width: 1800, height: 1014 },
      actions: [
        { label: "See our products", href: site.routes.en.services, variant: "solid" },
        { label: "Farmer partnership", href: site.routes.en.contact, variant: "outline" },
        { label: "Strategic partnership", href: site.routes.en.contact, variant: "outline" },
      ],
    },

    intro: {
      eyebrow: "OUR VISION",
      body: [
        "To pioneer the transformation of the rice industry, driven by innovation, advanced technology and collaboration.",
        "All three point at a single aim: renewable systems, efficient processes, and benefit that reaches everyone involved. Through an integrated circular ecosystem, each stage of processing sustains the next — delivering a standard of quality that holds, and keeps holding.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Paddy drying on the drying floor", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Paddy and machinery on the milling floor", width: 1200, height: 900 },
      ],
    },

    stats: {
      items: [
        { value: "300", unit: "tonnes/day", label: "Processing capacity" },
        { value: "100+", unit: "agents", label: "Agent and trade network" },
        { value: "8", unit: "stages", label: "Intake to packaging, fully integrated" },
        { value: "2021", unit: "", label: "Serving partners since" },
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
          image: { src: "/images/feature-byproducts.jpg", alt: "Bulk warehouse: grain heaps and sacks", width: 1400, height: 900 },
          link: { href: site.routes.en.services, label: "Learn more" },
        },
        {
          id: "services",
          title: "Contract milling",
          body: "Drying, husking and packing under your own brand — reported with the milling yield in full.",
          image: { src: "/images/facility-hall.jpg", alt: "The machine line at the PMD facility", width: 788, height: 444 },
          link: { href: site.routes.en.services, label: "Learn more" },
        },
      ],
    },

    clients: {
      eyebrow: "CLIENTS & PARTNERS",
      headline: ["Our rice reaches industrial kitchens, government warehouses and wholesale markets"],
      note: "Working together since 2021",
      items: [
        "Mayora",
        "Food Station",
        "Bulog",
        "Charoen Pokphand",
        "Badan Gizi Nasional",
        "Pasar Induk Cipinang",
        "RM Taman Selera",
        "PT East Bogor",
      ],
      footnote: "Alongside CV Kawan Karya, Grosir Berkah Mandiri, JBM, RAI and more than 100 other agents.",
    },

    process: {
      title: "Productions Landscape",
      moreLabel: "Detail",
      closeLabel: "Close",
      from: {
        label: "Paddy",
        image: { src: "/images/gallery-3.jpg", alt: "Paddy grain before milling", width: 1000, height: 750 },
      },
      to: {
        label: "Packed rice",
        image: { src: "/images/gallery-7.jpg", alt: "Polished rice grain", width: 1000, height: 750 },
      },
      steps: [
        {
          step: "01",
          title: "Intake / Reception",
          body: "Weighing, quality testing and batch numbering.",
          unit: "PMD-1",
          image: { src: "/images/feature-milling.jpg", alt: "Paddy pouring into the intake pit", width: 1400, height: 900 },
          detail: {
            body: [
              "Paddy crosses the weighbridge and passes quality testing before it is unloaded. Moisture, cleanliness and variety are measured on the spot, and the results are bound to a single batch number that follows the grain until it leaves as packed rice.",
            ],
            points: [
              "Measured: weight, moisture, variety and origin",
              "In: paddy from farmers, farmer groups and suppliers",
            ],
          },
        },
        {
          step: "02",
          title: "Cleaning & Aspiration",
          body: "Graded screens and air aspiration before drying.",
          unit: "PMD-1",
          image: { src: "/images/facility-cleaning.jpg", alt: "Operator at the cleaning line control panel", width: 665, height: 1181 },
          detail: {
            body: [
              "Paddy is cleaned before it reaches the dryers. Graded screens and air aspiration take out straw, dust, stones and metal particles, so that only grain is dried — and so that the precision of the machines downstream is preserved.",
            ],
            points: [
              "Removed: straw, dust, stones and metal particles",
              "Out: clean paddy ready for drying",
            ],
          },
        },
        {
          step: "03",
          title: "Drying",
          body: "Staged moisture reduction under controlled heat.",
          unit: "PMD-1",
          image: { src: "/images/facility-drying.jpg", alt: "The dryer line at the PMD facility", width: 1050, height: 1400 },
          detail: {
            body: [
              "Drying runs in stages under controlled temperature and rate. Reducing moisture too quickly fissures the grain from within, so the process is set to keep grain intact through to milling rather than to save time.",
            ],
            points: [
              "Controlled: temperature, rate and drying time",
              "Recorded: moisture in and out, per batch",
            ],
          },
        },
        {
          step: "04",
          title: "Hulling",
          body: "Husk removal at a regulated roll pressure.",
          unit: "PMD-1",
          image: { src: "/images/facility-hulling.jpg", alt: "The husking line at the PMD facility", width: 788, height: 444 },
          detail: {
            body: [
              "The husk is separated from the kernel at a roll pressure set to avoid breaking the grain. What comes off does not end as waste: the husk is collected as the raw material for renewable-fuel pellets.",
            ],
            points: [
              "Out: brown rice — the feedstock for whitening",
              "By-product: husk, the raw material for renewable-fuel pellets",
            ],
          },
        },
        {
          step: "05",
          title: "Whitening & Polishing",
          body: "Bran removed across successive passes.",
          unit: "PMD-2",
          image: { src: "/images/facility-whitening.jpg", alt: "First-pass whitener at the PMD facility", width: 788, height: 444 },
          detail: {
            body: [
              "The bran layer is removed across successive passes rather than in one, so the degree of milling can be set to the quality tier being produced. The bran that separates is collected as a product in its own right.",
            ],
            points: [
              "Set: degree of milling, to match the quality tier",
              "By-product: rice bran, rich in fibre and B vitamins",
            ],
          },
        },
        {
          step: "06",
          title: "Grading",
          body: "Separation by grain size and wholeness.",
          unit: "PMD-2",
          image: { src: "/images/facility-grading.jpg", alt: "Rice inspected on the PMD grading line", width: 788, height: 444 },
          detail: {
            body: [
              "Grain is separated by size and by wholeness. That measurement is what sets the quality tier — from Medium to Premium Super — so the tier printed on the pack comes from a number rather than an estimate.",
            ],
            points: [
              "Assigned: quality tier, from Medium to Premium Super",
              "By-products: broken rice and fine broken grain",
            ],
          },
        },
        {
          step: "07",
          title: "Sorting",
          body: "Grain-by-grain inspection by colour and shape.",
          unit: "PMD-2",
          image: { src: "/images/gallery-7.jpg", alt: "Polished rice grain", width: 1000, height: 750 },
          detail: {
            body: [
              "Rice is inspected grain by grain for colour and shape. Off-colour grains and any foreign matter still present are removed automatically, producing the purity the food industry and the premium market require.",
            ],
            points: [
              "Removed: off-colour grain and foreign matter",
              "By-product: rejected rice",
            ],
          },
        },
        {
          step: "08",
          title: "Packing",
          body: "Packing by tier, classification and brand.",
          unit: "PMD-2",
          image: { src: "/images/facility-packing.jpg", alt: "The packing line at the PMD facility", width: 788, height: 444 },
          detail: {
            body: [
              "Rice is packed by quality tier, classification and brand, in sizes from 5 to 50 kilograms. The batch number from intake is carried through to the sack, so every pack stays traceable after it leaves the plant.",
            ],
            points: [
              "Out: packed rice in 5, 10, 25 and 50 kg",
              "Traceable: batch number from intake to delivery",
            ],
          },
        },
      ],
    },

    gallery: {
      caption: "Click to Enlarge",
      images: [
        { src: "/images/gallery-1.jpg", alt: "Grain elevator and silo installation" },
        { src: "/images/gallery-2.jpg", alt: "Silos and conveyor at the production site" },
        { src: "/images/gallery-3.jpg", alt: "Paddy grain before milling" },
        { src: "/images/gallery-4.jpg", alt: "Storage silos" },
        { src: "/images/gallery-5.jpg", alt: "Sacks of rice being loaded onto a truck" },
        { src: "/images/gallery-6.jpg", alt: "Aerial view of a grain terminal" },
        { src: "/images/gallery-7.jpg", alt: "Polished rice grain" },
        { src: "/images/gallery-8.jpg", alt: "Paddy plots seen from the air" },
      ],
    },

    cta: {
      headline: ["Selling paddy, or looking for", "a rice supplier?"],
      button: { href: site.routes.en.contact, label: "Talk to our team" },
    },
  },

  about: {
    hero: {
      headline: ["Modern Technology for **Indonesia's**", "**Food Security**"],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan is an agribusiness company processing paddy into rice in Kandanghaur, Indramayu. From paddy intake to branded packed rice, every stage runs in our own facilities, with a milling capacity of 300 tonnes of paddy per day.",

    vision: {
      eyebrow: "OUR VISION",
      headline: ["To pioneer the transformation of the rice industry", "through **innovation, technology and collaboration**."],
      body: [
        "We point all three at farming that is efficient, sustainable and prosperous.",
        "Technology here is not merely production equipment but the foundation for efficiency, consistent quality and sustainability — a milling system that is modern, environmentally sound and driven by data.",
      ],
      media: [{ src: "/images/facility-tower.jpg", alt: "The dryer tower at the PMD facility", width: 760, height: 1351 }],
    },

    mission: {
      eyebrow: "OUR MISSION",
      headline: ["Five things we do", "to get there"],
      body: [
        "Raise the value of the harvest through modern processing that is efficient and held to a high standard.",
        "Integrate technology and data across every line of business, from post-harvest to distribution.",
        "Build a collaborative farming ecosystem that connects farmers, partners and customers in a transparent rice supply chain.",
        "Foster an innovative, adaptive working culture in which every team feels its real effect on national food security.",
        "Become the benchmark of Indonesia's rice industry in efficiency, sustainability and social responsibility.",
      ],
      media: [
        { src: "/images/about-mission-1.jpg", alt: "Grain elevator and truck at intake", width: 1000, height: 800 },
        { src: "/images/about-mission-2.jpg", alt: "Sacks stacked in the storage warehouse", width: 1000, height: 800 },
        { src: "/images/about-mission-3.jpg", alt: "The team moving sacks on the plant floor", width: 1000, height: 800 },
      ],
      art: "/brand/closing-art.svg",
    },

    values: {
      eyebrow: "OUR VALUES",
      headline: ["TERDEPAN"],
      note: "Eight values, spelling the Indonesian word for foremost, that measure how we work.",
      items: [
        {
          letter: "T",
          title: "Tanggung Jawab — Responsibility",
          body: "We hold to integrity and accountability in every process, from sourcing raw material to delivering rice to the customer.",
        },
        {
          letter: "E",
          title: "Efisiensi — Efficiency",
          body: "We commit to working systems that save energy, time and cost by applying modern technology across every production line.",
        },
        {
          letter: "R",
          title: "Reliabilitas — Reliability",
          body: "We stay a trusted partner by holding quality steady, delivering on time, and serving customers well.",
        },
        {
          letter: "D",
          title: "Dedikasi — Dedication",
          body: "We work wholeheartedly to give our best to the company, to farmers and to the wider community.",
        },
        {
          letter: "E",
          title: "Ekselensi — Excellence",
          body: "We keep pushing continuous improvement and innovation towards the highest standard in the food industry.",
        },
        {
          letter: "P",
          title: "Profesionalisme — Professionalism",
          body: "We put work ethics, competence and accountability first in every action and decision.",
        },
        {
          letter: "A",
          title: "Adaptif — Adaptability",
          body: "We adapt quickly to shifts in technology, markets and customer needs so we stay relevant and competitive.",
        },
        {
          letter: "N",
          title: "Nasionalisme — Nationalism",
          body: "We are proud to strengthen national food security and to improve the livelihoods of Indonesian farmers.",
        },
      ],
    },
  },

  services: {
    overview: {
      id: "overview",
      label: "Our Products",
      eyebrow: "Products & Services",
      headline: ["Uncompromising Quality,", "Service That Connects"],
      body: [
        "We offer selected rice held to defined quality tiers and varietal classifications. Every stage of processing — by-products included — is managed transparently and measurably, under strict batch traceability.",
        "We also open wide room for collaboration: strategic partnerships for paddy procurement alongside farmers, and a modern, dependable contract milling facility.",
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
            headline: ["Four Quality Tiers"],
            image: { src: "/images/beras-mutu.jpg", alt: "White rice on a wooden scoop", width: 1400, height: 933 },
            body: [
              "The tier is assigned after grading and sorting, not before milling. What decides it is measurement: degree of milling, the share of whole grain, and how clean the grain colour is.",
              "Because it is measured rather than estimated, a tier means the same thing on every delivery — which is what makes the tenth shipment match the first.",
            ],
            tiers: [
              {
                code: "MD",
                name: "Medium",
                character: "Moderate degree of milling; some broken grain still carried",
                market: "Household consumption and wholesale",
              },
              {
                code: "MDS",
                name: "Medium Super",
                character: "Cleaner milling, a higher share of whole grain than medium",
                market: "Households, food service and catering",
              },
              {
                code: "PR",
                name: "Premium",
                character: "Clear, even grain with off-colour kernels removed",
                market: "Branded retail, hotels and restaurants",
              },
              {
                code: "PRS",
                name: "Premium Super",
                character: "The wholest and cleanest grain of the whole line",
                market: "Premium market and tightly specified customers",
              },
            ],
            tierSpecs: [
              {
                label: "Degree of milling (min)",
                values: ["95%", "95%", "95%", "95%"],
              },
              {
                label: "Moisture (max)",
                values: ["14%", "14%", "14%", "13%"],
              },
              {
                label: "Broken grain (max)",
                values: ["25%", "20%", "15%", "10%"],
              },
              {
                label: "Head rice (min)",
                values: ["75%", "80%", "85%", "90%"],
              },
            ],
            tierNote:
              "Medium and Premium follow the limits set by SNI 6128, Indonesia's national rice standard. Medium Super sits between the two and Premium Super above Premium — both are PMD's own grades, held to limits we set tighter than the standard. Every tier meets the same minimum degree of milling.",
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
            "Our drying and milling capacity is open to three kinds of partnership: farmers selling paddy, industry and institutions needing a continuing rice supply, and businesses that want their rice processed and packed in our facilities.",
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
            id: "layanan-strategis",
            label: "Strategic Partnership",
            headline: ["Strategic Partnership"],
            body: [
              "For food manufacturers, distributors, government agencies and retail networks, we supply rice on a continuing basis to specifications and a schedule agreed in advance — packing under the partner's own brand included.",
              "A capacity of 300 tonnes of paddy per day and batch-level traceability keep large volumes accountable for quality. The form of the arrangement is open: a standing supply contract, packing under a partner brand, or a fixed offtake of by-products.",
            ],
            image: { src: "/images/facility-packing.jpg", alt: "The packing line at the PMD facility", width: 788, height: 444 },
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
