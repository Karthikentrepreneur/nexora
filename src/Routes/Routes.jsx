import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import Home from "../Pages/Home3"; // renamed to Home
import AboutPage from "../Pages/AboutPage";
import DestinationPage from "../Pages/DestinationPage";
import DestinationDetailsPage from "../Pages/DestinationDetailsPage";
import TourPage from "../Pages/TourPage";
import TourDetailsPage from "../Pages/TourDetailsPage";
import ActivitiesPage from "../Pages/ActivitiesPage";
import ActivitiesDetailsPage from "../Pages/ActivitiesDetailsPage";
import TeamPage from "../Pages/TeamPage";
import TeamDetailsPage from "../Pages/TeamDetailsPage";
import ContactPage from "../Pages/ContactPage";
import BlogGrid from "../Pages/BlogGrid";
import BlogDetailsPage from "../Pages/BlogDetailsPage";
import BlogSidebarPage from "../Pages/BlogSidebarPage";
import InvestorRelationsPage from "../Pages/InvestorRelationsPage";
import ShippingPage from "../Pages/ShippingPage";
import LogisticsPage from "../Pages/LogisticsPage";
import ProductDistributionPage from "../Pages/ProductDistributionPage";
import SoftwareDevelopmentPage from "../Pages/SoftwareDevelopmentPage";
import RenewableEnergyPage from "../Pages/RenewableEnergyPage";
import CorporateSustainabilityPage from "../Pages/CorporateSustainabilityPage";
import GlobalPresencePage from "../Pages/GlobalPresencePage";
import SupplyChainSolutionsPage from "../Pages/SupplyChainSolutionsPage";
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        index: true,
        Component: Home, // Home3 but now used as Home
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "destination",
        Component: DestinationPage,
      },
      {
        path: "destination/destination-details",
        Component: DestinationDetailsPage,
      },
      {
        path: "tour",
        Component: TourPage,
      },
      {
        path: "tour/tour-details",
        Component: TourDetailsPage,
      },
      {
        path: "our-business-verticals",
        Component: ActivitiesPage,
      },
      {
        path: "global-presence",
        Component: GlobalPresencePage,
      },
      {
        path: "activities/activities-details",
        Component: ActivitiesDetailsPage,
      },
      {
        path: "team",
        Component: TeamPage,
      },
      {
        path: "team/team-details",
        Component: TeamDetailsPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "investor-relations",
        Component: InvestorRelationsPage,
      },
      {
        path: "supply-chain-solutions",
        Component: SupplyChainSolutionsPage,
      },
      {
        path: "shipping",
        Component: ShippingPage,
      },
      {
        path: "logistics",
        Component: LogisticsPage,
      },
      {
        path: "product-distribution",
        Component: ProductDistributionPage,
      },
      {
        path: "software-development",
        Component: SoftwareDevelopmentPage,
      },
        {
          path: "renewable-energy",
          Component: RenewableEnergyPage,
        },
        {
          path: "corporate-sustainability",
          Component: CorporateSustainabilityPage,
        },
      {
        path: "blog",
        Component: BlogGrid,
      },
      {
        path: "blog-sidebar",
        Component: BlogSidebarPage,
      },
      {
        path: "blog/blog-details",
        Component: BlogDetailsPage,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
]);
