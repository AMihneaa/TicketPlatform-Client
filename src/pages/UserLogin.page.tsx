import React, { useState } from "react";

interface UserData {
  username: string;
  password: string;
}

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UserData = {
      username,
      password,
    };

    try {

        console.log("User Data:", userData);
      const response = await fetch("https://47287039-bf8e-4eb6-a406-71bfe9007b4f.eu-central-1.cloud.genez.io/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response:", response);

      if (response.ok) {
        response.json().then((data) => {
          console.log("Login successful:", data);
            localStorage.setItem("Authorization", data.token);

            window.location.href = "/"; 
        }
        );
        setMessage("Login successful!");
      } else {
        setMessage("Failed to login.");
        console.error("Failed to login:", response.statusText);
      }
    } catch (error) {
      setMessage("Error during login.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Public Transport Tickets</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium" htmlFor="userName">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                message.includes("Error") || message.includes("Failed") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
