import React, { useState } from 'react';
import imagem from '../../assets/Component 1.png';
import gif from '../../assets/videoplayback.gif'; // Substitua pelo caminho correto
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [showV, setShowV] = useState(false);

  const pegarNome = () => {
    console.log(nome);
    if (nome) {
      setShowV(true);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }
  };

  return (
    <div className="container">
      <img src={imagem} style={{ marginBottom: '60px', width: '70vw' }} alt="Descrição da imagem" />
      <input className="inputEntrar" value={nome} onChange={(e) => setNome(e.target.value)} />
      <button className="botaoEntrar" onClick={pegarNome}>entrar</button>
      {showV && (
        <div className="fullScreenGif">
          <img src={gif}/>
        </div>
      )}
    </div>
  );
}

export default Login;