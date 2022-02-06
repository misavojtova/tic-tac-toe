import React, { useEffect, useState } from "react";
import axios from "axios";

// import { FiCircle } from "react-icons/fi";
// import { MdOutlineClose } from "react-icons/md";

import "./App.css";
function App() {
  const [playerOne, setPlayerOne] = useState(true);
  const [playertwo, setPlayerTwo] = useState(false);
  const [output, setOutput] = useState("");
  // const [update, setUpdate] = useState({});

  const getArr = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/api/tic");
      setOutput(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetGame = async () => {
    try {
      setPlayerOne(true);
      setPlayerTwo(false);
      await axios.post("http://localhost:5001/api/tic");
      getArr();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getArr();
  }, []);

  const handleClick = async (id) => {
    try {
      setPlayerOne(!playerOne);
      setPlayerTwo(!playertwo);
      const player = playerOne
        ? { player: "playerOne", output: "X" }
        : { player: "playerTwo", output: "O" };

      await axios.patch(`http://localhost:5001/api/tic/${id}`, {
        player,
      });
      getArr();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='App'>
      <div>
        <h2>{playerOne ? "Player 1" : "Player 2"} play ...</h2>
        <button onClick={resetGame}>Reset Game</button>
      </div>

      <div className='main-grid'>
        {output &&
          output.map((cell, i) => {
            return (
              <div
                key={cell.id}
                onClick={() => handleClick(cell.id)}
                className={`box ${cell.box_id}`}
              >
                {cell.output}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
