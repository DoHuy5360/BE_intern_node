import express from "express";
import cors from "cors";
import { indexR, accountR, loginR, employeeR, headquarterR, workScheduleR } from "./routes/routesPort.js";
import { adminAuthorization, authentication, userAuthorization } from "./middlewares/middlewarePort.js";
import bodyParser from "body-parser";
const corsOption = {
	origin: [process.env.CLIENT, "http://127.0.0.1:5501"],
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use("/api/v2/login", authentication, loginR);
app.use("/api/v2/index", userAuthorization, indexR);
app.use("/api/v2/account", adminAuthorization, accountR);
app.use("/api/v2/employee", adminAuthorization, employeeR);
app.use("/api/v2/headquarter", adminAuthorization, headquarterR);
app.use("/api/v2/workSchedule", adminAuthorization, workScheduleR);

const PORT = process.env.PORT || 8998;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
