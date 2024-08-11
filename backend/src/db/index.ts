import mongoose, { STATES } from "mongoose";

mongoose.connect(
  "mongodb+srv://bkashishh07:aIXzPAEjstrtbwwZ@cluster0.3x9lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const Tradeschema = new mongoose.Schema({
  date: String,
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

const Trade = mongoose.model("Trade", Tradeschema);

export default Trade;
