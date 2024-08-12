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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const db_1 = __importDefault(require("../db"));
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
router.use((0, cors_1.default)());
const uploads = (0, multer_1.default)({ dest: path_1.default.join(__dirname, "uploads") });
const results = [];
router.post("/uploads", uploads.single("file"), function (req, res) {
    var _a;
    if (!req.file) {
        res.status(401).json({
            msg: "Did not upload any filem",
        });
    }
    if (req.file) {
        const filepath = path_1.default.resolve(__dirname, "uploads", (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
        fs_1.default.createReadStream(filepath)
            .pipe((0, csv_parser_1.default)())
            .on("data", function (data) {
            results.push(data);
        })
            .on("end", function () {
            return __awaiter(this, void 0, void 0, function* () {
                fs_1.default.unlinkSync(filepath);
                console.log(results);
                const trades = results.map(function (val) {
                    return new db_1.default({
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
                yield db_1.default.insertMany(trades);
                res.status(201).json({
                    msg: "succesfully parsed the csv re ba",
                    results,
                });
            });
        });
    }
});
exports.default = router;
