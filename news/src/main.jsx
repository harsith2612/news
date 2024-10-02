import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";

const NewsHome = React.lazy(() => import("./Components/NewsHome.jsx"));
const Category = React.lazy(() => import("./Components/Category.jsx"));
const Custom = React.lazy(() => import("./Components/Custom.jsx"));
const Error = React.lazy(() => import("./Components/Error.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NewsHome />
          </Suspense>
        ),
      },
      {
        path: "category/:ctype",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: "custom",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Custom />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Error />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
