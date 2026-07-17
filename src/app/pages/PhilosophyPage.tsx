import Layout from "../components/Layout";
import PhilosophySection from "../components/PhilosophySection";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../i18n/LanguageContext";

export default function PhilosophyPage() {
  const { t } = useLanguage();
  useSEO({
    title: t("nav.philosophy"),
    description: t("philosophyPage.seoDescription"),
    path: "/filosofia",
  });

  return (
    <Layout breadcrumbs={[{ label: t("nav.home"), to: "/" }, { label: t("nav.philosophy") }]}>
      <PhilosophySection />
    </Layout>
  );
}
