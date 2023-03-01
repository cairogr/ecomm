const app = require ('./main.js');

const port = 3004;

app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
