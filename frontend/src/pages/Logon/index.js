import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from "../../services/api";

import imgB2B from '../../assets/b2bmaterial.png';

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();

    api.post(`auth/login`, {email, password}).then((response) => {
      console.log(response);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user)); 
      localStorage.setItem('currentToken', JSON.stringify(response.data.token)); 
      history.push('/');
    }).catch( error => alert(error.response.data.message));
    
  }

  return (
    <div className="logon-container">
    <img src={imgB2B} alt="B2BMaterial" width="550px"/>

      <section className="form">
        {/*  logo here */}

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input value={email}  name="email"
                 onChange={ (e) => setEmail(e.target.value)} 
                 placeholder="Seu e-mail"/>

          <input value={password} 
                  onChange={ (e) => setPassword(e.target.value)}
                 placeholder="Sua senha"/>

          <button className="button"  type="submit">Entrar</button>

          <Link className="back-link" to="/signup">
            <FiLogIn size={16} color="#FFB663"/>
            Não tenho conta
          </Link>
        </form>
      </section>

    </div>
  )
}
