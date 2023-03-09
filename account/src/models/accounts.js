import mongoose from "mongoose";

const accountsSchema = new mongoose.Schema(
	{
		id: { type: Number },
		name: { type: String, required: true, minLength: 4 },
		email: { type: String, required: true, minLength: 10 },
		password: {
			type: String,
			required: true,
			minLength: 9,
			validate: {
				validator: function (v) {
					return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
						v
					);
				},
				message: (props) => `${props.value} is not a valid password!`,
			},
		},

		cpf: { type: String, required: true, minLength: 11, maxLength: 11 },
		phone: {
			type: String,
			validate: {
				validator: function (v) {
					return /^\+?([0-9]{2})\)?[-. ]?([0-9]{2})?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/.test(
						v
					);
				},
				message: (props) => `${props.value} is not a valid phone number!`,
			},
			required: [true, "User phone number required"],
		},

		address: [
			{
				street: { type: String, required: true, minLength: 4 },
				number: { type: String, required: true, minLength: 4 },
				zipCode: { type: String, required: true, minLength: 4 },
				city: { type: String, required: true, minLength: 4 },
				state: {
					type: String,
					required: true,
					default: "AC",
					enum: {
						values: [
							"AC",
							"AL",
							"AM",
							"AP",
							"BA",
							"CE",
							"DF",
							"ES",
							"GO",
							"MA",
							"MG",
							"MS",
							"MT",
							"PA",
							"PB",
							"PE",
							"PI",
							"PR",
							"RJ",
							"RN",
							"RO",
							"RR",
							"RS",
							"SC",
							"SE",
							"SP",
							"TO",
						],
					},
				},
				status: { type: Boolean },
			},
		],
	},
	{
		versionKey: false,
	}
);

const accounts = mongoose.model("accounts", accountsSchema);

export default accounts;
