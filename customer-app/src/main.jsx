import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Customers from "./components/Customers";
import CustomerById from "./components/CustomerById";
import CreateCustomer from "./components/CreateCustomer";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "get-custumers/",
        element: <Customers />,
      },
      {
        path: "create-custumer/",
        element: <CreateCustomer />,
      },
      {
        path: "get-custumer/:customerId",
        element: <CustomerById />,
      },
    ],

  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
