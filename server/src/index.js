import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import rootRouter from "./routers/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI_DB = process.env.MONGO_DB;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(cookieParser());

mongoose
    .connect(URI_DB)
    .then(() => {
        console.log("Connect DB success.");
    })
    .catch((err) => {
        console.log("Err DB: ", err.message);
    });

app.use("/", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
