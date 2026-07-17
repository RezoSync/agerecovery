import { lazy, Suspense, type ComponentType } from "react";
import { createBrowserRouter } from "react-router";

// Import perezoso por ruta: cada página se descarga solo cuando se visita,
// en vez de incluir las 8 páginas en el bundle inicial (code splitting).
const Home = lazy(() => import("./pages/Home"));
const TreatmentsList = lazy(() => import("./pages/TreatmentsList"));
const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail"));
const MethodPage = lazy(() => import("./pages/MethodPage"));
const PhilosophyPage = lazy(() => import("./pages/PhilosophyPage"));
const DoctorPage = lazy(() => import("./pages/DoctorPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function withSuspense(Page: ComponentType) {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(Home),
  },
  {
    path: "/tratamientos",
    element: withSuspense(TreatmentsList),
  },
  {
    path: "/tratamientos/:slug",
    element: withSuspense(TreatmentDetail),
  },
  {
    path: "/metodo",
    element: withSuspense(MethodPage),
  },
  {
    path: "/filosofia",
    element: withSuspense(PhilosophyPage),
  },
  {
    path: "/medico",
    element: withSuspense(DoctorPage),
  },
  {
    path: "/contacto",
    element: withSuspense(ContactPage),
  },
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);
