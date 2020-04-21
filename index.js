const express = require("express");
const csvJson = require("csvjson");
const cors = require('cors');
const fs = require("fs");

const app = express();

app.use(cors());

app.get("/read-csv", (req, res) => {
  try {
    fs.readFile("./EnglishDictionary.csv", "utf-8", (err, fileContent) => {
      if (err) {
        console.log(err);
      }

      const inJson = csvJson.toObject(fileContent);

      res.status(200).json({
        data: inJson,
      });
    });
  } catch (error) {
    console.err(error);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
