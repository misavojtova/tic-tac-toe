const db = require("../db-config");
let player;
let input;

const getArr = async (req, res) => {
  try {
    const [tictac] = await db.query("Select * from tictac");
    res.status(200).json(tictac);
  } catch (error) {
    res.status(500).send(error);
  }
};

const checkWinner = async (req, res) => {
  try {
    let testedConditions = [];
    const [tictac] = await db.query("Select * from tictac");
    const playersInputArr = tictac.map((item) => item.input);
    console.log(input);
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Getting inputed indexes of each Player
    const checkPlayer = (playersInputArr, input) => {
      return playersInputArr.reduce((arr, cell, i) => {
        if (cell === input) arr.push(i);
        return arr;
      }, []);
    };
    const currentPlayerArr = checkPlayer(playersInputArr, input);

    // Check if condition is present in player's array
    const isWinner = (player, condit) => {
      return condit.every(function (element) {
        return player.includes(element);
      });
    };
    // Loop thru all the conditions
    for (i = 0; i < conditions.length; i++) {
      testedConditions.push(isWinner(currentPlayerArr, conditions[i]));
    }
    // Loop thru array of (true || false) see if any condition passed and find winner
    const win = testedConditions.find((el) => el === true);
    if (win)
      res.status(200).json({
        msg: `${player} ( ${input} ) . . is a winner 🎉, Congratulations!`,
        code: "123456",
      });
    // Check DraW
    else if (player === "Player 1" && currentPlayerArr.length > 4) {
      res.status(200).json({
        msg: "No one won it's a draw! Reset and Play Again!",
        code: "654321",
      });
    }
    // Check Turn
    else
      res.status(200).json({
        msg: `It's ${
          player === "Player 1" ? "Player's 2 ( O )" : "Player's 1 ( X )"
        } . . turn to play!`,
        code: "789456",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const postNewData = async (req, res) => {
  try {
    const id = req.params.id;
    const { inputData } = req.body;
    player = inputData.player;
    input = inputData.input;

    const [result] = await db.query(
      "UPDATE tictac SET input = ? WHERE id = ? and length(input) < 1",
      [inputData.input, id]
    );
    result.affectedRows === 1 &&
      res.status(200).json({ msg: "succesfully updated" });
    result.affectedRows === 0 &&
      res
        .status(200)
        .json({ msg: " Double click not allowed", code: "852963" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const resetData = async (req, res) => {
  try {
    await db.query("update tictac set input = '' ");
    res.status(200).send("table reseted...");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  checkWinner,
  postNewData,
  resetData,
  getArr,
};
