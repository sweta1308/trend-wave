import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { RequireAuth } from "./components/RequireAuth";
import { Header } from "./pages/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Mockman from "mockman-js";
import { Explore } from "./pages/Explore";
import { Profile } from "./pages/Profile";
import { Bookmark } from "./pages/Bookmark";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/register" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
