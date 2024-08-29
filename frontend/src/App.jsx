import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";

import SignIn from "./pages/SignIn";

import FooterCom from "./components/footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
        <Route path="/project" element={<Projects />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

export default App;
