import { paths } from "shared/consts/consts";
import { Layout } from "./Layout";
import { createBrowserRouter } from "react-router-dom";
import { OpenSpacePage } from "pages/OpenSpacePage";
import { SilentSpacePage } from "pages/SilentSpacePage";
import { PeriodPage } from "pages/PeriodPage";
import { PermanentPage } from "pages/PermanentPage";
import { MyBookingsPage } from "pages/MyBookingsPage";
import { NotFoundPage } from "pages/NotFoundPage";

export const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: paths.openSpace,
          element: <OpenSpacePage />,
        },
        {
          path: paths.silentSpace,
          element: <SilentSpacePage />,
        },
        {
          path: paths.period,
          element: <PeriodPage />,
        },
        {
          path: paths.permanent,
          element: <PermanentPage />,
        },
        {
          path: paths.myBookings,
          element: <MyBookingsPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
