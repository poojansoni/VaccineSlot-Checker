import React, { useReducer } from "react";
import * as ActionTypes from "./ActionTypes";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import cowinPINApi from "../api/cowinPINApi";
const cowinContext = React.createContext();

const cowinReducer = (state, action) => {
	switch (action.type) {
		// case ActionTypes.VERIFY_PIN:
		// 	return {
		// 		...state,
		// 		isValidPin: action.payload.isValidPin,
		// 	};
		default:
			return state;
	}
};

export const CowinProvider = ({ children }) => {
	const [CowinState, dispatch] = useReducer(cowinReducer, { isValidPin: true });

	console.log("COWIN STATE:", CowinState);

	const getCentersPincodeDate = async (pin = 262001, date = "23-06-2021") => {
		try {
			const response = await cowinPINApi.get(
				`/findByPin?pincode=${pin}&date=${date}`,
			);
			console.log(response);
			// if (
			// 	response.data[0].Status === "Success"
			// 	// response.data[0].PostOffice != null &&
			// 	// response.data[0].PostOffice > 0
			// ) {
			// 	dispatch({
			// 		type: ActionTypes.VERIFY_PIN,
			// 		payload: { isValidPin: true },
			// 	});
			// } else {
			// 	dispatch({
			// 		type: ActionTypes.VERIFY_PIN,
			// 		payload: { isValidPin: false },
			// 	});
			// }
		} catch (error) {
			console.log("ERROR IN GETTING CENTRES BY PINCODE:", error);
			// dispatch({
			// 	type: ActionTypes.VERIFY_PIN,
			// 	payload: { isValidPin: false },
			// });
		}
	};
	return (
		<cowinContext.Provider
			value={{
				getCentersPincodeDate,
			}}
		>
			{children}
		</cowinContext.Provider>
	);
};

export default cowinContext;
