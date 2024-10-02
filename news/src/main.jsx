import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewsHome from "./Components/NewsHome.jsx";
import Category from "./Components/Category.jsx";
import Custom from "./Components/Custom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <NewsHome />,
      },
      {
        path: "category/:ctype",
        element: <Category />,
      },
      {
        path:"custom",
        element:<Custom/>
      },
      {
        path: "*",
        element: <Error />,
      }
    ],
  },
  
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
