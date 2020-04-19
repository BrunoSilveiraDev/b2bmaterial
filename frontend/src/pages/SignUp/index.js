import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from "../../services/api";

import imgB2B from '../../assets/b2bmaterial.png';

export default function Logon() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const history = useHistory();

  function handleSignUp(e) {
    e.preventDefault();

    if(password === rePassword) {

      api.post(`auth/register`, { name, email, password}).then((response) => {
        console.log(response.data);
        history.push('/login');
      }).catch( error => alert(error.response.data.message));
  
    }
    else{
      alert('Senhas nao Conferem!');
    }

    
  }

  return (
    <div className="logon-container">
    <img src={imgB2B} alt="B2BMaterial" width="550px"/>

      <section className="form">
        {/*  logo here */}

        <form onSubmit={handleSignUp}>
          <h1>Cadastre-se</h1>

          <input value={name}  
                 onChange={ (e) => setName(e.target.value)} 
                 placeholder="Nome"/>
          
          <input value={email}  
                 onChange={ (e) => setEmail(e.target.value)} 
                 placeholder="E-mail"/>

          <input value={password} 
                  onChange={ (e) => setPassword(e.target.value)}
                 placeholder="Senha"/>
          
          <input value={rePassword} 
                  onChange={ (e) => setRePassword(e.target.value)}
                 placeholder="Confirme sua senha"/>

          <button className="button"  type="submit">Registrar</button>

          <Link className="back-link" to="/login">
            <FiLogIn size={16} color="#FFB663"/>
            Já tenho uma conta
          </Link>
        </form>
      </section>

    </div>
  )
}
