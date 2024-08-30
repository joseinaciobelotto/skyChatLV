import React from 'react';
import './home.css';
import imagem from '../../assets/image.png';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const toChat = ()=>
    {
    navigate("/chat");

    }

    return (
        <div className="containerr">
            <div className="arm">
                <div className = "salasInfo2">
                <div className="salas2" ><p className='neonText2'>SALAS</p></div>
                <div className="numOf" ><p >3</p></div>
                </div>
                <div className="grupos" onClick={toChat} >
                    <div className="chatItem">
                        <img src={imagem} alt="Imagem do contato" className="contactImage" />
                        <div className="chatInfo">
                            <div className="chatHeader">
                            <span className="contactName2">Amigos do Futuro</span>
                            <div style={{display:"flex", flexDirection:"row", marginRight:"15px"}}>
                                <span className="onlineStatus2">5</span> 
                                <span>5</span> </div>
                            </div>
                            <div className="chatBody">
                                <span className="lastMessage">Ana: kkkkkkk</span>
                                <span className="lastMessageDate2">15:30</span>
                            </div>
                        </div>
                    </div>
                    <div className="chatItem">
                        <img src={imagem} alt="Imagem do contato" className="contactImage" />
                        <div className="chatInfo">
                            <div className="chatHeader">
                            <span className="contactName2">Amigos do Futuro</span>
                            <div style={{display:"flex", flexDirection:"row", marginRight:"15px"}}>
                                <span className="onlineStatus2">5</span> 
                                <span>5</span> 
                              
                                </div>
                           
                            </div>
                            <div className="chatBody">
                                <span className="lastMessage">Ana: kkkkkkk</span>
                                <span className="lastMessageDate2">15:30</span> 
                            </div>
                        </div>
                    </div>
                    <div className="chatItem">
                        <img src={imagem} alt="Imagem do contato" className="contactImage" />
                        <div className="chatInfo">
                            <div className="chatHeader">
                                <span className="contactName2">Amigos do Futuro</span>
                                <div style={{display:"flex", flexDirection:"row", marginRight:"15px"}}>
                                <span className="onlineStatus2">5</span> 
                                <span>5</span> 
                              
                                </div>
                            </div>
                            <div className="chatBody">
                                <span className="lastMessage">Ana: kkkkkkk</span>
                                <span className="lastMessageDate2">15:30</span> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;