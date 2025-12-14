import { CategoriesSection, FeaturedProducts, HeroSection, NewsletterSection, StatsSection, TestimonialsSection, TrendingSection, WhyChooseUsSection } from "@components/themes/default";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <StatsSection />
      <TrendingSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}