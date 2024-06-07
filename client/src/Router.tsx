import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/homepage";
import Premium from "./pages/levels/premium";
import ContentAdminPage from "./pages/contentAdmin";
import { Payment } from "./pages/payment";
import { PaymentSuccessful } from "./pages/payment-successful";
import Lite from "./pages/levels/lite";
import Basic from "./pages/levels/lite";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import UnAuthorised from "./pages/unAuthorised";
import ProtectedRoute from "./components/routes/protectedRoute";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
          index: true,
        },
        {
          path: "/subscriptions/lite",
          element: <ProtectedRoute Component={Lite} minLevel={1}/>
        },
        {
            path: "/subscriptions/basic",
            element: <ProtectedRoute Component={Basic} minLevel={2}/>
        },
        {
            path: "/subscriptions/premium",
            element: <ProtectedRoute Component={Premium} minLevel={3}/>
        },
        {
          path: "/orders",
        },
         {
          path: "/success",
        },
        {
          path: "/contentadmin",
          element: <ContentAdminPage />
        },
        {
          path: "/payment/:level",
          element: <Payment />
        },
        {
          path: "/payment-successful",
          element: <PaymentSuccessful />
        },
        {
          path: "/unauthorised",
          element: <UnAuthorised />
        }
      ]
    },
  ]);