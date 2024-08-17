import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import SignUp from "./pages/SignUp";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "AboutUs",
      element: <About />,
    },
    {
      path: "Projects",
      element: <Projects />,
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "sign-in",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <div>404 Not Found</div>, 
    },
  ]);
  return <RouterProvider router={route} />;
}

export default App;
