"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./src/app"));
var port = process.env.PORT || 8080;
app_1.default.listen(port, function () {
    console.log("Server listening on PORT: ".concat(port));
});
