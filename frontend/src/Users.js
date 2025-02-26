import React, { useState } from "react";

const API_URL = "http://localhost:5000/users";

const Users = ({ users, setUsers }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null); // Stocke l'utilisateur en cours d'édition

  // Ajouter un utilisateur
  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({ name: "", email: "" }); // Réinitialiser les champs
      })
      .catch(() => alert("Erreur lors de l'ajout de l'utilisateur"));
  };

  // Supprimer un utilisateur
  const deleteUser = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => alert("Erreur lors de la suppression"));
  };

  // Activer le mode édition
  const startEditing = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, email: user.email });
  };

  // Modifier un utilisateur
  const updateUser = () => {
    if (!newUser.name || !newUser.email) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    fetch(`${API_URL}/${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
        setNewUser({ name: "", email: "" }); // Réinitialiser les champs
      })
      .catch(() => alert("Erreur lors de la modification"));
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}){" "}
              <button onClick={() => startEditing(user)}>✏️ Modifier</button>
              <button onClick={() => deleteUser(user.id)}>❌ Supprimer</button>
            </li>
          ))
        ) : (
          <p>Aucun utilisateur</p>
        )}
      </ul>

      <h3>{editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h3>
      <input
        type="text"
        placeholder="Nom"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      {editingUser ? (
        <button onClick={updateUser}>💾 Sauvegarder</button>
      ) : (
        <button onClick={addUser}>➕ Ajouter</button>
      )}
    </div>
  );
};

export default Users;
