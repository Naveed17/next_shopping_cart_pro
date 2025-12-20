import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const base_url = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    name: "Next shoping cart",
    short_name: "NSC",
    description:
      "Next shopping cart is a modern and responsive e-commerce platform built with Next.js and Tailwind CSS. It offers a seamless shopping experience with a wide range of products, secure transactions, and user-friendly features. With its intuitive design and powerful features, Next shoping cart is the perfect choice for online retailers and consumers seeking a reliable and efficient e-commerce solution.",
    lang: "en",
    start_url: "/",
    display: "standalone",
    background_color: "#112D4E",
    theme_color: "#112D4E",
    icons: [
      {
        src: `${base_url}/web-app-manifest-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: `${base_url}/web-app-manifest-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
