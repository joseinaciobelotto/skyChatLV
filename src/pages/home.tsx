
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import imagem from '../assets/AAA.png'; // Imagem de fundo

function Home() {
  const [salas, setSalas] = useState<any[]>([]); // Para armazenar as salas
  const [loading, setLoading] = useState(true); // Para exibir um indicador de carregamento
  const navigate = useNavigate();

  // Função para buscar as salas da API
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get("https://chat-api-umber-ten.vercel.app/salas");
        setSalas(response.data);
        setLoading(false); // Atualiza o estado de loading quando as salas forem carregadas
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
        setLoading(false); // Ainda desabilita o loading mesmo que ocorra um erro
      }
    };

    fetchSalas();
  }, []);

  // Função para navegar para a sala específica
  const entrarNaSala = (salaId: string) => {
    navigate(`/chat/${salaId}`);
  };

  // Exibindo um loading enquanto as salas estão sendo carregadas
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Carregando salas...</div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center flex-col w-screen h-screen bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${imagem})` }}
    >
      <div className="w-[32%] h-[80%] pb-4">
        <div className="flex flex-row mb-4">
          <div className="w-[80%] text-center border-2 border-white rounded-tl-2xl rounded-bl-lg p-2 bg-gradient-to-b from-[rgba(150,166,175,0.7)] via-[rgba(55,62,68,0.3)] to-[rgba(188,220,255,0.5)]">
            <p className="text-white font-light tracking-wide">SALAS</p>
          </div>
          <div className="w-[20%] text-center border border-white rounded-tr-lg rounded-br-2xl flex items-center justify-center ml-2 bg-gradient-to-b from-[rgba(150,166,175,0.7)] via-[rgba(55,62,68,0.3)] to-[rgba(188,220,255,0.5)] text-white shadow-[0_0_5px_#b7dcffa7,0_0_10px_#b7dcffa7,0_0_15px_#b7dcffa7,0_0_20px_#b7dcffa7]">
            <p>{salas.length}</p>
          </div>
        </div>
        <div
          className="w-full h-full border border-white bg-gradient-to-b from-white/40 via-[#006ee0]/40 to-[#00bdff]/40 flex flex-col"
        >
          {salas.length === 0 ? (
            <div className="text-white text-center">Nenhuma sala disponível</div>
          ) : (
            salas.map((sala) => {
              const ultimaMsg = sala.msgs[sala.msgs.length - 1];
              const ultimaMsgTexto = ultimaMsg?.msg || "Nenhuma mensagem";
              const ultimaMsgNick = ultimaMsg?.nick || "Desconhecido";
              const ultimaMsgHora = ultimaMsg?.timestamp
                ? new Date(ultimaMsg.timestamp).toLocaleTimeString()
                : "Indefinido";

              return (
                <div
                  key={sala._id}
                  className="flex items-center w-[90%] max-w-[500px] mx-auto my-4 border-b-2 border-blue-700 rounded-full bg-white/50 p-2 cursor-pointer hover:scale-105"
                  onClick={() => entrarNaSala(sala._id)} // Passa o id da sala para o Chat
                >
                  <img src={imagem} alt="Imagem do contato" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col flex-1 ml-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{sala.nome}</span>
                      <div className="flex items-center gap-2 mr-4">
                        <span className="bg-[#48ff00] w-3.5 h-3.5 rounded-full"></span>
                        <span>{sala.msgs.length}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        Última mensagem: {ultimaMsgTexto}
                      </span>
                      <span className="text-gray-700 text-sm pr-2">
                        {ultimaMsgNick} - {ultimaMsgHora}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
