import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_CERTIFICATE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Login failed: ${errorData.error || res.statusText}`);
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Save JWT token in localStorage
      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        alert("Login successful!");
        // Optionally redirect user to dashboard
        // window.location.href = "/dashboard";
      } else {
        alert("Login failed: Token not received");
      }
    } catch (err) {
      console.error("Error connecting to backend:", err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
