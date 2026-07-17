import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ProductGrid from "../components/ProductGrid";
import ResultsSection from "../components/ResultsSection";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  useSEO({
    title: "Age Recovery — Medicina Estética y Antienvejecimiento",
    description: t("home.seoDescription"),
    path: "/",
  });

  return (
    <Layout>
      <HeroSection />
      <ProductGrid />
      <ResultsSection />
    </Layout>
  );
}
