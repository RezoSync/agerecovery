import Layout from "../components/Layout";
import ContactSection from "../components/ContactSection";

export default function ContactPage() {
  return (
    <Layout breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Contacto" }]}>
      <ContactSection />
    </Layout>
  );
}
