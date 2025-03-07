import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [inputWord, setInputWord] = useState("");
  const [words, setWords] = useState(['a', 'abc']);
  const [error, setError] = useState("ss");
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [timer, setTimer] = useState(10);
  const [scores, setScores] = useState({
    player1: 50,
    player2: 50
  });

  const handleSubmit = () => {

  }

  useEffect(() => {
    const countdown = setInterval(() => {
      
    }, 1000);
  })

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "screen",
        width: "500px",
        padding: "20px"
      }}>
        <div>
          <h1>Shiritori Game</h1>
          <div>
            Already used words:
            {words.map((word) => (
              <p>{word}</p>
            ))}
          </div>
          <h1>turn: {currentPlayer}</h1>
          {error && <p style={{color: "red"}}>{error}</p>}
          <input
            type="text"
            style={{border: "1px solid black"}}
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
          />
          <button style={{cursor: "pointer", backgroundColor: "#dcdcdc"}}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default App
