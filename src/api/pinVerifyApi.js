import axios from "axios";
import { PINCODE_VERIFY_API } from "./APIVariables";

export default axios.create({
	baseURL: PINCODE_VERIFY_API,
});
