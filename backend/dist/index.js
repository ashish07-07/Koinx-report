"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prolo_1 = __importDefault(require("./routes/prolo"));
const balance_1 = __importDefault(require("./routes/balance"));
const profit_loss_1 = __importDefault(require("./routes/profit-loss"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/reports", prolo_1.default);
app.use("/asset", balance_1.default);
app.use("/profitlosscalculatot", profit_loss_1.default);
app.use((0, cors_1.default)());
app.listen(3000, function () {
    console.log("server listening on port");
});
