import axios from "axios";
import { GETMETADATA_STATE } from "../APIVariables";
export default axios.create({
	baseURL: GETMETADATA_STATE,
});
