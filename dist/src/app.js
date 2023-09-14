"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var person_route_1 = __importDefault(require("./routes/person.route"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// Necessary initializations
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.get("/", function (req, res) {
    res.status(200).json({
        status: true,
        message: "This is the home route :D"
    });
});
app.use("/api", person_route_1.default);
app.get("*", function (req, res) {
    res.status(404).json({
        status: false,
        message: "Not quite sure the route you were looking for..."
    });
});
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
exports.default = app;
