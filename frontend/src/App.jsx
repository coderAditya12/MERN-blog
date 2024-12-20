import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import FooterCom from "./components/FooterCom";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminRoute from "./components/OnlyAdminRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
        </Route>
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}

export default App;
