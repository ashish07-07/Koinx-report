"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://bkashishh07:aIXzPAEjstrtbwwZ@cluster0.3x9lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const Tradeschema = new mongoose_1.default.Schema({
    date: Date,
    amount: Number,
    Trasactiontype: String,
    Cryptocurrency: String,
    Price: Number,
    Totalvalue: Number,
    Fees: Number,
    Netamount: Number,
    Transactionid: String,
    Exchange: String,
    Notes: String,
});
const Trade = mongoose_1.default.model("Trade", Tradeschema);
exports.default = Trade;
