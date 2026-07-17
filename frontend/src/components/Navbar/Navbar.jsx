import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🚀 Smart Career Advisor
      </div>

      <ul className="nav-links">

        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/resume">
            Resume
          </NavLink>
        </li>

        <li>
          <NavLink to="/chat">
            AI Chat
          </NavLink>
        </li>

        <li>
          <NavLink to="/interview">
            Interview
          </NavLink>
        </li>

        <li>
          <NavLink to="/history">
            History
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Analytics
          </NavLink>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;