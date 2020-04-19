import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import api from "../../services/api";

<<<<<<< HEAD
import imgB2B from '../../assets/b2bmaterial.png';
import logoB2B from '../../assets/b2b-logopreto@300x-8.png';
=======
import imgB2B from "../../assets/b2bmaterial.png";
>>>>>>> Implementando profile

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

<<<<<<< HEAD
    api.post(`auth/login`, {email, password}).then((response) => {
      console.log(response);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      localStorage.setItem('currentToken', JSON.stringify(response.data.token));
      history.push('/');
    }).catch( error => alert(error.response.data.message));

=======
    api
      .post(`auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem(
          "currentToken",
          JSON.stringify(response.data.token)
        );
        history.push("/");
      })
      .catch((error) => alert(error.response.data.message));
>>>>>>> Implementando profile
  }

  return (
    <div className="logon-container">
<<<<<<< HEAD
    <img className="img-b2b" src={imgB2B} alt="B2BMaterial" width="550px" height="650px"/>
=======
      <img src={imgB2B} alt="B2BMaterial" width="550px" />
>>>>>>> Implementando profile

      <section className="form">
        <img className="logo-b2b" src={logoB2B} alt="B2BMaterial"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

<<<<<<< HEAD
          <input value={email}  name="email"
                 onChange={ (e) => setEmail(e.target.value)}
                 placeholder="Seu e-mail"/>

          <input value={password}
                  onChange={ (e) => setPassword(e.target.value)}
                 placeholder="Sua senha"/>
=======
          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
>>>>>>> Implementando profile

          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/signup">
            <FiLogIn size={16} color="#FFB663" />
            Não tenho conta
          </Link>
        </form>
      </section>
    </div>
  );
}
