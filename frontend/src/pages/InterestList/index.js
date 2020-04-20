import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import api from "../../services/api";
import * as _ from "lodash";

import logoImg from "../../assets/b2b-logopreto@300x-8.png";
import Card from "../Profile/utils/card";

import "./styles.css";

export default function InterestList() {
  const [profiles, setProfiles] = useState([]);
  const [loadedList, setLoadedList] = useState(true);
  const history = useHistory();
  const currentProfile = JSON.parse(localStorage.getItem("currentProfile"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const url = `/interest-list/${currentProfile._id}`;
    console.log("UserEffect", url, currentProfile);
    if (currentProfile._id) {
      setLoadedList(true);
      api.get(url).then((response) => {
        console.log(response.data);
        setLoadedList(false);
        setProfiles(response.data.interestList);
      });
    }
  }, []);

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
      <ul className="ul-list-interest">
        {!loadedList
          ? profiles.map((p, i) => (
              <Card key={i} profile={p} searchTerm={""}></Card>
            ))
          : null}
      </ul>
    </div>
  );
}
