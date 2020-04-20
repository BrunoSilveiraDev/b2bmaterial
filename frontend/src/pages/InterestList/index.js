import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import api from "../../services/api";
import * as _ from "lodash";

import "./styles.css";

import logoImg from "../../assets/b2b-logopreto@300x-8.png";

export default function InterestList() {
  const [profiles, setProfiles] = useState([]);
  const history = useHistory();
  const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const listInterestList = (term) => {
    setProfiles([]);
    if (currentProfile._id) {
      api.get(`interest-list​/${currentProfile._id}`).then((response) => {
        console.log(response.data);
      });
    }
  };

  useEffect(() => {});

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="logo" />
        <span>
          Bem-vindo,{" "}
          {currentUser.name ? _.startCase(currentUser.name) : "Visitante"}
        </span>

        <button
          className="button-back-to-list"
          onClick={() => {
            history.push("/");
          }}
        >
          <AiOutlineClose size={23} color="#fff" />
        </button>
      </header>

      <h1 className="h1-update-profile">Lista de Interesse</h1>
    </div>
  );
}
