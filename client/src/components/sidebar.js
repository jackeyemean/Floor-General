import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="sidebar">
      <Link to="/defensive-schemes"> Defensive Schemes </Link>
      <Link to="/offensive-schemes"> Offensive Schemes </Link>
      <Link to="/plays"> Plays </Link>
      <Link to="/terminology"> Terminology </Link>
      {!cookies.access_token ? (
        <Link to="/auth"> Login/Register </Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
    </div>
  );
};
