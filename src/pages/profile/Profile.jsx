import { Navbar } from "../../components/navbar/Navbar";
import { Sidenav } from "../../components/sidenav/Sidenav";

export const Profile = () => {
    return (
        <>
          <Navbar />
          <div className="flex">
            <Sidenav />
            <div className="content bg-primary-lightest relative">
              <h1>Profile</h1>
            </div>
          </div>
        </>
      );
}