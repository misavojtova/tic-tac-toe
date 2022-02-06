const db = require("../db-config");

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
    const [check] = await db.query("SELECT output from tictac");
    const [...output] = check.map((out) => Object.values(out)).flat();

    console.log("wn", output);

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
    // const isWinner = (result, player) => {
    //   for (i = 0; i < result.length; i++) {
    //     console.log(result[i]);
    //     return result[i].every((el) => {
    //       console.log(el);
    //       const res = player.includes(el);
    //       console.log(res);
    //       return res;
    //     });
    //   }
    // };
    const plOne = output.reduce((array, cell, index) => {
      console.log(array);
      if (cell === "X") array.push(index);
      return array;
    }, []);

    function isSubset(array1, array2) {
      // returns true if array2 (condition) is a subset of array1
      return array2.every(function (element) {
        return array1.includes(element);
      });
    }
    let result = [];
    for (i = 0; i < conditions.length; i++) {
      const res = isSubset(plOne, conditions[i]);
      result.push(res);
    }

    console.log(result);

    const plTwo = output.reduce((array, cell, index) => {
      if (cell === "O") array.push(index);
      return array;
    }, []);

    console.log("plo", plOne);

    // console.log(isWinner(conditions, plOne));
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const postNewData = async (req, res) => {
  try {
    const id = req.params.id;
    const { player } = req.body;
    console.log(player);
    await db.query("UPDATE tictac SET output = ? WHERE id = ?", [
      player.output,
      id,
    ]);
    res.status(200).send("succesfully updated");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const resetData = async (req, res) => {
  try {
    await db.query("update tictac set output = '' ");
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
