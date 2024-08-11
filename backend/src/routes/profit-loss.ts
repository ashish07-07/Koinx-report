import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import Trade from "../db";

router.get("/costbasis", async function (req: Request, res: Response) {
  try {
    const trades = await Trade.find();

    const profit: { [key: string]: number } = {};
    const costBasis: { [key: string]: number } = {};

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
        } else if (Trasactiontype === "Sell") {
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
  } catch (error) {
    console.error("Error fetching trades:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
