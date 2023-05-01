import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    // carrega a conversa armazenada no banco de dados ao iniciar a aplicação
    axios.get("/api/conversation").then((response) => {
      setConversation(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // envia a mensagem do usuário para o back-end e recebe a resposta
    const response = await axios.post("/api/message", {
      message: inputValue,
    });

    // adiciona a mensagem do usuário e a resposta ao histórico de conversas
    setConversation([
      ...conversation,
      { user: inputValue, bot: response.data.message },
    ]);

    // limpa o campo de input
    setInputValue("");
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chatbot">ChatBot</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/chatbot">
            <div className="chatbot">
              <h1>Chat Bot OpenAI</h1>
              <div className="conversation">
                {conversation.map((message, index) => (
                  <div key={index}>
                    <p className="user">{message.user}</p>
                    <p className="bot">{message.bot}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Digite uma mensagem"
                  value={inputValue}
                  onChange={handleChange}
                />
                <button type="submit">Enviar</button>
              </form>
            </div>
          </Route>
          <Route path="/">
            <div className="home">
              <h1>Bem-vindo(a)!</h1>
              <p>Selecione "ChatBot" no menu acima para iniciar a conversa.</p>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;