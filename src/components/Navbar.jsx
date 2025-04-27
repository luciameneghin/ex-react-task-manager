import { NavLink } from "react-router-dom";
import '../Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>
        Lista Task
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => isActive ? "link active" : "link"}>
        Aggiungi Task
      </NavLink>
    </nav>
  )
}

export default Navbar
