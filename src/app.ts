import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("*", (req: Request, res: Response) => {
	res.status(200).json({
		message: "Server works"
	})
});

export default app;