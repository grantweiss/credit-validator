import express, { Application } from "express";
import cors from "cors";
import routes from "./api/routes";
import { errorMiddleware } from "./api/middleware/error";

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

app.use("/some-data", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
