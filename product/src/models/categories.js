import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
	{
		id: { type: Number },
		name: { type: String, required: true, minLength: 4 },
		status: { type: Boolean },
	},
	{
		versionKey: false,
	}
);

const categories = mongoose.model("categories", categoriesSchema);

export default categories;
