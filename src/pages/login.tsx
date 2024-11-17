import  { useState } from 'react';
import imagem from '../assets/Component1.png';
import gif from '../assets/videoplayback.gif'; // Substitua pelo caminho correto
import { useNavigate } from 'react-router-dom';
import imagem2 from '../assets/AAA.png';
import axios from 'axios'; // Importe o axios

function Login() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [showV, setShowV] = useState(false);

  // Função para enviar o nome e fazer login
  const pegarNome = async () => {
    if (nome) {
      setShowV(true); // Mostrar o gif de carregamento

      try {
        // Realiza a requisição POST para a API de login
        const response = await axios.post("https://chat-api-umber-ten.vercel.app/entrar", {
          nick: nome
        });

        // Supondo que a resposta contenha um token
        if (response.data.token) {
          // Armazenar o token e o idUser no localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('iduser', response.data.idUser);
          localStorage.setItem('nick', response.data.nick);
          console.log(response)
          // Agora que o token está armazenado, podemos navegar para a página principal ou qualquer outra página protegida
          setTimeout(() => {
            navigate('/home');
          }, 1000);
        } else {
          console.error("Token não recebido da API");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imagem2})` }}>
      <img src={imagem} className="mb-16 w-[70vw]" alt="Descrição da imagem" />
      <input
        className="bg-transparent border-2 border-solid border-[#FFFFFF] text-black mb-8 mt-4 px-5 py-4 w-[24rem] rounded-full text-lg focus:bg-gradient-to-t focus:from-[#00B7FF1A] focus:to-[#FFFFFF1A]"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />
      <button
        className="mt-[3vw] py-2 w-[16rem] rounded-full border-4 border-solid border-[#DBD8FF] bg-gradient-to-t from-[#0092FF] to-[#FFFFFF] text-white text-2xl font-semibold hover:border-[#7B83CA] hover:text-[#001380] hover:bg-gradient-to-t hover:from-[#003FBA] hover:to-[#0092FF]"
        onClick={pegarNome}
      >
        Entrar
      </button>
      {showV && (
        <div className="absolute w-full h-full flex items-center justify-center z-50 mix-blend-hard-light">
          <img src={gif} className="w-full h-full object-cover" alt="Gif de carregamento" />
        </div>
      )}
    </div>
  );
}

export default Login;
