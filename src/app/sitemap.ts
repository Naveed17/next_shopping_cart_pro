import type { MetadataRoute } from "next";

// Product categories
const categories = [
  "electronics",
  "clothing",
  "books",
  "home-garden",
  "sports",
  "beauty",
  "toys",
  "automotive",
  "health",
  "jewelry",
];

// Product subcategories
const subcategories = [
  "smartphones",
  "laptops",
  "headphones",
  "mens-clothing",
  "womens-clothing",
  "shoes",
  "fiction-books",
  "non-fiction",
  "furniture",
  "kitchen",
  "fitness",
  "outdoor",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL! || "http://localhost:3000"
  ).replace(/\/$/, "");
  const lastModified = new Date().toISOString();

  const categoryPages = categories
    .map((category) =>
      subcategories.map((subcategory) => ({
        url: `${baseUrl}/products/${category}/${subcategory}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    )
    .flat() as MetadataRoute.Sitemap;

  // Main ecommerce pages
  const mainRoutes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/products", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/cart", priority: 0.8, changeFrequency: "hourly" as const },
    { url: "/checkout", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/orders", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/auth/login", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/auth/signup", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  // Support and info pages
  const supportRoutes = [
    {
      url: "/privacy-policy",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    { url: "/contact-us", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/about-us", priority: 0.6, changeFrequency: "monthly" as const },
    {
      url: "/terms-of-service",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    { url: "/help", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const allRoutes = [...mainRoutes, ...supportRoutes];
  const sitemap = [
    ...allRoutes.map((route): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${route.url}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...categoryPages,
  ];
  return sitemap;
}
