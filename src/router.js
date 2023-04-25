import express from "express";
import cors from "cors";
import { indexR, accountR, loginR } from "./routes/routesPort.js";
import { authentication, authorization } from "./middlewares/middlewarePort.js";
import bodyParser from "body-parser";
const corsOption = {
	origin: [process.env.CLIENT, "http://127.0.0.1:5501"],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use("/api/v2/login", authentication, loginR);
app.use("/api/v2/index", indexR);
app.use("/api/v2/account", authorization, accountR);

const PORT = process.env.PORT || 8998;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
