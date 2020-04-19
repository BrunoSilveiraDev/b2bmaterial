import React, { useEffect, useState } from "react";
import api from "../../services/api";
import * as _ from "lodash";
import { useAuth0 } from "../../react-auth0-spa";
import { Link } from "react-router-dom";

import "./edit.css";

const ProfileEdit = () => {
  const [profile, setProfile] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState("");
  const { getTokenSilently } = useAuth0();

  const searchProfileByTerm = async (term) => {
    if (term) {
      setUpdatingProfile(true);

      const token = await getTokenSilently();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      api.post(`profiles?query="${term}"`, config).then((response) => {
        setUpdatingProfile(false);
        setProfile(response.data);
      });
    }
  };

  useEffect(() => {});

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="profile-container">
      <h1 className="h1-update-profile">Atualizar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" autoComplete="nope" />
        <input placeholder="Seu e-mail" autoComplete="nope" />
        <input placeholder="Cidade" autoComplete="nope" />
        <input placeholder="Estado" autoComplete="nope" />
        <input placeholder="País" autoComplete="nope" />
        <button type="submit" className="button">
          Atualizar
        </button>
        <Link type="button" className="button" to="/profile">
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default ProfileEdit;
