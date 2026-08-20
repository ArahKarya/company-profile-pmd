import type { LocaleContent } from "./types";
import { site } from "./site";

/**
 * English copy — PT Pangan Masa Depan.
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
        "A modern rice milling facility with 300 tons per day capacity in Indramayu, West Java. A trusted partner for distributors, retailers, and the food industry.",
    },
    about: {
      title: "About Us | PT Pangan Masa Depan",
      description: "The vision, mission, and journey of PT Pangan Masa Depan since 2021.",
    },
    services: {
      title: "Products | PT Pangan Masa Depan",
      description: "Premium rice, medium rice, and by-products from our milling process.",
    },
    careers: {
      title: "Careers | PT Pangan Masa Depan",
      description: "Grow with Indonesia's modern food industry.",
    },
    contact: {
      title: "Contact | PT Pangan Masa Depan",
      description: "Reach our team for quotations, partnerships, or facility visits.",
    },
  },

  footer: { officeLabel: "Office & Mill", contactsLabel: "Contact" },

  home: {
    hero: {
      headline: ["Modern Rice Milling", "for Indonesia's", "Food Security."],
      body: "300 tons per day capacity in Indramayu, West Java. A trusted partner for distributors, retailers, and food manufacturers who demand consistent quality in every shipment.",
      scrollCue: "Scroll to Explore",
      background: {
        desktop: "/images/hero-home-desktop.jpg",
        mobile: "/images/hero-home-mobile.jpg",
      },
    },

    intro: {
      body: [
        "Established in 2021, PT Pangan Masa Depan mills paddy into table-ready rice on a modern production line with quality control at every stage. Our facility in Kandanghaur, Indramayu, sits in the heart of one of West Java's largest rice-producing regions.",
        "We practise zero waste in earnest: every by-product of the milling process — broken rice, bran, and husk — is reprocessed into something of value rather than discarded.",
      ],
      media: [
        { src: "/images/intro-1.jpg", alt: "Rice milling line", width: 1200, height: 900 },
        { src: "/images/intro-2.jpg", alt: "Production team on the mill floor", width: 1200, height: 900 },
      ],
    },

    features: {
      items: [
        {
          id: "premium-rice",
          label: "Premium Rice",
          eyebrow: "Product Line",
          headline: ["Premium rice for", "households, hotels,", "and restaurants"],
          body: "Cruise and Wa Lemu are selectively processed from hand-picked paddy — whole grains, clean, with no added preservatives, colouring, or fragrance.",
          image: { src: "/images/feature-processing.jpg", alt: "Premium sorted rice", width: 1400, height: 900 },
          link: { href: site.routes.en.services, label: "View products", shortLabel: "Explore" },
        },
        {
          id: "capacity",
          label: "Capacity",
          eyebrow: "Facility",
          headline: ["300 tons per day", "with quality control", "at every stage"],
          body: "From paddy intake, drying, milling, and colour sorting through to packaging — all of it happens in our own facility, so the promised specification holds from batch to batch.",
          image: { src: "/images/feature-power.jpg", alt: "Large-scale milling facility", width: 1400, height: 900 },
          link: { href: site.routes.en.about, label: "About the facility", shortLabel: "Explore" },
        },
        {
          id: "zero-waste",
          label: "Zero Waste",
          eyebrow: "Sustainability",
          headline: ["Every by-product", "reprocessed into", "something of value"],
          body: "Broken rice, bran, and rice husk never end up as waste. We turn the husk into renewable energy pellets that reduce dependence on fossil fuels.",
          image: { src: "/images/feature-logistics.jpg", alt: "Milling by-products", width: 1400, height: 900 },
          link: { href: site.routes.en.services, label: "View by-products", shortLabel: "Explore" },
        },
      ],
    },

    gallery: {
      caption: "Click to Enlarge",
      images: [
        { src: "/images/gallery-1.jpg", alt: "Milling machinery line" },
        { src: "/images/gallery-2.jpg", alt: "Mill facility building" },
        { src: "/images/gallery-3.jpg", alt: "Rice quality inspection" },
        { src: "/images/gallery-4.jpg", alt: "Operator running the machinery" },
        { src: "/images/gallery-5.jpg", alt: "Distribution fleet" },
        { src: "/images/gallery-6.jpg", alt: "Team on the production floor" },
        { src: "/images/gallery-7.jpg", alt: "The facility at night" },
      ],
    },

    closing: {
      headline: ["Let's build a food supply chain", "that is **more dependable**."],
      art: "/brand/closing-art.svg",
    },
  },

  about: {
    hero: {
      headline: [
        "PT Pangan Masa Depan Delivers **Quality Rice**",
        "to **Indonesia's Table**",
      ],
      background: { desktop: "/images/hero-about.jpg", mobile: "/images/hero-about.jpg" },
    },
    statement:
      "PT Pangan Masa Depan operates in rice milling and distribution. Established in 2021 in Kandanghaur, Indramayu, we are dedicated to advancing Indonesia's food industry through modern technology and sustainable production practices.",

    vision: {
      eyebrow: "Our Vision",
      headline: ["To be a **modern** rice mill that", "underpins national food security."],
      body: [
        "We aim to be the principal partner for distributors, retailers, and food manufacturers in Indonesia — the first choice for customers who value consistent quality and dependable supply.",
        "With an enduring commitment to quality, process innovation, and customer satisfaction.",
      ],
      media: [{ src: "/images/about-vision.jpg", alt: "Rice milling facility", width: 1200, height: 900 }],
    },

    mission: {
      eyebrow: "Our Mission",
      headline: ["**Delivering** quality rice", "through modern and", "**environmentally sound** processes"],
      body: [
        "To supply premium-quality rice for household, HORECA, and food industry needs.",
        "To hold quality at every stage, from paddy intake through to final delivery.",
        "To reprocess every milling by-product into something of value — zero waste in practice, not in name.",
        "To develop our team through training and measurable working standards.",
      ],
      media: [
        { src: "/images/about-mission-1.jpg", alt: "Paddy intake", width: 1000, height: 800 },
        { src: "/images/about-mission-2.jpg", alt: "Rice handling in the warehouse", width: 1000, height: 800 },
        { src: "/images/about-mission-3.jpg", alt: "Production team", width: 1000, height: 800 },
      ],
      art: "/brand/closing-art.svg",
    },
  },

  services: {
    overview: {
      id: "overview",
      label: "Our Products",
      eyebrow: "Product Line",
      headline: ["Our Products"],
      body: [
        "Our range splits in two: table rice for households, HORECA, and wholesale; and by-products reprocessed from what the milling process leaves behind.",
        "Every product passes standardised quality control before it is packed and shipped.",
      ],
      image: { src: "/images/service-detail-1.jpg", alt: "Milled rice", width: 1200, height: 800 },
    },

    categories: [
      {
        id: "table-rice",
        label: "Table Rice",
        panel: {
          id: "table-rice",
          label: "Table Rice",
          eyebrow: "Product Line",
          headline: ["Table Rice"],
          body: [
            "Our three rice brands are processed from selected paddy with colour sorting and tiered quality control, serving everything from household kitchens to the premium market.",
          ],
          image: { src: "/images/feature-processing.jpg", alt: "Table rice", width: 1400, height: 900 },
        },
        children: [
          {
            id: "cruise",
            label: "Cruise",
            headline: ["Cruise"],
            body: [
              "Elegant, pure, and selective. Suited to households, hotels, restaurants, and the premium market.",
            ],
            image: { src: "/images/gallery-1.jpg", alt: "Cruise rice" },
          },
          {
            id: "wa-lemu",
            label: "Wa Lemu",
            headline: ["Wa Lemu"],
            body: [
              "The long grain of choice for Indonesian families. Suited to households, culinary use, and wholesale.",
            ],
            image: { src: "/images/gallery-2.jpg", alt: "Wa Lemu rice" },
          },
          {
            id: "nick-well",
            label: "Nick Well",
            headline: ["Nick Well"],
            body: [
              "Medium-grain rice with no preservatives, colouring, or fragrance. Suited to households, premium culinary use, and wholesale.",
            ],
            image: { src: "/images/gallery-4.jpg", alt: "Nick Well rice" },
          },
        ],
      },
      {
        id: "by-products",
        label: "By-Products",
        panel: {
          id: "by-products",
          label: "By-Products",
          eyebrow: "Zero Waste",
          headline: ["By-Products"],
          body: [
            "What the mill leaves behind is reprocessed into products of real value — not waste. This is zero waste as we practise it on the floor.",
          ],
          image: { src: "/images/feature-logistics.jpg", alt: "Milling by-products", width: 1400, height: 900 },
        },
        children: [
          {
            id: "broken-rice",
            label: "Broken Rice",
            headline: ["Broken Rice"],
            body: [
              "Grains far smaller than whole rice. Despite the size, the nutritional content remains close to that of whole grain.",
            ],
            image: { src: "/images/gallery-3.jpg", alt: "Broken rice" },
          },
          {
            id: "rice-bran",
            label: "Rice Bran",
            headline: ["Rice Bran"],
            body: [
              "The outer layer of the grain, rich in fibre, B-complex vitamins, minerals, and antioxidants.",
            ],
            image: { src: "/images/gallery-6.jpg", alt: "Rice bran" },
          },
          {
            id: "husk-pellet",
            label: "Rice Husk Pellet",
            headline: ["Rice Husk Pellet"],
            body: [
              "A renewable energy source made from agricultural residue, helping to reduce dependence on fossil fuels.",
            ],
            image: { src: "/images/gallery-7.jpg", alt: "Rice husk pellets" },
          },
        ],
      },
    ],
  },

  careers: {
    headline: ["**Join**", "Our Team"],
    body: [
      "Grow with Indonesia's modern food industry. Building a better food supply chain takes the best people, and we are looking for them.",
    ],
    emailLabel: "Send your CV to",
    image: { src: "/images/careers.jpg", alt: "The PT Pangan Masa Depan team", width: 2000, height: 1000 },
  },

  contact: {
    headline: ["Let's", "start a", "conversation"],
    officeLabel: "Office & Mill",
  },
};
