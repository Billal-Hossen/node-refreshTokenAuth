import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";

import authRoutes from "./routers/auth.js";
import refreshTokenRoutes from "./routers/refreshToken.js";


const app = express();

config();
// await connectDB()
dbConnect();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));