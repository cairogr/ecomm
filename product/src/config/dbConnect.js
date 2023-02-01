import mongoose from "mongoose"

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/ecomm");

let db = mongoose.connection;

export default db;










// const connectToDatabase = () => {
//     mongoose.set('strictQuery',false);
//     mongoose.connect('mongodb://127.0.0.1:27017/ecomm',{useNewUrlParser: true}, 
//     (err) => {
//             if (err){
//                 return console.log("Error:", err)
//             }
//             return console.log("BD conectado com sucesso!")
//         }
// )}

// mongoose.se

// export { connectToDatabase };