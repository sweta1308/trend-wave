import { Navbar } from "../../components/navbar/Navbar";
import { Sidenav } from "../../components/sidenav/Sidenav";

export const Explore = () => {
    return (
        <>
          <Navbar />
          <div className="flex">
            <Sidenav />
            <div className="content bg-primary-lightest relative">
              <h1>Explore</h1>
            </div>
          </div>
        </>
      );
}