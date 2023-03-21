import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./styles/App.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
