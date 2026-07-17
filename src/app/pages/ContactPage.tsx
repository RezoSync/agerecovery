import Layout from "../components/Layout";
import ContactSection from "../components/ContactSection";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../i18n/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  useSEO({
    title: t("nav.contact"),
    description: t("contactPage.seoDescription"),
    path: "/contacto",
  });

  return (
    <Layout breadcrumbs={[{ label: t("nav.home"), to: "/" }, { label: t("nav.contact") }]}>
      <ContactSection />
    </Layout>
  );
}
