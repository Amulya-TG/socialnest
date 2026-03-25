import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="head-bar">
      <h2>SocialNest</h2>
      <div className="head-links">
        <Link to="/home" className="my-links"> Home</Link>
        <Link to="/feed" className="my-links">Feed</Link>
        <Link to="/profile" className="my-links">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
