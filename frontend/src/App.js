import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Users from "./Users";

function App() {
  const [users, setUsers] = useState([]);

  // Charger les utilisateurs une seule fois
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Erreur de chargement :", error));
  }, []);

  return (
    <div className="container">
      <h1>Gestion des utilisateurs</h1>
      <Users users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
