import React, { useEffect, useState, useCallback } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import api from "../../services/api";
import * as _ from "lodash";
import { CSSTransitionGroup } from "react-transition-group";

import "./index.css";
import CardLoading from "./card-loading";
import Stars from "./stars";

const stringSimilarity = require("string-similarity");

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  const searchProfileByTerm = (term) => {
    setProfiles([]);
    if (term) {
      setLoadingProfiles(true);
      api.get(`profiles?query="${term}"`).then((response) => {
        setLoadingProfiles(false);
        setProfiles(response.data);
      });
    }
  };

  const handlerDebounceSearchTerm = useCallback(
    _.debounce(searchProfileByTerm, 500),
    []
  );

  const generateSpotlightText = (textFromProfile) => {
    let finalTextToJoin = textFromProfile
      .split(" ")
      .map((wordFromProfile, i) => {
        if (wordFromProfile !== "") {
          let tChanged = wordFromProfile;
          searchTerm.split(" ").every((wordFromSearch) => {
            const x = stringSimilarity.compareTwoStrings(
              wordFromProfile.toLowerCase(),
              wordFromSearch.toLowerCase()
            );
            if (x > 0.8) {
              tChanged = `<span class="spotlight">${wordFromProfile}</span>`;
              return false;
            }
            return true;
          });
          return tChanged;
        }
      });
    return parse(finalTextToJoin.join(" "));
  };

  useEffect(() => {});

  function handleInputSearchChange(event) {
    const term = event.target.value;
    setSearchTerm(term);
    handlerDebounceSearchTerm(term);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="profile-container">
      <header>
        {/*  logo here  */}
        <span>Bem vindo, Zito</span>

        <Link className="button" to="/#">
          Atualizar Perfil
        </Link>
        <button
          className="logout"
          onClick={() => alert("logout")}
          type="button"
        >
          <FiLogOut size={23} color="#fff" />
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <input
          className="search"
          placeholder="Busca"
          onChange={(e) => handleInputSearchChange(e)}
        />
      </form>
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {loadingProfiles ? (
          <ul>
            {_.times(6, function (i) {
              return <CardLoading key={i}></CardLoading>;
            })}
          </ul>
        ) : null}
      </CSSTransitionGroup>
      <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {!loadingProfiles ? (
          <ul>
            {profiles.map(
              ({ name, email, contact, cidade, estado, uf, materials }, i) => (
                <li key={i}>
                  <button>Icon</button>
                  <strong>{_.truncate(name, { length: 57 })}</strong>
                  <p>{email}</p>
                  {materials.map((m, j) =>
                    j < 3 ? (
                      <span key={j}>
                        {generateSpotlightText(_.upperFirst(_.toLower(m.name)))}
                        <br />
                      </span>
                    ) : null
                  )}
                  {materials.length > 3 ? (
                    <a href="#">E mais outros {materials.length - 3}!</a>
                  ) : null}
                  <p>{contact}</p>
                  <div className={"profile-container-botton-info "}>
                    <p>
                      {generateSpotlightText(_.startCase(_.toLower(cidade)))} -
                      {generateSpotlightText(uf)}
                    </p>
                  </div>
                  <Stars></Stars>
                </li>
              )
            )}
          </ul>
        ) : null}
      </CSSTransitionGroup>
    </div>
  );
}
