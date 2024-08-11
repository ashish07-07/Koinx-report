"use strict";
// import express from "express";
// import { Request, Response } from "express";
// const router = express.Router();
// import Trade from "../db";
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
// router.get("/costbasis", async function (req: Request, res: Response) {
//   try {
//     console.log("inside the profirloss routes");
//     const trades = await Trade.find();
//     const profit: { [key: string]: number } = {};
//     trades.forEach(function (val) {
//       const { amount, Price, Fees, Trasactiontype, Cryptocurrency } = val;
//       if (amount && Price && Cryptocurrency) {
//         if (!profit[Cryptocurrency]) {
//           profit[Cryptocurrency] = 0;
//         }
//         if (Trasactiontype === "Buy") {
//           const buyAmount = amount * Price + (Fees || 0);
//           profit[Cryptocurrency] += buyAmount;
//         } else if (Trasactiontype === "Sell") {
//           const sellAmount = amount * Price;
//           profit[Cryptocurrency] -= sellAmount;
//         }
//       }
//     });
//     console.log(profit);
//     return res.status(200).json({
//       netProfit: profit,
//     });
//   } catch (error) {
//     console.error("Error fetching trades:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// export default router;
// /reports/abciossst;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = __importDefault(require("../db"));
router.get("/costbasis", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trades = yield db_1.default.find();
            const profit = {};
            const costBasis = {};
            trades.forEach(function (val) {
                const { amount, Price, Fees, Trasactiontype, Cryptocurrency } = val;
                if (amount && Price && Cryptocurrency) {
                    if (!profit[Cryptocurrency]) {
                        profit[Cryptocurrency] = 0;
                    }
                    if (!costBasis[Cryptocurrency]) {
                        costBasis[Cryptocurrency] = 0;
                    }
                    if (Trasactiontype === "Buy") {
                        const totalCost = amount * Price + (Fees || 0);
                        costBasis[Cryptocurrency] += totalCost;
                    }
                    else if (Trasactiontype === "Sell") {
                        const sellValue = amount * Price;
                        const gainOrLoss = sellValue - costBasis[Cryptocurrency];
                        profit[Cryptocurrency] += gainOrLoss;
                        costBasis[Cryptocurrency] = 0;
                    }
                }
            });
            console.log(profit);
            return res.status(200).json({
                netProfit: profit,
            });
        }
        catch (error) {
            console.error("Error fetching trades:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
});
exports.default = router;