import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to={`/`}>Posts</Link>
            <Link to={`/users`}>Users</Link>
            <Link to={`/notifications`}>Notifications 5</Link>
          </div>
          <button className="button">Refresh Notifications</button>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
