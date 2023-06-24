const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors({ origin: "https://alan-resto.netlify.app", credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use("/api", express.static("public"));

app.get("/api", (req, res) => {
  res.status(200).send("Alan Resto API");
});

const { foodRouter } = require("./routers");
app.use("/api/food", foodRouter);

app.listen(PORT, () => console.log(`Running API ${PORT}`));
