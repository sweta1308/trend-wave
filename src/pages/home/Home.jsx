import { Navbar } from "../../components/navbar/Navbar";
import { Sidenav } from "../../components/sidenav/Sidenav";
import './Home.css';

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="content bg-primary-lightest relative">
          <h1>Home</h1>
        </div>
      </div>
    </>
  );
};
