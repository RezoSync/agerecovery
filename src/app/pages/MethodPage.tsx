import Layout from "../components/Layout";
import VideoSection from "../components/VideoSection";
import MethodGallery from "../components/MethodGallery";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../i18n/LanguageContext";

export default function MethodPage() {
  const { t } = useLanguage();
  useSEO({
    title: t("nav.method"),
    description: t("methodPage.seoDescription"),
    path: "/metodo",
  });

  return (
    <Layout breadcrumbs={[{ label: t("nav.home"), to: "/" }, { label: t("nav.method") }]}>
      <VideoSection />
      <MethodGallery />
    </Layout>
  );
}
