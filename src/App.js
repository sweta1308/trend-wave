import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
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
import { PostDetails } from "./pages/PostDetails";
import { PageNotFound } from "./pages/404";

function App() {
  return (
    <div className="App dark:bg-dark-mode dark:text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: "1rem",
          right: "1rem",
          fontSize: "0.9rem",
        }}
      />
      <Routes>
        <Route path="/register" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post/:postID" element={<PostDetails />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
