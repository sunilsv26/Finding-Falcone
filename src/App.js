import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles.css";

import Main from "./pages/Main";
import Loader from "./components/loader/loader";

const Find = React.lazy(() => import("./pages/Find"));
const Success = React.lazy(() => import("./pages/Success"));
const Fail = React.lazy(() => import("./pages/Fail"));
const NotFound = React.lazy(() => import("./pages/PageNotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Find />
  },
  {
    path: "/success",
    element: <Success />
  },
  {
    path: "/fail",
    element: <Fail />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<Loader loading />}>
        <Main>
          <RouterProvider router={router} />
        </Main>
      </React.Suspense>
    </div>
  );
}
