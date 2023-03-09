import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
	{
		id: { type: Number },
		name: {
			type: String,
			required: true,
			minLength: 4,
			validate: {
				validator: function (v) {
					return /^([A-Za-z]{1})/.test(v);
				},
				message: (props) => `${props.value} is not a valid name!`,
			},
		},
		description: { type: String, requie: true },
		slug: {
			type: String,
			validate: {
				validator: function (v) {
					return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
				},
				message: (props) => `${props.value} is not a valid name!`,
			},
		},

		unitPrice: { type: Number, min: 1 },
		quantityStock: { type: Number, min: 1, max: 10000 },
		idCategory: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "categories",
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

const products = mongoose.model("products", productsSchema);

export default products;
