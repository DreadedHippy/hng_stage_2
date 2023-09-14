import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import personRoutes from "./routes/person.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Necessary initializations
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use("/api", personRoutes);
// app.get("/api", (req, res) => {
//   res.status(200).json({
//     message: "API route"
//   })
// });
// app.get("*", (req: Request, res: Response) => {
// 	res.status(200).json({
// 		message: "Server works"
// 	})
// });

export default app;