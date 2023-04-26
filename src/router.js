import express from "express";
import cors from "cors";
import { indexR, accountR, loginR, employeeR, headquarterR, workScheduleR } from "./routes/routesPort.js";
import { adminAuthorization, authentication, userAuthorization } from "./middlewares/middlewarePort.js";
import { viewR } from "./routes/view/viewR.js";
import bodyParser from "body-parser";
import path from "path";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOption = {
	origin: [process.env.CLIENT, "http://127.0.0.1:5501"],
};

const app = express();
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);
app.set("view engine", "hbs");
app.engine(
	".hbs",
	exphbs.engine({
		defaultLayout: "main",
		extname: ".hbs",
		layoutsDir: viewsPath + "/layouts",
		partialsDir: viewsPath + "/partials",
	})
);

app.use(bodyParser.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/", viewR);

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
