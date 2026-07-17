import { Link } from "react-router";
import Layout from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import { useLanguage } from "../i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  useSEO({
    title: t("notFound.title"),
    description: t("notFound.description"),
    path: "/404",
    noindex: true,
  });

  return (
    <Layout>
      <div className="min-h-[70vh] bg-navy-deep flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-[64px] font-medium text-white mb-4">
            {t("notFound.heading")}
          </h1>
          <p className="text-white/60 mb-8 font-light">{t("notFound.message")}</p>
          <Link
            to="/"
            className="inline-block px-7 py-3.5 bg-gradient-to-br from-cyan to-navy text-white text-[13.5px] font-medium tracking-wide hover:shadow-lg hover:shadow-cyan/20 transition-all"
          >
            {t("notFound.backHome")}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
