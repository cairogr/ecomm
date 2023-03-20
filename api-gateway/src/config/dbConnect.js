import mongoose from 'mongoose';

const DB_HOST = process.env.NODE_ENV === 'test' ? '127.0.0.1' : process.env.DB_HOST;

mongoose.set('strictQuery', false);
mongoose.connect(
	'mongodb://admin:secret@127.0.0.1:27017/ecomm?authSource=admin'
);

let db = mongoose.connection;

export default db;
