import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/some-data", (req, res) => {
  res.json({ message: "Hello World" });
  console.log("test");
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
