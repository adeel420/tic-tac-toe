import React, { useEffect, useState } from "react";
import "./Home.css";
import Result from "../component/Result";
import { RxResume } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscDebugRestart } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa6";

const Home = () => {
  const [player1, setPlayer1] = useState("0");
  const [player2, setPlayer2] = useState("X");
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [tied, setTied] = useState("");
  const [popup, setPopup] = useState(false);
  const [player1Win, setPlayer1Win] = useState(0);
  const [player2Win, setPlayer2Win] = useState(0);
  const [winning, setWinning] = useState(null);
  const [winner, setWinner] = useState("");
  const [winningCombination, setWinningCombination] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  useEffect(() => {
    if (winning) return;

    for (let combination of winningCombination) {
      const [a, b, c] = combination;

      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinning(board[a]);
        setPopup(true);

        if (board[a] === player1) {
          setWinner("Player 1");
          const currentWins =
            JSON.parse(localStorage.getItem("player1Wins")) || 0;
          const updatedWinCount = currentWins + 1;
          localStorage.setItem("player1Wins", JSON.stringify(updatedWinCount));
          setPlayer1Win(updatedWinCount);
        } else if (board[a] === player2) {
          setWinner("Player 2");
          const currentWins =
            JSON.parse(localStorage.getItem("player2Wins")) || 0;
          const updatedWinCount = currentWins + 1;
          localStorage.setItem("player2Wins", JSON.stringify(updatedWinCount));
          setPlayer2Win(updatedWinCount);
        }
        return;
      }
    }

    if (board.every((cell) => cell !== null) && !winning) {
      setPopup(true);
      setWinner("No one");
      const currentTies = JSON.parse(localStorage.getItem("tiedGames")) || 0;
      const updatedTieCount = currentTies + 1;
      localStorage.setItem("tiedGames", JSON.stringify(updatedTieCount));
      setTied(updatedTieCount);
    }
  }, [board, winning, winningCombination, player1, player2]);

  const handleClick = (index) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  return (
    <div className="home-cont">
      <div className="front">
        <h1 className="title">
          <i>Tic-Tac-Toe</i>
        </h1>
        <button onClick={handlePopup} className="openPopup">
          <GiHamburgerMenu />
        </button>
      </div>
      <div className="info">
        <div className="check">
          <h4>
            Player 1 : <span style={{ color: "#f54104" }}>0</span>
          </h4>
          <h4>
            Player 2 : <span style={{ color: "#f54104" }}>X</span>
          </h4>
        </div>
        <h4>
          Turn: <span style={{ color: "#f54104" }}>{currentPlayer}</span>
        </h4>
      </div>
      <div className="tic-tac">
        <div className="container">
          {board.map((cell, index) => (
            <div
              key={index}
              className="cont"
              onClick={() => handleClick(index)}
            >
              <i>{cell}</i>
            </div>
          ))}
        </div>
      </div>
      <div className="results">
        <Result />
      </div>
      <div className="popup" style={{ display: popup ? "block" : "none" }}>
        <div className="popup-container">
          {/* <button className="times" onClick={handlePopup}>
            &times;
          </button> */}
          <div className="winner-message">
            <h2 style={{ textAlign: "center" }}>{`${winner} Wins!`}</h2>
          </div>
          <div className="btns">
            <button onClick={handlePopup}>
              <FaPlay />
            </button>
            <button onClick={() => window.location.reload()}>
              <VscDebugRestart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
