interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function OrganizationJsonLd({
  name = "PT Pangan Masa Depan",
  url = "https://panganmasadepan.com",
  logo = "https://panganmasadepan.com/images/logo-pmd.png",
  description = "Pabrik penggilingan beras modern 300 ton/hari di Indramayu.",
  email = "info@panganmasadepan.com",
  phone = "+62 812-3456-7890",
  address = "Indramayu, Jawa Barat, Indonesia",
}: OrganizationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Indramayu",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
      streetAddress: address,
    },
    sameAs: [],
    foundingDate: "2021",
    industry: "Rice Milling / Food Manufacturing",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
