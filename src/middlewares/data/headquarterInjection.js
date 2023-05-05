import { headquarterCRUDTemplate } from "../../controllers/entities/headquarterC.js";

async function injectAllHeadquarters(req, res, next) {
	req.headquarters = await headquarterCRUDTemplate.readAll();
	next();
}

export { injectAllHeadquarters };
