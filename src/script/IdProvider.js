import { v4 as uuidv4 } from "uuid";
function uuidPrefix(prefix) {
	return prefix + "-" + uuidv4();
}
export { uuidPrefix };
