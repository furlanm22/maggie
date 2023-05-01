import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const message = {
      input: input
    }

    try {
      const response = await axios.post('/api/chatbot', message);
      const responseData = response.data;

      setConversation([...conversation, { text: input, sender: 'user' }]);
      setConversation([...conversation, { text: responseData.output, sender: 'bot' }]);
    } catch (error) {
      console.log(error);
    }

    setInput('');
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  useEffect(() => {
    const scrollContainer = document.getElementById('conversation-container');
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, [conversation]);

  return (
    <div className="chatbot-container">
      <div className="conversation-container" id="conversation-container">
        {conversation.map((message, index) => (
          <div className={`message ${message.sender}`} key={index}>{message.text}</div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" placeholder="Digite sua mensagem" value={input} onChange={event => setInput(event.target.value)} onKeyPress={handleKeyPress} />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;
