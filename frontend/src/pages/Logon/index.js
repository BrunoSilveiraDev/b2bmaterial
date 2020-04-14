import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import imgB2B from '../../assets/b2bmaterial.png';

export default function Logon() {

  return (
    <div className="logon-container">
    <img src={imgB2B} alt="B2BMaterial" width="550px"/>

      <section className="form">
        {/*  logo here */}

        <form onSubmit={alert("ola")}>
          <h1>Faça seu logon</h1>

          <input placeholder="Seu e-mail"/>
          <input placeholder="Sua senha"/>

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/#">
            <FiLogIn size={16} color="#FFB663"/>
            Não tenho conta
          </Link>
        </form>
      </section>

    </div>
  )
}
