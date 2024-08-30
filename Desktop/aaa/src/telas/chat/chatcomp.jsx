import React, { useRef, useEffect } from 'react';
import './chat.css';
import { FixedSizeList as List } from 'react-window';

function Chat() {
    const listRef = useRef(null);
    const data = Array.from({ length: 1000 }, (_, e) => `Item ${e}`); // Dados de teste

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToItem(data.length - 1, 'end'); // Scroll para o item mais recente
        }
    }, [data.length]);

    return (
        <div style={{ flex: 2.5, color: 'black' }} className='listando'>
            <List
                ref={listRef}
                height={window.innerHeight} 
                itemCount={data.length} 
                itemSize={100} 
                width="100%" 
                style={{ overflow: 'auto' }}
            >
                {({ index, style }) => (
                    <div style={style} className="list-item">
                        {data[index]}
                    </div>
                )}
            </List>
        </div>
    );
}

export default Chat;
