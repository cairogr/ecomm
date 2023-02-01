import mongoose from "mongoose"

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/ecomm");

let db = mongoose.connection;

export default db;