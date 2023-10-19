import mongoose from "mongoose";
import { config } from "dotenv";
config()


let connectionURL = process.env.DB_CONNECTION_URL
connectionURL = connectionURL?.replace('<username>', process.env.DB_USER)
connectionURL = connectionURL?.replace('<password>', process.env.DB_PASS)
console.log(connectionURL)
const dbConnect = () => {
  const connectionParams = {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  mongoose.connect(connectionURL, connectionParams)

  mongoose.connection.on("connected", () => {
    console.log("Connected to database sucessfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database :" + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected");
  });
};





export default dbConnect;