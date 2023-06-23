const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", express.static("public"));

app.get("/api", (req, res) => {
  res.status(200).send("Alan Resto API");
});

const { foodRouter } = require("./routers");
app.use("/api/food", foodRouter);

app.listen(PORT, () => console.log(`Running API ${PORT}`));
