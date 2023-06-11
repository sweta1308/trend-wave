import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { RequireAuth } from './components/RequireAuth';
import { Header } from './pages/header/Header';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import Mockman from 'mockman-js';
import { Explore } from './pages/explore/Explore';
import { Profile } from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={2000}  />
      <Routes>
        <Route path='/register' element={<Header />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<RequireAuth />}>
          <Route path='/'element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/mockman' element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
