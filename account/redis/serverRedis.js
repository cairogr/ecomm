import redis from "redis";

const client = redis.createClient({
	socket: {
		host: "redis",
		port: "6379",
	},
});

client.connect();

client.on("error", function (error) {
	console.error(error);
});
client.on("connect", function () {
	console.log("Redis Connected!");
});

export default client;
