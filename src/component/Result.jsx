import React, { useEffect, useState } from "react";
import "./Result.css";

const Result = () => {
  const [win, setWin] = useState(0);
  const [win1, setWin1] = useState(0);
  const [tied, setTied] = useState(0);

  useEffect(() => {
    const update = localStorage.getItem("player1Wins");
    setWin(update);
  }, [win]);
  useEffect(() => {
    const update = localStorage.getItem("player2Wins");
    setWin1(update);
  }, []);
  useEffect(() => {
    const update = localStorage.getItem("tiedGames");
    setTied(update);
  }, []);
  return (
    <div>
      <div className="head">
        <i>
          <h3>Player 1</h3>
          <h3>Tied</h3>
          <h3>Player 2</h3>
        </i>
        <i style={{ textDecoration: "none" }}>
          <h3>{win}</h3>
          <h3>{tied}</h3>
          <h3>{win1}</h3>
        </i>
      </div>
    </div>
  );
};

export default Result;
