import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import TreatmentsList from "./pages/TreatmentsList";
import TreatmentDetail from "./pages/TreatmentDetail";
import MethodPage from "./pages/MethodPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import DoctorPage from "./pages/DoctorPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/tratamientos",
    Component: TreatmentsList,
  },
  {
    path: "/tratamientos/:slug",
    Component: TreatmentDetail,
  },
  {
    path: "/metodo",
    Component: MethodPage,
  },
  {
    path: "/filosofia",
    Component: PhilosophyPage,
  },
  {
    path: "/medico",
    Component: DoctorPage,
  },
  {
    path: "/contacto",
    Component: ContactPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
