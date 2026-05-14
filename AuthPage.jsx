import { useState } from "react";
import { apiRequest } from "./api";
import "./AuthPage.css";

export default function AuthPage({ mode = "login", navigate, onAuthChange }) {
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });
  const [pendingAdmin, setPendingAdmin] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveSession = (data) => {
    localStorage.setItem("portfolioToken", data.token);
    localStorage.setItem("portfolioUserRole", data.user.role);
    localStorage.setItem("portfolioUserName", data.user.name);
    onAuthChange?.(data.user);
    navigate(data.user.role === "admin" ? "admin" : "home");
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const data = await apiRequest(`/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (data.requiresOtp) {
        setPendingAdmin(data.userId);
        setMessage("OTP sent. Check email or the server console if SMTP is not configured.");
        setStatus("idle");
        return;
      }

      saveSession(data);
    } catch (error) {
      setMessage(error.message);
      setStatus("idle");
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const data = await apiRequest("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ userId: pendingAdmin, code: form.otp }),
      });
      saveSession(data);
    } catch (error) {
      setMessage(error.message);
      setStatus("idle");
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-shell container">
        <div className="auth-copy">
          <span className="section-label">{pendingAdmin ? "Two Factor" : isSignup ? "Create Account" : "Welcome Back"}</span>
          <span className="gold-line" />
          <h1>{pendingAdmin ? "Verify Admin Login" : isSignup ? "Sign Up" : "Login"}</h1>
          <p>
            Admin accounts use password login followed by a one-time code before the JWT session is issued.
          </p>
        </div>

        <form className="auth-card" onSubmit={pendingAdmin ? verifyOtp : submitAuth}>
          {!pendingAdmin && isSignup && (
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
            </label>
          )}

          {!pendingAdmin && (
            <>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="admin@example.com" required />
              </label>
              <label>
                Password
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
              </label>
            </>
          )}

          {pendingAdmin && (
            <label>
              OTP Code
              <input name="otp" value={form.otp} onChange={handleChange} placeholder="6-digit code" inputMode="numeric" required />
            </label>
          )}

          {message && <p className="auth-message">{message}</p>}

          <button className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Please wait..." : pendingAdmin ? "Verify OTP" : isSignup ? "Create Account" : "Login"}
          </button>

          {!pendingAdmin && (
            <button type="button" className="auth-switch" onClick={() => setIsSignup((value) => !value)}>
              {isSignup ? "Already have an account? Login" : "Need an account? Sign up"}
            </button>
          )}
        </form>
      </section>
    </div>
  );
}
