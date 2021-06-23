import React, { useReducer } from "react";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pinVerifyApi from "../api/pinVerifyApi";
const PinContext = React.createContext();

const pinReducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.VERIFY_PIN:
			return {
				...state,
				isValidPin: action.payload.isValidPin,
			};
		default:
			return state;
	}
};

export const PinProvider = ({ children }) => {
	const [PinState, dispatch] = useReducer(pinReducer, {
		isValidPin: false,
		pincode: 0,
	});

	console.log("PIN STATE:", PinState);

	const checkPincode = async (pin) => {
		console.log("PREVIOUS VALIDATION: ", PinState.isValidPin);
		console.log("Recieved Pin: ", pin);
		try {
			const response = await pinVerifyApi.get("/pincode/" + pin);
			console.log(
				"RESONSE-MESSAGE: ",
				response.data[0].Message,
				"RESPONSE-STATUS: ",
				response.data[0].Status,
			);
			if (
				response.data[0].Status === "Success"
				// response.data[0].PostOffice != null &&
				// response.data[0].PostOffice > 0
			) {
				dispatch({
					type: ActionTypes.VERIFY_PIN,
					payload: { isValidPin: true },
				});
			} else {
				dispatch({
					type: ActionTypes.VERIFY_PIN,
					payload: { isValidPin: false },
				});
			}
		} catch (error) {
			console.log("ERROR IN VERIFYING PINCODE:", error);
			dispatch({
				type: ActionTypes.VERIFY_PIN,
				payload: { isValidPin: false },
			});
		}
	};
	return (
		<PinContext.Provider
			value={{
				isValidPin: PinState.isValidPin,
				checkPincode,
			}}
		>
			{children}
		</PinContext.Provider>
	);
};

export default PinContext;
