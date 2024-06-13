import { createBrowserRouter } from "react-router-dom";
import { routerList } from "./RouterList";
// --------------- components ------------------
import MainLayout from "../layout/MainLayout";
import LandingPage from "../modules/landingPage/LandingPage";
import ImageCapture from "../modules/detectionPage/ImageCapture";
import LeafList from "../modules/leafList/LeafList";
import LeafDetailsEdit from "../modules/leafDetails/LeafDetailsEdit";
export const mainRouter = createBrowserRouter([
  {
    path: routerList.landing,
    element: <MainLayout />,
    children: [
      { path: "/", element:<LandingPage/> },
      { path: routerList.detectionPage, element: <ImageCapture /> },
      {
        path: routerList.leafList,
        element: ( <section><LeafList/></section> ),
      },
      {
        path: `${routerList.editDetails}/:id`,
        element: ( <section><LeafDetailsEdit/></section> ),
      },
    ],
  },
]);
