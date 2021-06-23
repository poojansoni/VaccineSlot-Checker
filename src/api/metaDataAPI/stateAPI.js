import axios from "axios";
import { GETMETADATA_STATE } from "../APIVariables";
export default axios.create({
	baseURL: GETMETADATA_STATE,
	headers: {
		"User-Agent":
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
	},
});
