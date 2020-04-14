import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import './styles.css';

export default function Profile() {
  return (
    <div className="profile-container">
      <header>
        {/*  logo here  */}
        <span>Bem vindo, Zito</span>

        <Link className="button" to="/#">Atualizar Perfil</Link>
        <button className="logout" onClick={alert('logout')} type="button">
          <FiLogOut size={23} color="#fff"/>
        </button>
      </header>


      <form onSubmit={alert("busca")}>

        <input className="search"  placeholder="Busca"/>
      </form>


      <ul>
        <li>
          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

        </li>

        <li>
          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

        </li>

        <li>
          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

        </li>

        <li>
          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

          <strong>TESTE:</strong>
          <p>teste</p>

        </li>
      </ul>
    </div>
  );
}
