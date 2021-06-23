import axios from "axios";
import { GETMETADATA_DISTRICT } from "../APIVariables";
export default axios.create({
	baseURL: GETMETADATA_DISTRICT,
});
