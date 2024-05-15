"use client";
import { useState, useEffect } from "react";

//TODO: Implement Remember Me functionality

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Initialize local storage with default accounts
  useEffect(() => {
    localStorage.setItem("jorge@gmail.com", "password");
    localStorage.setItem("alex@gmail.com", "password");
    localStorage.setItem("antonio@gmail.com", "password");
    localStorage.setItem("greg@gmail.com", "password");
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(email);
    console.log(password);
    // Check if user is registered
    if (localStorage.getItem(email) === password) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      console.log("valid user");
      window.location.href = "/";
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        className="w-full p-2 rounded-lg border-2 border-gray-300 shadow-md h-10"
      />

      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="w-full p-2 rounded-lg border-2 border-gray-300 shadow-md h-10"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <label className="flex items-center gap-4">
        <input type="checkbox" className="w-6" />
        <span>Remember me</span>
      </label>

      <button
        type="submit"
        className="w-full bg-gradient-to-b from-orange-400 to-orange-600 text-white text-2xl font-bold py-2 px-4 rounded-xl min-h-16 shadow-md"
      >
        Sign In
      </button>
    </form>
  );
}

export default Signin;
