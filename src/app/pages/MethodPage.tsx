import Layout from "../components/Layout";
import VideoSection from "../components/VideoSection";
import MethodGallery from "../components/MethodGallery";

export default function MethodPage() {
  return (
    <Layout breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Método" }]}>
      <VideoSection />
      <MethodGallery />
    </Layout>
  );
}
