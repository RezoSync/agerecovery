import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import ResultsSection from "../components/ResultsSection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ProductGrid />
      <ResultsSection />
    </Layout>
  );
}
