import React, { useEffect, useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import api from "../../services/api";
import * as _ from "lodash";

<<<<<<< HEAD
import "./styles.css";

import logoImg from '../../assets/b2b-logopreto@300x-8.png';
import cssTransitionGroup from "./utils/search";

=======
import "./index.css";
import CardLoading from "./utils/card-loading/card-loading";
import logoImg from "../../assets/b2b-logopreto@300x-8.png";
>>>>>>> Versão Inicial Edit Profile


export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [userName, setUserName] = useState(null);
  const history = useHistory();
  const [count, setCount] = useState(0);

  const searchProfileByTerm = (term) => {
    setProfiles([]);
    if (term) {
      setLoadingProfiles(true);
      api.get(`profiles?query="${term}"`).then((response) => {
        setLoadingProfiles(false);
        setProfiles(response.data);
<<<<<<< HEAD
        setCount(response.data.length);
=======
        console.log(response.data);
>>>>>>> Versão Inicial Edit Profile
      });
    }
  };


  const handlerDebounceSearchTerm = useCallback(
    _.debounce(searchProfileByTerm, 500),
    []
  );

  useEffect(() => {
<<<<<<< HEAD
    const user = localStorage.getItem('currentUser');
=======
    const user = localStorage.getItem("currentUser");
>>>>>>> Versão Inicial Edit Profile
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

<<<<<<< HEAD

  function logout () {
=======
  function logout() {
>>>>>>> Versão Inicial Edit Profile
    localStorage.clear();
    history.push("/");
  }




  return (
    <div className="profile-container">
<<<<<<< HEAD
      <div className="nav">
        <header>
          <img src={logoImg} alt="logo"/>
          <span>Bem vindo, {userName ? userName : 'Visitante'}</span>

          {
            !userName
              ? ( <Link className="button" to="/login">Login</Link> )
              : (<>
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
        <p className="results">{count} resultados</p>
      </div>


      {cssTransitionGroup('cardloading', loadingProfiles)}
      {cssTransitionGroup('card',  loadingProfiles, profiles, searchTerm)}

=======
      <header>
        <img src={logoImg} alt="logo" />
        <span>Bem vindo, {userName ? userName : "Visitante"}</span>

        {!userName ? (
          <Link className="button" to="/login">
            Login
          </Link>
        ) : (
            <Link className="button" to="/">
              Atualizar Perfil
            </Link>

            <button className="logout" onClick={() => logout()} type="button">
              <FiLogOut size={23} color="#fff" />
            </button>
        )}
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
            {profiles.map((profile, i) => (
              <Card key={i} profile={profile} searchTerm={searchTerm}></Card>
            ))}
          </ul>
        ) : null}
      </CSSTransitionGroup>
>>>>>>> Versão Inicial Edit Profile
    </div>
  );
}
