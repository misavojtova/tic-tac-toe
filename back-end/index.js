const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const ticRouter = require("./routers/tic.router");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/tic", ticRouter);
app.use("/api/tic/winner", ticRouter);

app.listen(process.env.PORT || 5000),
  () => console.log(`Server runs on 5000 ...`);
