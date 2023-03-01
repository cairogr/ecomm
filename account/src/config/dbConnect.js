import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://admin:secret@mongo-ecomm:27017/ecomm?authSource=admin"
);

let db = mongoose.connection;

export default db;
