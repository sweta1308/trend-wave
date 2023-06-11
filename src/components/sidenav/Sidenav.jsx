import { useAuth } from "../../context/auth-context";
import { NavLink } from "react-router-dom";

export const Sidenav = () => {
  const { userLogout } = useAuth();

  const getStyles = ({isActive}) => ({
    backgroundColor: isActive ? '#566176' : 'white',
    borderRadius: isActive ? '10px' : '',
    color: isActive ? 'white' : ''
  })

  return (
    <>
      <div className="border-r-2 border-solid border-black px-4 pr-1 pt-2 text-center min-h-screen fixed w-1/6">
        <NavLink style={getStyles} className="block py-4 cursor-pointer hover:scale-110" to='/'>
          <i class="fa-solid fa-grip"></i> <span className="ml-3 font-medium">Feed</span>
        </NavLink>
        <NavLink style={getStyles} className="block py-4 cursor-pointer hover:scale-110" to='/explore'>
          <i class="fa-regular fa-compass"></i> <span className="ml-3 font-medium">Explore</span>
        </NavLink>
        <NavLink style={getStyles} className="block py-4 cursor-pointer hover:scale-110" to='/profile'>
          <i class="fa-regular fa-user"></i> <span className="ml-3 font-medium">Profile</span>
        </NavLink>
        <p className="block py-4 cursor-pointer hover:scale-110" onClick={() => userLogout()}>
          <i class="fa-solid fa-arrow-right-from-bracket"></i> <span className="ml-3 font-medium">Log Out</span>
        </p>
      </div>
    </>
  );
};
