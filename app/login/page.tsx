"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (!name) {
        setError("Name is required for sign-up.");
        return;
      }
      if (signup(name, email, password)) {
        router.push("/dashboard");
      } else {
        setError("Signup failed. Try again.");
      }
    } else {
      if (login(email, password)) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
        {isSignUp && (
  <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-2 border border-gray-300 text-black rounded mb-2 focus:ring focus:ring-blue-300"
    required
  />
)}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p
          className="mt-4 text-blue-500 cursor-pointer"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
          }}
        >
          {isSignUp ? "Already have an account? Login" : "New here? Sign up"}
        </p>
      </div>
    </div>
  );
}
