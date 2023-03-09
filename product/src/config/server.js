import app from "./../../main.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger/product.json" assert { type: "json" };

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || 3003;
app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
