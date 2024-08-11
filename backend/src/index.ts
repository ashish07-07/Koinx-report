import express from "express";
import profitloss from "./routes/prolo";
import balences from "./routes/balance";

const app = express();
app.use(express.json());

app.use("/reports", profitloss);

app.use("/asset", balences);

app.listen(3000, function () {
  console.log("server listening on port");
});
