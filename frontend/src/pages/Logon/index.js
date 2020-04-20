import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import api from "../../services/api";

import imgB2B from "../../assets/b2bmaterial.png";
import logoB2B from "../../assets/b2b-logopreto@300x-8.png";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    api
      .post(`auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        localStorage.setItem(
          "currentToken",
          JSON.stringify(response.data.token)
        );
        api
          .get(`profiles/user/${response.data.user.id}`, {
            headers: { Authorization: `Bearer ${response.data.token}` },
          })
          .then((response) => {
            if (response.data.profile) {
              localStorage.setItem(
                "currentProfile",
                JSON.stringify(response.data.profile)
              );
            } else {
              localStorage.setItem("currentProfile", JSON.stringify({}));
            }

            history.push("/");
          });
      })
      .catch((error) => alert(error.response.data.message));
  }

  return (
    <div className="logon-container">
      <img
        className="img-b2b"
        src={imgB2B}
        alt="B2BMaterial"
        width="550px"
        height="650px"
      />

      <section className="form">
        <img className="logo-b2b" src={logoB2B} alt="B2BMaterial" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />

          <input
            value={password}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />

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
