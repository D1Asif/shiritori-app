import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [inputWord, setInputWord] = useState("");
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [timer, setTimer] = useState(10);
  const [winner, setWinner] = useState(null);
  const [startingChar, setStartingChar] = useState('a');
  const [scores, setScores] = useState({
    player1: 50,
    player2: 50
  });

  const validateWord = async (word) => {
    // validate initial character
    if (word[0] !== startingChar) {
      setError(`Word must start with ${startingChar}`);
      return false;
    }
    // validate word length > 4
    if (word.length < 4) {
      setError("Word must be minimum 4 character long");
      return false;
    }

    // word already exists
    if (words.includes(inputWord)) {
      setError("The word has already been used!");
      return;
    }

    // validate meaning
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)

    if (res.status === 200) {
      return true;
    } else {
      setError("The word must be a meaningful dictionary word")
      return false;
    }
  }

  const handleSubmit = async () => {
    // validate word
    const isValidated = await validateWord(inputWord);

    // if validation failure show error
    if (!isValidated) {
      return;
    }

    // success: add word, switch player, update point, clear inputWord
    setWords([...words, inputWord]);
    if (currentPlayer === "Player 1") {
      setScores({
        ...scores,
        player1: scores.player1 - inputWord.length
      })
    } else {
      setScores({
        ...scores,
        payer2: scores.player2 - inputWord.length
      });
    }
    setCurrentPlayer("Player 2");
    setStartingChar(inputWord[inputWord.length - 1]);
    setInputWord("");
  }

  const handleReset = () => {
    // resent all the state
  }

  useEffect(() => {
    if (scores.player1 <= 0) {
      setWinner("Player 1")
    }
  
    if (scores.player2 <= 0) {
      setWinner("Player 2")
    }
  }, [scores]);

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
          {winner && <p>Winner: {winner} 🎉</p>}
          <div>
            Already used words:
            {words.map((word) => (
              <p key={word}>{word}</p>
            ))}
          </div>
            <div>
              Scores: Player 1: {scores.player1} Player 2: {scores.player2}
            </div>
          <h1>turn: {currentPlayer}</h1>
          <p>Word must start with: {startingChar}</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="text"
            style={{ border: "1px solid black" }}
            value={inputWord}
            onChange={(e) => {
              setError(null)
              setInputWord(e.target.value)
            }}
          />
          <button
            style={{ cursor: "pointer", backgroundColor: "#dcdcdc" }}
            disabled={!!winner}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <div>
            <button
              style={{ cursor: "pointer", backgroundColor: "#dcdcdc" }}
              onClick={handleReset}
            >
              Reset game
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
