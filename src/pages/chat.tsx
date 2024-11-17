import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import imagem from '../assets/AAA.png'; // Ajuste o caminho da imagem conforme necessário

function Chat() {
  const { salaId } = useParams(); // Recupera o id da sala da URL
  const [salas, setSalas] = useState<any[]>([]);
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [novaMensagem, setNovaMensagem] = useState(""); // Estado para a nova mensagem

  // Recupera o token e o nick armazenados no localStorage
  const nickUsuario = localStorage.getItem('nick') || "Usuário";
  const token = localStorage.getItem('token') || "";

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get('https://chat-api-umber-ten.vercel.app/salas');
        setSalas(response.data); // Salva todas as salas
        setLoading(false); // Atualiza o estado de loading
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  useEffect(() => {
    if (salaId && salas.length > 0) {
      const sala = salas.find((s) => s._id === salaId); // Encontra a sala com o id correspondente

      if (sala) {
        setMensagens(sala.msgs); // Atualiza as mensagens com as da sala encontrada
      }
    }
  }, [salaId, salas]);

  const formatarData = (timestamp: number) => {
    const data = new Date(timestamp);
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(data);
  };

  // Função para enviar a mensagem
  const enviarMensagem = async () => {
    if (novaMensagem.trim()) {
      const novaMsg = {
        msg: novaMensagem,
        idSala: salaId, // Passa o id da sala
      };

      try {
        // Envia a mensagem para a API com o token e o nick como headers
        const response = await axios.post(
          'https://chat-api-umber-ten.vercel.app/sala/mensagem',
          novaMsg,
          {
            headers: {
             'token': token, // Passa o token no header Authorization
              'nick': nickUsuario, // Passa o nick como um header adicional
            },
          }
        );

        // Verifica se a resposta foi bem-sucedida
        if (response.status === 200) {
          // Atualiza as mensagens com a nova mensagem da API
          setMensagens([...mensagens, { ...novaMsg, timestamp: Date.now(), nick: nickUsuario }]);
          setNovaMensagem(""); // Limpa o campo de entrada
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  // Contar o número de usuários únicos
  const contarUsuariosUnicos = () => {
    const usuarios = new Set(mensagens.map((msg) => msg.nick));
    return usuarios.size;
  };

  if (loading) {
    return <div>Carregando salas...</div>;
  }

  const sala = salas.find((s) => s._id === salaId); // Encontra a sala com base no ID
  const nomeSala = sala ? sala.nome : 'Sala desconhecida'; // Exibe o nome da sala

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${imagem})` }}
    >
    <div className="w-full max-w-3xl  border-white bg-transparent rounded-lg flex flex-col">
        <div className="flex w-full mb-4">
          <div className="w-4/5 bg-gradient-to-b from-[rgba(150,166,175,0.7)] via-[rgba(55,62,68,0.3)] to-[rgba(188,220,255,0.5)] text-center border-2 border-white rounded-tl-lg rounded-bl-lg p-2">
            <p className="text-white font-light tracking-wide neonText">{nomeSala}</p>
          </div>
          <div className="w-1/5 flex justify-center items-center ml-2 bg-gradient-to-b from-[rgba(150,166,175,0.7)] via-[rgba(55,62,68,0.3)] to-[rgba(188,220,255,0.5)] text-white border border-white rounded-tr-lg rounded-br-lg shadow-[0_0_5px_#b7dcffa7,0_0_10px_#b7dcffa7,0_0_15px_#b7dcffa7,0_0_20px_#b7dcffa7]">
            <div className="text-lg">{contarUsuariosUnicos()}</div>
            <div className="w-3.5 h-3.5 bg-[#48ff00] rounded-full ml-2"></div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center w-full max-w-3xl h-1/2 mt-4 border border-white rounded-lg bg-gradient-to-b from-white/40 via-blue-500/40 to-blue-300/40 overflow-y-auto"
        style={{ maxHeight: '400px' }} // Ajuste a altura conforme necessário
      >
        {mensagens.length === 0 ? (
          <div className="text-white text-center">Nenhuma mensagem ainda.</div>
        ) : (
          mensagens.map((mensagem, index) => (
            <div
              key={index}
              className={`w-11/12 mb-4 p-3 rounded-lg border ${
                mensagem.nick === nickUsuario ? "bg-green-500 text-right" : "bg-white/50 text-left"
              }`}
            >
              <p className="font-bold">{mensagem.nick}</p>
              <p>{mensagem.msg}</p>
              <p className="text-xs text-gray-300">{formatarData(mensagem.timestamp)}</p>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-row items-center justify-center mt-12">
        <input
          className="h-8 w-96 bg-transparent border border-white rounded-full px-3"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)} // Atualiza o estado da nova mensagem
          placeholder="Digite sua mensagem..."
        />
        <button
          className="h-9 w-14 ml-5 rounded-full border border-white bg-gradient-to-b from-[rgba(150,166,175,0.7)] via-[rgba(21,255,0,0.11)] to-[rgba(0,107,75,0.5)]"
          onClick={enviarMensagem} // Envia a mensagem ao clicar
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chat;
