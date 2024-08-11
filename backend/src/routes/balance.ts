// import express, { response } from "express";
// import { Request, Response } from "express";
// import Trade from "../db";

// const router = express.Router();

// router.use(express.json());

// router.post("/balencesummary", async function (req: Request, res: Response) {
//   let body = req.body;
//   let timestamp = new Date(body.timestamp);

//   console.log("Parsed Timestamp:", timestamp);

//   try {
//     const trades = await Trade.find({
//       date: { $lte: timestamp },
//     });

//     console.log("Trades found:", trades);

//     const balances: { [key: string]: number } = {};

//     trades.forEach(function (val) {
//       const { Netamount, Trasactiontype, Cryptocurrency } = val;
//       console.log(`${Cryptocurrency} ${Netamount} ${Trasactiontype}`);

//       if (Cryptocurrency && Netamount && Trasactiontype) {
//         if (!balances[Cryptocurrency]) {
//           balances[Cryptocurrency] = 0;
//         }

//         balances[Cryptocurrency] +=
//           Trasactiontype === "Buy" ? Netamount : -Netamount;
//       }
//     });

//     console.log("Calculated Balances:", balances);

//     return res.status(201).json({
//       memainingasset: balances,
//     });
//   } catch (error) {
//     console.error("Error fetching trades:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;

import express, { response } from "express";
import { Request, Response } from "express";
import Trade from "../db";

const router = express.Router();

router.use(express.json());

router.post("/balencesummary", async function (req: Request, res: Response) {
  let body = req.body;
  let timestamp = new Date(body.timestamp);

  console.log("Parsed Timestamp:", timestamp);

  try {
    const trades = await Trade.find({
      date: { $lte: timestamp },
    });

    console.log("Trades found:", trades);

    const balances: { [key: string]: number } = {};

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
  } catch (error) {
    console.error("Error fetching trades:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
