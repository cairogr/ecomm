import app from "./../main.js";

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
