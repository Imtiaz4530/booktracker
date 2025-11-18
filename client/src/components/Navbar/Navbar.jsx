import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.left}>
        <div className={styles.logo}>BookTracker</div>
      </Link>

      <div className={styles.right}>
        {token ? (
          <>
            <Link to="/create" className={styles.buttonPrimary}>
              Create
            </Link>
            <button className={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.buttonSecondary}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
