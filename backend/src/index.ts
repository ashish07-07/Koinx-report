import express from "express";
import profitloss from "./routes/prolo";
import balences from "./routes/balance";
import summary from "./routes/profit-loss";
import cors from "cors";
const app = express();
app.use(express.json());

app.use("/reports", profitloss);

app.use("/asset", balences);

app.use("/profitlosscalculatot", summary);

app.use(cors());

app.listen(3000, function () {
  console.log("server listening on port");
});
