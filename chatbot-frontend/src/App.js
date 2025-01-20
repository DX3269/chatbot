import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim()) {
            setMessages([...messages, { user: 'You', text: input }]);
    
            try {
                const response = await axios.post('http://localhost:5000/message', { query: input });
                setMessages((prev) => [...prev, { user: 'You', text: input }, { user: 'Bot', text: response.data.reply }]);
            } catch (error) {
                setMessages((prev) => [...prev, { user: 'Bot', text: 'Error communicating with server!' }]);
                console.error(error);
            }
    
            setInput('');
        }   
    };
    

    return (
        <div className="chat-container">
            <h1>Interactive Chatbot</h1>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.user === 'You' ? 'message user' : 'message bot'}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default App;
