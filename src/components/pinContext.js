import React, { useReducer } from "react";
import * as ActionTypes from "./ActionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pinVerifyApi from "../api/pinVerifyApi";
const PinContext = React.createContext();

const pinReducer = (state, action) => {
	switch (action.type) {
		//case ActionTypes.SIGN_IN:
		case ActionTypes.VERIFY_PIN:
			return {
				...state,
				isValidPin: true,
			};
		// 	case ActionTypes.SIGN_OUT:
		// 		return {
		// 			...state,
		// 			userId: "",
		// 			token: null,
		// 		};
		// 	case ActionTypes.IS_AUTHENTICATING:
		// 		return {
		// 			...state,
		// 			isAuthenticating: true,
		// 		};
		// 	case ActionTypes.TRIED_LOCAL_SIGNIN:
		// 		return {
		// 			...state,
		// 			triedLocalSignIn: true,
		// 		};
		default:
			return state;
	}
};

export const PinProvider = ({ children }) => {
	const [PinState, dispatch] = useReducer(pinReducer, {
		// userId: "",
		// token: null,
		isValidPin: false,
		// triedLocalSignIn: false,
	});

	// const [currentUser, setCurrentUser] = React.useState();

	// const [data, setData] = React.useState();

	//console.log("OUR STATE:", authState);

	// const tryLocalSignIn = async () => {
	// 	try {
	// 		const token = await AsyncStorage.getItem("token");
	// 		const userId = await AsyncStorage.getItem("userEmail");
	// 		if (!token) {
	// 			dispatch({ type: ActionTypes.TRIED_LOCAL_SIGNIN });
	// 			return;
	// 		}
	// 		// try {
	// 		// 	getProfilePic();
	// 		// } catch (err) {}
	// 		dispatch({
	// 			type: ActionTypes.SIGN_IN,
	// 			payload: { token, userId },
	// 		});
	// 	} catch (error) {
	// 		console.log("COULD NOT READ ASYNCSTORAGE:", error);
	// 	}
	// 	dispatch({ type: ActionTypes.TRIED_LOCAL_SIGNIN });
	// };

	// const signUp = async (email, password) => {
	// 	console.log("INSIDE SIGN UP email & PAss :", email, password);
	// 	dispatch({ type: ActionTypes.IS_AUTHENTICATING });
	// 	try {
	// 		const response = await Firebase.auth().createUserWithEmailAndPassword(
	// 			email,
	// 			password,
	// 		);
	// 		await AsyncStorage.setItem("token", response.user.uid);
	// 		await AsyncStorage.setItem("userEmail", response.user.email);
	// 		// try {
	// 		// 	getProfilePic();
	// 		// } catch (err) {}
	// 		dispatch({
	// 			type: ActionTypes.SIGN_UP,
	// 			payload: {
	// 				token: response.user.uid,
	// 				userId: response.user.email,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.log("ERROR IN SIGNUP:", error);

	// 		throw new Error("Something went wrong");
	// 	}
	// };

	// const signIn = async (email, password) => {
	// 	console.log("INSIDE SIGN IN email & PAss :", email, password);

	// 	dispatch({ type: ActionTypes.IS_AUTHENTICATING });
	// 	try {
	// 		const response = await Firebase.auth().signInWithEmailAndPassword(
	// 			email,
	// 			password,
	// 		);
	// 		await AsyncStorage.setItem("token", response.user.uid);
	// 		await AsyncStorage.setItem("userEmail", response.user.email);
	// 		// try {
	// 		// 	getProfilePic();
	// 		// } catch (err) {}
	// 		dispatch({
	// 			type: ActionTypes.SIGN_IN,
	// 			payload: {
	// 				token: response.user.uid,
	// 				userId: response.user.email,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		console.log("ERROR IN SIGNIN:", error);

	// 		throw new Error("Something went wrong");
	// 	}
	// };

	// const signOut = async () => {
	// 	console.log("INSIDE SIGN OUT ");
	// 	dispatch({ type: ActionTypes.SIGN_OUT });
	// 	try {
	// 		await AsyncStorage.removeItem("token");
	// 		await AsyncStorage.removeItem("userEmail");
	// 		//await AsyncStorage.removeItem("DP");
	// 		await Firebase.auth().signOut();
	// 	} catch (error) {
	// 		console.log("ERROR IN SIGNOUT:", error);

	// 		throw new Error("Something went wrong");
	// 	}
	// };

	const checkPincode = async (pin) => {
		console.log("Recieved Pin: ", pin);
		try {
			const response = await pinVerifyApi.get("/pincode/" + pin);
			console.log(
				"RESONSE: ",
				response.data[0].Message,
				" STATUS: ",
				response.data[0].Status,
			);
			if (response.data[0].PostOffice != null) {
				dispatch({
					type: ActionTypes.VERIFY_PIN,
				});
			} else {
				// dispatch({
				// 	type: ActionTypes.VERIFY_PIN,
				// });
			}
		} catch (error) {
			console.log("ERROR IN VERIFYING PINCODE:", error);
			// dispatch({
			// 	type: ActionTypes.VERIFY_PIN,
			// });
		}
	};
	return (
		<PinContext.Provider
			value={{
				data: PinState,
				checkPincode,
				// signUp,
				// signIn,
				// signOut,
			}}
		>
			{children}
		</PinContext.Provider>
	);
};

export default PinContext;
