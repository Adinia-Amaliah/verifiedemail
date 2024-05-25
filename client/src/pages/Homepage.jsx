import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import Navbar from "../components/Navbar";

export default function Homepage() {
  const [cookies] = useCookies(["TOKEN"]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.TOKEN) {
      const decodedToken = jwtDecode(cookies.TOKEN);
      setUser(decodedToken); 
    }
  }, [cookies.TOKEN]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{
        backgroundImage: `url(background.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <section className="mx-auto mt-4 ml-6">
        <h1 className="text-2xl font-bold" style={{ color: "white" }}>Welcome to my DOMAIN</h1>
        <table className="mt-4 border-collapse border border-white-800">
          <thead>
            <tr>
              <th className="border border-white-800 px-4 py-2" style={{ color: "white" }}>Full Name</th>
              <th className="border border-white-800 px-4 py-2" style={{ color: "white" }}>Email</th>
              <th className="border border-white-800 px-4 py-2" style={{ color: "white" }}>Age</th>
              <th className="border border-white-800 px-4 py-2" style={{ color: "white" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white-800 px-4 py-2" style={{ color: "white" }}>{user && user.full_name}</td>
              <td className="border border-white-800 px-4 py-2" style={{ color: "white" }}>{user && user.email}</td>
              <td className="border border-white-800 px-4 py-2" style={{ color: "white" }}>{user && user.age}</td>
              <td className="border border-white-800 px-4 py-2" style={{ color: "white" }}>{user && user.role}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}