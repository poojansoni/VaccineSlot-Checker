import React, { useReducer } from "react";
import * as ActionTypes from "./ActionTypes";
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

	//console.log("PIN STATE:", PinState);

	const checkPincode = async (pin) => {
		try {
			const response = await pinVerifyApi.get("/pincode/" + pin);

			if (response.data[0].Status === "Success") {
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
