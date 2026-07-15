import Layout from "../components/Layout";
import PhilosophySection from "../components/PhilosophySection";

export default function PhilosophyPage() {
  return (
    <Layout breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Filosofía" }]}>
      <PhilosophySection />
    </Layout>
  );
}
