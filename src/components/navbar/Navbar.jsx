import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-center gap-3 bg-fuchsia-900 text-white p-3">
      <section>
        <h1 className="text-center text-2xl pb-4">Redux Essentials Example</h1>
        <div className="flex gap-60 pb-4">
          <div className="flex gap-5">
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
