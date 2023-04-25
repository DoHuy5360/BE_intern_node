import dotenv from "dotenv";
import pkl from "pg";

dotenv.config();

const pool = new pkl.Pool({
	host: process.env.HOST,
	user: process.env.USER,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: 5432,
	ssl: {
		rejectUnauthorized: false,
	},
});

export default pool;
