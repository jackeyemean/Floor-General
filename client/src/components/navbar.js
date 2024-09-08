import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="home-link"> Floor General </Link>
      <div className="nav-links">
        <Link to="/create-play">Create Play</Link>
        <Link to="/saved-plays">Saved Plays</Link>
      </div>
    </div>
  );
};
