"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use((0, cors_1.default)());
router.post("/balencesummary", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let body = req.body;
        let timestamp = new Date(body.timestamp);
        console.log("Parsed Timestamp:", timestamp);
        try {
            const trades = yield db_1.default.find({
                date: { $lte: timestamp },
            });
            console.log("Trades found:", trades);
            const balances = {};
            trades.forEach(function (val) {
                const { amount, Trasactiontype, Cryptocurrency } = val;
                console.log(`${Cryptocurrency} ${amount} ${Trasactiontype}`);
                if (Cryptocurrency && amount && Trasactiontype) {
                    if (!balances[Cryptocurrency]) {
                        balances[Cryptocurrency] = 0;
                    }
                    balances[Cryptocurrency] += Trasactiontype === "Buy" ? amount : -amount;
                }
            });
            console.log("Calculated Balances:", balances);
            return res.status(201).json({
                memainingasset: balances,
            });
        }
        catch (error) {
            console.error("Error fetching trades:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.default = router;
