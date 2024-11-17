import React from 'react';
import './chat.css';
import imagem from '../../assets/AAA.png';

function Chat() {
    return (
        <div className="containerrr">
            <div className="armm">
                <div className='groupInfo'>
                    <div className="salaName" ><p className='neonText'>AMIGOS DO FUTURO</p></div> <div className="onlineEmVolta" >  <div className="online" >6 </div><div className="onlineStatus"></div>  </div>
                </div>
            </div>
            <div className='chatArea'>
                <div className='message userMessage'>
                    <p className='senderName'>Você</p>
                    <p className='messageText'>Ola! Como estão?</p>
                </div>
                <div className='message senderMessage'>
                    <p className='senderName'>Maria</p>
                    <p className='messageText'>Olá! Eu estou bem!</p>
                </div>
                <div className='message senderMessage'>
                    <p className='senderName'>Jorge</p>
                    <p className='messageText'>Também, aqui é o Jorge!</p>
                </div>
                <div className='message'>
                    <p className='senderName'>Ana</p>
                    <p className='messageText'>KKKKKKK</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <input style={{ height: 30, width: 400, backgroundColor: "rgba(55, 62, 68, 0.0)", borderRadius: 30, border: '1px solid #ffffff', paddingLeft: 10 }} />
                    <button className="inputSend" style={{ height: 36, width: 60, marginLeft: 20, borderRadius: 30, border: '1px solid #ffffff'}}><p></p></button>
                </div>
            </div>
        </div>  
    );
}

export default Chat;