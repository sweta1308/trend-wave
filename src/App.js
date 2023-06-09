import { Route, Routes } from 'react-router';
import './App.css';
import { Header } from './pages/header/Header';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';
import Mockman from 'mockman-js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/'element={<Home />} />
        <Route path='/register' element={<Header />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mockman' element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
