import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
import Trade from "../db";

import cors from "cors";

import { Request, Response } from "express";

const router = express.Router();

router.use(cors());

const uploads = multer({ dest: path.join(__dirname, "uploads") });

const results: any[] = [];

router.post(
  "/uploads",
  uploads.single("file"),
  function (req: Request, res: Response) {
    if (!req.file) {
      res.status(401).json({
        msg: "Did not upload any filem",
      });
    }
    if (req.file) {
      const filepath = path.resolve(__dirname, "uploads", req.file?.filename);

      fs.createReadStream(filepath)
        .pipe(csv())
        .on("data", function (data) {
          results.push(data);
        })
        .on("end", async function () {
          fs.unlinkSync(filepath);

          console.log(results);

          const trades = results.map(function (val) {
            return new Trade({
              //   date: val.Date,
              date: new Date(val.Date),
              amount: parseFloat(val.Amount),
              Trasactiontype: val[" Transaction-type"],
              Cryptocurrency: val.Cryptocurrency,
              Price: parseFloat(val["Price per Unit"]),
              Totalvalue: parseFloat(val["Total Value"]),

              Fees: val.Fees,
              Netamount: parseFloat(val["Net Amount"]),
              Transactionid: val["Transaction ID"],
              Exchange: val["Exchange/Wallet"],
              Notes: val.Notes,
            });
          });

          await Trade.insertMany(trades);

          res.status(201).json({
            msg: "succesfully parsed the csv re ba",
            results,
          });
        });
    }
  }
);

export default router;
