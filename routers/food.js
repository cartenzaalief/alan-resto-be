const express = require("express");
const route = express.Router();
const { foodController } = require("../controllers");
const { uploader } = require("../config/uploader");

route.post("/add", uploader("/imgFood").single("image"), foodController.add);
route.get("/data", foodController.data);
route.delete("/delete/:id", foodController.delete);

module.exports = route;
