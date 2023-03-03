import * as dotenv from "dotenv";
dotenv.config();
  
import mongoose from "mongoose";

const DB_HOST = process.env.NODE_ENV === "test" ? "127.0.0.1" : process.env.DB_HOST;

console.log(DB_HOST);

mongoose.set("strictQuery", false);
mongoose.connect(
	`mongodb://admin:secret@${DB_HOST}:27017/ecomm?authSource=admin`
);

let db = mongoose.connection;

export default db;
