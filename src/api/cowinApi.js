import axios from "axios";
import { GET_BY_PINCODE_DATE } from "./APIVariables";
export default axios.create({
	baseURL: GET_BY_PINCODE_DATE,
});
