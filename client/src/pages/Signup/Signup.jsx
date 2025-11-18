import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { signup } from "../../api/bookApi";
import { AuthContext } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setToken, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await signup({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create an Account</h2>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className={styles.input}
          placeholder="Your name"
        />

        <label className={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          className={styles.input}
          placeholder="Unique username"
        />

        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className={styles.input}
          placeholder="you@example.com"
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className={styles.input}
          placeholder="********"
        />

        <label className={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          className={styles.input}
          placeholder="Re-enter password"
        />

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className={styles.switch}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
