import mongoose from 'mongoose';

const accountsSchema = new mongoose.Schema(
	{
		id: { type: Number },
		name: { type: String, required: true, minLength: 4 },
		email: { type: String, required: true, minLength: 10 },
		password: {type: String, required: true}
	}
);

const accounts = mongoose.model('accounts', accountsSchema);

export default accounts;
