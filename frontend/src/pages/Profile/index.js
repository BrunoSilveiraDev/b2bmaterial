import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [stringSearch, setstringSearch] = useState('');
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
   
    api.get('profiles').then( response => {
      setProfiles(response.data);
  });
  })


  async function handleSubmit(e){
    e.preventDefault();

    
}

  return (
    <div className="profile-container">
      <header>
        {/*  logo here  */}
        <span>Bem vindo, Zito</span>

        <Link className="button" to="/#">Atualizar Perfil</Link>
        <button className="logout" onClick={() => (alert('logout'))} type="button">
          <FiLogOut size={23} color="#fff"/>
        </button>
      </header>


      <form >

        <input value={stringSearch} 
               className="search"
               placeholder="Busca"
               onChange={e => setstringSearch(e.target.value)}/>
      </form>

      
      <ul>
        {
          profiles.map(profile => (
            <li key={profile.id}>
            <strong>{profile.name}</strong>
            <p>{profile.materials}</p>
            <p>{profile.email}</p>
            <p>{profile.contact}</p>
            <p>{profile.city}</p>
            <p>{profile.uf}</p>
          </li>
          ))
        }

      </ul>
    </div>
  );
}
