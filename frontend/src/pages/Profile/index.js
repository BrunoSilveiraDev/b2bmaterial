import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import api from "../../services/api";
import * as _ from "lodash";
import { CSSTransitionGroup } from "react-transition-group";

import "./index.css";
import CardLoading from "./utils/card-loading/card-loading";
import logoImg from '../../assets/b2b-logopreto@300x-8.png';

import Card from "./utils/card";

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [userName, setUserName] = useState(null);
  const history = useHistory();

  const searchProfileByTerm = (term) => {
    setProfiles([]);
    if (term) {
      setLoadingProfiles(true);
      api.get(`profiles?query="${term}"`).then((response) => {
        setLoadingProfiles(false);
        setProfiles(response.data);
        console.log(response.data);

      });
    }
  };

  const handlerDebounceSearchTerm = useCallback(
    _.debounce(searchProfileByTerm, 500),
    []
  );


  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    const currentUser = user ? JSON.parse(user) : null; 
    setUserName(currentUser?.name);
   });

  function handleInputSearchChange(event) {
    const term = event.target.value;
    setSearchTerm(term);
    handlerDebounceSearchTerm(term);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  function logout () {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="logo" />
        <span>Bem vindo, {userName ? userName : 'Visitante'}</span>

        {
          !userName ?
            ( <Link className="button" to="/login">
            Login
            </Link> ) :
            (
              <> 
            <Link className="button" to="/">
            Atualizar Perfil
             </Link> 
            
            <button
              className="logout"
              onClick={() => logout()}
              type="button"
            >
              <FiLogOut size={23} color="#fff" />
            </button>
            </>)

        }

        
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
              (profile, i) => (
                <Card key={i} profile={profile} searchTerm={searchTerm}></Card>
              )
            )}
          </ul>
        ) : null}
      </CSSTransitionGroup>
    </div>
  );
}
