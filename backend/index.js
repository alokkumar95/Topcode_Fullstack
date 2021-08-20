const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

const storage = new mongoose.Schema({
  device: { type: String },
  os: String,
  manufacturer: String,
  lastCheckedOutDate: { type: Date, default: Date.now },
  lastCheckedOutBy: String,
  isCheckedOut: { type: Boolean, default: false },
});

const Storage = mongoose.model("storage", storage);

app.get("/", async (req, res) => {
  const devices = await Storage.find({}).exec();
  res.status(200).json(devices);
});



app.post("/device", async (req, res, next) => {
  const obj = req.body;
  console.log("obj--",obj)
  const devices = await Storage.find({}).exec();


  if (obj && obj.device !== undefined&&devices.length<10) {
    const storage = await Storage.create(obj);
    res.status(201).json(storage);
  }
});

app.delete("/delete/:id", async (req, res, next) => {
  const deletedOne = await Storage.deleteOne({ _id: req.params.id });
  res.status(200).json("Device id " + req.params.id + " removed.");
});

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/garage");
};

connect()
  .then(async (connection) => {
    app.listen(5000);
  })
  .catch((err) => console.error(err));
