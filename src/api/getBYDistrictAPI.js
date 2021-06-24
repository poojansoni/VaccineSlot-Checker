import axios from "axios";
import { GET_BY_DISTRICT } from "./APIVariables";
export default axios.create({
	baseURL: GET_BY_DISTRICT,
});
