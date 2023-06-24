const fs = require("fs");

module.exports = {
  add: (req, res) => {
    let data = JSON.parse(fs.readFileSync("./tmp/db.json"));
    let newData = {};
    if (data.foods.length < 1) {
      newData.id = 1;
      newData.image = `/imgFood/${req.file.filename}`;
      newData.name = req.body.name;
      newData.price = req.body.price;
    } else {
      newData.id = data.foods[data.foods.length - 1].id + 1;
      newData.image = `/imgFood/${req.file.filename}`;
      newData.name = req.body.name;
      newData.price = req.body.price;
    }
    console.log(newData);
    data.foods.push(newData);
    fs.writeFileSync("./tmp/db.json", JSON.stringify(data));
    return res.status(200).send({
      success: true,
      message: "Success.",
    });
  },
  data: (req, res) => {
    let data = JSON.parse(fs.readFileSync("./tmp/db.json"));
    return res.status(200).send(data.foods);
  },
  delete: (req, res) => {
    let data = JSON.parse(fs.readFileSync("./tmp/db.json"));
    let getIndex = data.foods.findIndex((val) => val.id == req.params.id);
    if (getIndex < 0) {
      res.status(200).send({
        success: false,
        message: "Data not found.",
      });
    } else {
      data.foods.splice(getIndex, 1);
      fs.writeFileSync("./tmp/db.json", JSON.stringify(data));
      res.status(200).send({
        success: true,
        message: "Success."
      })
    }
  },
};
